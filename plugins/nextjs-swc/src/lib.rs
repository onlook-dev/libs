#![allow(clippy::not_unsafe_ptr_arg_deref)]
use swc_core::{
    ecma::{ast::Program, visit::FoldWith},
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
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

    let source_map = std::sync::Arc::new(data.source_map);
    program.fold_with(&mut onlook_react::onlook_react(config, source_map))
}
