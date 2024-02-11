use serde::Deserialize;
use std::path::PathBuf;
use std::sync::Arc;
use swc_common::SourceMapper;
use swc_ecma_ast::*;
use swc_ecma_visit::{noop_fold_type, Fold, FoldWith};

#[derive(Clone, Debug, Deserialize)]
#[serde(untagged)]
pub enum Config {
    All(bool),
    WithOptions(Options),
}

impl Config {
    pub fn project_root(&self) -> Option<&str> {
        match self {
            Config::WithOptions(opts) => Some(&opts.project_root),
            _ => None,
        }
    }

    pub fn absolute(&self) -> bool {
        match self {
            Config::WithOptions(opts) => opts.absolute,
            _ => false,
        }
    }
}

#[derive(Clone, Debug, Deserialize)]
pub struct Options {
    #[serde(rename = "projectRoot")]
    pub project_root: String,
    #[serde(default)]
    pub absolute: bool,
}

pub fn onlook_react(config: Config, source_map: Arc<dyn SourceMapper>) -> impl Fold {
    AddProperties { config, source_map }
}

struct AddProperties {
    config: Config,
    source_map: Arc<dyn SourceMapper>,
}

impl AddProperties {}

impl Fold for AddProperties {
    noop_fold_type!();

    fn fold_jsx_opening_element(&mut self, mut el: JSXOpeningElement) -> JSXOpeningElement {
        // Get file name and line
        let project_root = self
            .config
            .project_root()
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("."));

        let code_map: &dyn SourceMapper = self.source_map.get_code_map();
        let path: String = code_map.span_to_filename(el.span).to_string();
        let span_lines = code_map.span_to_lines(el.span).unwrap().lines;

        let offset = 1;
        let start_line: usize = span_lines[0].line_index + offset;
        let end_line: usize = span_lines.last().unwrap().line_index + offset;

        let file_line: String = generate_data_attribute_value(
            &project_root,
            &path,
            start_line,
            end_line,
            self.config.absolute(),
        );

        let class_name_attr: JSXAttrOrSpread = JSXAttrOrSpread::JSXAttr(JSXAttr {
            span: el.span,
            name: JSXAttrName::Ident(Ident {
                sym: "data-onlook-id".into(),
                span: el.span,
                optional: false,
            }),
            value: Some(JSXAttrValue::Lit(Lit::Str(Str {
                span: el.span,
                value: file_line.into(),
                raw: None,
            }))),
        });

        el.attrs.push(class_name_attr);
        el.fold_children_with(self)
    }
}

// TODO:
// Encrypt with key from config
fn generate_data_attribute_value(
    project_root: &PathBuf,
    path: &str,
    start_line: usize,
    end_line: usize,
    absolute: bool,
) -> String {
    // Get projectRoot from config
    let abs_path_buf: PathBuf = PathBuf::from(path);

    if absolute {
        return format!("{}:{}:{}", path, start_line, end_line);
    }

    // Get relative path
    let relative_path: String = abs_path_buf
        .strip_prefix(&project_root)
        .unwrap_or_else(|_| &abs_path_buf)
        .to_string_lossy()
        .to_string();

    format!("{}:{}:{}", relative_path, start_line, end_line)
}
