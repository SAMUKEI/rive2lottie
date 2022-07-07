(async () => {
  const fs = require('fs')
  const converter = require('rive-lottie')

  const commandLineArgs = require('command-line-args')
  const commandLineUsage = require('command-line-usage')

  const optionDefinitions = [
    {
      name: 'input',
      alias: 'i',
      type: String,
      description: 'input riv file path'
    },
    {
      name: 'output',
      alias: 'o',
      type: String,
      description: 'output lottie(json) file path'
    },
    {
      name: 'help',
      alias: 'h',
      type: Boolean,
      description: 'show help'
    }
  ];

  const sections = [
    {
      header: 'Riv to Lottie',
      content: 'this is .riv to .json'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    }
  ];

  const options = commandLineArgs(optionDefinitions)
  if (Object.keys(options).length === 0 || options.help) {
    const usage = commandLineUsage(sections)
    console.log(usage);
    process.exit(0);
  }

  const buffer = fs.readFileSync(options.input)
  const animationsData = await converter(buffer)
  animationsData.forEach((anim, index) => {
    fs.writeFile(
      options.output,
      JSON.stringify(anim, null),
      () => {
      },
    )
  })
  console.log(`successfully output file is \n${options.output}`)
})()

