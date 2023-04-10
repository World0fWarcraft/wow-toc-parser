// TODO file handle?
import { FileHandle, open } from 'fs/promises'; 
// const file = await fsPromise.open('./words.txt', 'r');
const TOC_PREFIX_TAG = '## '
const TOC_PREFIX_COMMENT = '#'
const TOC_TAG_SEPARATOR = ':'
const TOC_LINE_MAX_LENGTH = 1024

export type TOC = {/*interface: number, title: string, titleLocalized: Record<string,string>, xTags: Record<string, string>,*/ allTags: Record<string, string>,files: string[]}

export const parse = async function(file: FileHandle, strict = true) {
  const result: TOC = {
    // interface: 0,
    // title: '',
    // titleLocalized: {},
    // xTags: {},
    allTags: {},
    files: [],
  };
  for await (const line of file.readLines()) {
    if (strict && line.length > TOC_LINE_MAX_LENGTH) {
      throw new Error('Line is longer than TOC_LINE_MAX_LENGTH characters, WoW will truncate!');
    }

    if (line.slice(0, TOC_PREFIX_TAG.length) === TOC_PREFIX_TAG) {
      const tagData = line.slice(TOC_PREFIX_TAG.length+1).split(TOC_TAG_SEPARATOR)
      if(tagData.length !== 2){
        throw new Error(`Tag could not be parsed: ${tagData}`)
      }

      const tagName = tagData[0].trim()
      const tagValue = tagData[1].trim()
      if(strict && result.allTags[tagName]){
        throw new Error(`Duplicate value: ${tagName}`)
      }

      result.allTags[tagName] = tagValue;

      // specific tags
      /*switch(tagName.toLowerCase()){
        case 'interface': 
          result.interface = Number(tagValue)
          break;
        case 'title':
          result.title
          break;
      }*/

      // 
    } else if (line.slice(0, 1) !== TOC_PREFIX_COMMENT && !line.trim()) {
      result.files.push(line.trimEnd()));
    } 
  }
  return result;
};

/*
https://wowpedia.fandom.com/wiki/TOC_format
## Interface: 100007
## Title: Waiting for Godot
## Title-frFR: En attendant Godot
## Notes: This word is |cFFFF0000red|r
## IconTexture: Interface\Icons\TEMP
## IconAtlas: TaskPOI-Icon
// ## AddonCompartmentFunc: MyAddon_OnAddonCompartmentClick
// ## AddonCompartmentFuncOnEnter: MyAddon_OnAddonCompartmentEnter
// ## AddonCompartmentFuncOnLeave: MyAddon_OnAddonCompartmentLeave
## LoadOnDemand: 1
## Dependencies: someAddOn, someOtherAddOn
## OptionalDeps: someAddOn, someOtherAddOn
## LoadWith: someAddOn, someOtherAddOn
// ## LoadManagers: someAddOn, someOtherAddOn
## DefaultState: disabled
## SavedVariables: MyAddOnNameFoo, MyAddOnNameBar
## SavedVariablesPerCharacter: MyAddOnNameAnotherVariable
## Author
## Version
## X-_____

*/

export const stringify = function(toc: TOC) {
  var result: string[] = [];
  for(const tag in toc.allTags) {
    result.push(`${TOC_PREFIX_TAG}${tag}${TOC_TAG_SEPARATOR} ${toc.allTags[tag]}`)
  }
  result.concat(toc.files)
  return result.join('\n');
};
