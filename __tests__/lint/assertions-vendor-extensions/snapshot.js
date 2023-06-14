// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint assertions-vendor-extensions 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:8:12 at #/info/x-my-extension/prop2

rule/vendor-extension-in-info-section failed because the SpecExtension prop2 didn't meet the assertions: "invalid-value-should-report" should be one of the predefined values

 6 | x-my-extension:
 7 |   prop: invalid-value-should-report
 8 |   prop2: invalid-value-should-report
   |          ^^^^^^^^^^^^^^^^^^^^^^^^^^^
 9 | x-other-extension:
10 |   prop: invalid-value-should-not-report

Error was generated by the rule/vendor-extension-in-info-section rule.


[2] openapi.yaml:7:11 at #/info/x-my-extension/prop

rule/vendor-extension failed because the SpecExtension prop didn't meet the assertions: "invalid-value-should-report" should be one of the predefined values

5 | info:
6 |   x-my-extension:
7 |     prop: invalid-value-should-report
  |           ^^^^^^^^^^^^^^^^^^^^^^^^^^^
8 |     prop2: invalid-value-should-report
9 |   x-other-extension:

Error was generated by the rule/vendor-extension rule.


[3] openapi.yaml:3:9 at #/x-my-extension/prop

rule/vendor-extension failed because the SpecExtension prop didn't meet the assertions: "invalid-value-should-report" should be one of the predefined values

1 | openapi: 3.1.0
2 | x-my-extension:
3 |   prop: invalid-value-should-report
  |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 |   prop2: invalid-value-should-not-report
5 | info:

Error was generated by the rule/vendor-extension rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 3 errors.
run \`redocly lint --generate-ignore-file\` to add all problems to the ignore file.


`;
