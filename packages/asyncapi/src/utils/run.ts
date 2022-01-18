import Template from 'boats/build/src/Template'
import bundlerSwaggerParse from 'boats/build/src/bundlerSwaggerParse'
import { BoatsRC } from 'boats/build/src/interfaces/BoatsRc'

interface BoatsArgs {
  input: string
  output: string
  indentation?: number
  strip_value?: string
  variables?: string[]
  functions?: string[]
  dereference?: boolean
  dontValidateOutput?: boolean
  exclude_version?: boolean
}

export async function runBuild(args: BoatsArgs, options: BoatsRC = {}) {
  const boatsRc: BoatsRC = options;

  const returnFile = await Template.directoryParse(
    args.input,
    args.output,
    args.indentation || 2,
    args.strip_value || '',
    args.variables || [],
    args.functions || [],
    boatsRc
  );

  const pathWrittenTo = await bundlerSwaggerParse({
    inputFile: returnFile,
    outputFile: args.output,
    boatsRc,
    dereference: args.dereference || true,
    doNotValidate: args.dontValidateOutput || false,
    excludeVersion: args.exclude_version || false,
    indentation: args.indentation || 2
  });
  console.log('Completed, the files were rendered, validated and bundled to: ' + pathWrittenTo);  
}
