const moduleToTest = require('../../index.js');

test('adds data-onlook-id attribute to HTML tags', () => {
  const source = `
    <template>
      <div class="app">
        <button>Click me</button>
      </div>
    </template>

    <script>
    export default {
      name: 'App'
    }
    </script>

    <style scoped>
    .app {
      text-align: center;
    }
    </style>
  `;

  const expectedOutput = `
    <template>
      <div class="app" data-onlook-id="src\\App.vue:2">
        <button data-onlook-id="src\\App.vue:3">Click me</button>
      </div>
    </template>

    <script>
    export default {
      name: 'App'
    }
    </script>

    <style scoped>
    .app {
      text-align: center;
    }
    </style>
  `;
  const testFileName = "src/App.vue";
  const actualOutput = moduleToTest(source,testFileName);
  expect(actualOutput).toBe(expectedOutput);
});