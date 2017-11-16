import CustomReporter = jasmine.CustomReporter;
import CustomReporterResult = jasmine.CustomReporterResult;

export class TraceReporter implements CustomReporter {
  private traceResult = new Map<string, SpecResult[]>();

  specDone(result: CustomReporterResult) {
    const tags = (result['metadata'] || {tags: []}).tags;
    tags.forEach(tag => {
      if (this.traceResult.has(tag)) {
        this.traceResult.set(tag, this.traceResult.get(tag).concat({
          description: result.description,
          passed: result.status === 'passed'
        }));
      } else {
        this.traceResult.set(tag, [{description: result.description, passed: result.status === 'passed'}]);
      }
    });
  }

  jasmineDone() {
    const result = Array.from(this.traceResult.entries()).reduce((report, [tag, specResults]) =>
        Object.assign(report, {
          [tag]: {
            compliant: specResults.reduce((isCompliant, {passed}) => isCompliant && passed, true),
            testCases: specResults.reduce((results, {description, passed}) =>
                Object.assign(results, {[description]: passed ? 'passed' : 'failed'}),
              {})
          }
        }),
      {});

    console.log(JSON.stringify(result, null, 4));
  }
}

interface SpecResult {
  description: string;
  passed: boolean;
}
