use serde::Deserialize;
use std::sync::Arc;
use swc_common::{SourceMapper, DUMMY_SP};
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

pub fn ident(str: &str) -> Ident {
    Ident {
        sym: str.into(),
        span: DUMMY_SP,
        optional: false,
    }
}

#[derive(Clone, Debug, Deserialize)]
pub struct Options {
    #[serde(default)]
    pub properties: Vec<String>,
}

pub fn onlook_react(config: Config, source_map: Arc<dyn SourceMapper>) -> impl Fold {
    AddProperties { source_map }
}

struct AddProperties {
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

        let file_line = format!("{}:{}", path, line);

        let class_name_attr = JSXAttrOrSpread::JSXAttr(JSXAttr {
            span: el.span,
            name: JSXAttrName::Ident(ident("data-onlook-id")),
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
