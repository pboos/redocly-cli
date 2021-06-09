import { outdent } from 'outdent';
import { lintDocument } from '../../../lint';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../../__tests__/utils';
import { makeConfig } from '../../__tests__/config';
import { BaseResolver } from '../../../resolve';

describe('Oas3 path-params-defined', () => {
  it('should not report on defined params', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths:
            /pets/{a}/{b}:
              parameters:
                - name: a
                  in: path
              get:
                parameters:
                 - name: b
                   in: path
      `,
      'foobar.yaml',
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: makeConfig({ 'path-params-defined': 'error' }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });

  it('should report on undefined param params', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths:
            /pets/{a}/{b}:
              parameters:
                - name: a
                  in: path
                - name: b
                  in: header
              get:
                parameters:
                 - name: b
                   in: query
      `,
      'foobar.yaml',
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: makeConfig({ 'path-params-defined': 'error' }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/paths/~1pets~1{a}~1{b}/get/parameters",
              "reportOnKey": true,
              "source": "foobar.yaml",
            },
          ],
          "message": "The operation does not define the path parameter \`{b}\` expected by path \`/pets/{a}/{b}\`.",
          "ruleId": "path-params-defined",
          "severity": "error",
          "suggest": Array [],
        },
      ]
    `);
  });

  it('should report on undeclared param', async () => {
    const document = parseYamlToDocument(
      outdent`
          openapi: 3.0.0
          paths:
            /pets/{a}:
              parameters:
                - name: a
                  in: path
                - name: d
                  in: path
              get:
                parameters:
                 - name: c
                   in: path
      `,
      'foobar.yaml',
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: makeConfig({ 'path-params-defined': 'error' }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      Array [
        Object {
          "location": Array [
            Object {
              "pointer": "#/paths/~1pets~1{a}/parameters/1/name",
              "reportOnKey": false,
              "source": "foobar.yaml",
            },
          ],
          "message": "Path parameter \`d\` is not used in the path \`/pets/{a}\`.",
          "ruleId": "path-params-defined",
          "severity": "error",
          "suggest": Array [],
        },
        Object {
          "location": Array [
            Object {
              "pointer": "#/paths/~1pets~1{a}/get/parameters/0/name",
              "reportOnKey": false,
              "source": "foobar.yaml",
            },
          ],
          "message": "Path parameter \`c\` is not used in the path \`/pets/{a}\`.",
          "ruleId": "path-params-defined",
          "severity": "error",
          "suggest": Array [],
        },
      ]
    `);
  });
});
