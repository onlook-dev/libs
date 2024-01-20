use std::path::PathBuf;

use onlook_react::Options;
use swc_common::{chain, Mark};
use swc_ecma_parser::{EsConfig, Syntax};
use swc_ecma_transforms_base::resolver;
use swc_ecma_transforms_testing::{test_fixture, FixtureTestConfig};

fn syntax() -> Syntax {
    Syntax::Es(EsConfig {
        jsx: true,
        ..Default::default()
    })
}

#[testing::fixture("tests/fixture/**/input.js")]
fn fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    test_fixture(
        syntax(),
        &|_tr| {
            let unresolved_mark = Mark::new();
            let top_level_mark = Mark::new();

            chain!(
                resolver(unresolved_mark, top_level_mark, false),
                onlook_react::onlook_react(if input.to_string_lossy().contains("custom") {
                    onlook_react::Config::WithOptions(Options {
                        properties: vec!["^data-custom$".into()],
                    })
                } else {
                    onlook_react::Config::All(true)
                })
            )
        },
        &input,
        &output,
        FixtureTestConfig {
            ..Default::default()
        },
    );
}
