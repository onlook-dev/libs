use serde::Deserialize;
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
    pub fn truthy(&self) -> bool {
        match self {
            Config::All(b) => *b,
            Config::WithOptions(_) => true,
        }
    }
}

#[derive(Clone, Debug, Deserialize)]
pub struct Options {
    #[serde(default)]
    pub properties: Vec<String>,
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
        // Get file name
        let path = self
            .source_map
            .get_code_map()
            .span_to_filename(el.span)
            .to_string();

        // Get line number of the span from source
        let line = self
            .source_map
            .get_code_map()
            .span_to_lines(el.span)
            .unwrap()
            .lines[0]
            .line_index;

        let file_line = generate_data_attribute_value(&path, line);

        let class_name_attr = JSXAttrOrSpread::JSXAttr(JSXAttr {
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
// Get relative path from root if specified in config
// Encrypt with key from config
fn generate_data_attribute_value(path: &str, line: usize) -> String {
    format!("{}:{}", path, line)
}
