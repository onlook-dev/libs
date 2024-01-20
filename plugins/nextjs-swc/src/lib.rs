#![allow(clippy::not_unsafe_ptr_arg_deref)]
use swc_core::{
    common::FileName,
    ecma::{ast::Program, visit::FoldWith},
    plugin::{
        metadata::TransformPluginMetadataContextKind, plugin_transform,
        proxies::TransformPluginProgramMetadata,
    },
};

#[plugin_transform]
fn swc_plugin(program: Program, data: TransformPluginProgramMetadata) -> Program {
    let config = serde_json::from_str::<Option<onlook_react::Config>>(
        &data
            .get_transform_plugin_config()
            .expect("failed to get plugin config for onlook-react"),
    )
    .expect("invalid packages")
    .unwrap_or_else(|| onlook_react::Config::All(true));

    let file_name = match data.get_context(&TransformPluginMetadataContextKind::Filename) {
        Some(s) => FileName::Real(s.into()),
        None => FileName::Anon,
    }
    .to_string();

    program.fold_with(&mut onlook_react::onlook_react(config, file_name))
}
