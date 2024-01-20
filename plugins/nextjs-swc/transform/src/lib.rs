use serde::Deserialize;
use swc_common::{Spanned, DUMMY_SP};
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

pub fn onlook_react(config: Config, file_name: String) -> impl Fold {
    AddProperties { file_name }
}

struct AddProperties {
    file_name: String,
}

impl AddProperties {}

impl Fold for AddProperties {
    noop_fold_type!();

    fn fold_jsx_opening_element(&mut self, mut el: JSXOpeningElement) -> JSXOpeningElement {
        let line = el.span.lo().0;
        let file_line = format!("{}:{}", self.file_name, line);

        let class_name_attr = JSXAttrOrSpread::JSXAttr(JSXAttr {
            span: DUMMY_SP,
            name: JSXAttrName::Ident(ident("data-onlook-id")),
            value: Some(JSXAttrValue::Lit(Lit::Str(Str {
                span: DUMMY_SP,
                value: file_line.into(),
                raw: None,
            }))),
        });

        el.attrs.push(class_name_attr);
        el.fold_children_with(self)
    }
}
