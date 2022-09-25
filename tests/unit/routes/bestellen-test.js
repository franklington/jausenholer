import { module, test } from 'qunit';
import { setupTest } from 'jausenholer-app/tests/helpers';

module('Unit | Route | bestellen', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bestellen');
    assert.ok(route);
  });
});
