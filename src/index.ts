/*
https://wowwiki-archive.fandom.com/wiki/TOC_format
https://wowpedia.fandom.com/wiki/TOC_format
*/
import { FileHandle } from 'fs/promises';
export const TOC_PREFIX_TAG = '## '
export const TOC_PREFIX_COMMENT = '#'
export const TOC_TAG_DELIMITER = ':'
export const TOC_LINE_MAX_LENGTH = 1024

export const TOC_TAG_NAME_INTERFACE = 'Interface'
export const TOC_TAG_NAME_TITLE = 'Title'
export const TOC_TAG_NAME_NOTES = 'Notes'
export const TOC_TAG_NAME_ICONTEXTURE = 'IconTexture'
export const TOC_TAG_NAME_ICONATLAS = 'IconAtlas'
export const TOC_TAG_NAME_ADDONCOMPARTMENTFUNC = 'AddonCompartmentFunc'
export const TOC_TAG_NAME_ADDONCOMPARTMENTFUNCONENTER = 'AddonCompartmentFuncOnEnter'
export const TOC_TAG_NAME_ADDONCOMPARTMENTFUNCONLEAVE = 'AddonCompartmentFuncOnLeave'
export const TOC_TAG_NAME_LOADONDEMAND = 'LoadOnDemand'
export const TOC_TAG_NAME_OPTIONALDEPS = 'OptionalDeps'
export const TOC_TAG_NAME_LOADWITH = 'LoadWith'
export const TOC_TAG_NAME_LOADMANAGERS = 'LoadManagers'
export const TOC_TAG_NAME_DEFAULTSTATE = 'DefaultState'
export const TOC_TAG_NAME_SAVEDVARIABLES = 'SavedVariables'
export const TOC_TAG_NAME_SAVEDVARIABESPERCHARACTER = 'SavedVariablesPerCharacter'
export const TOC_TAG_NAME_AUTHOR = 'Author'
export const TOC_TAG_NAME_VERSION = 'Version'

export const TOC_TAG_PREFIX_TITLELOCALIZED = 'title-'
export const TOC_TAG_PREFIX_NOTESLOCALIZED = 'notes-'
export const TOC_TAG_PREFIX_DEP = 'dep'
export const TOC_TAG_PREFIX_X = 'x-'

export const TOC_TAG_LIST_DELIMITER = ','

export const TOC_TAG_VALUE_LOADONDEMAND = '1'
export const TOC_TAG_VALUE_DEFAULTSTATE_DISABLED = 'disabled'

export enum WOW_LOCALES {
  frFR = 'frFR',
  deDE = 'deDE',
  enGB = 'enGB',
  enUS = 'enUS',
  itIT = 'itIT',
  koKR = 'koKR',
  zhCN = 'zhCN',
  zhTW = 'zhTW',
  ruRU = 'ruRU',
  esES = 'esES',
  esMX = 'esMX',
  ptBR = 'ptBR',
}

export class TOC {
  Interface: number | null = null
  Title: string | null = null
  TitleLocalized: Partial<Record<WOW_LOCALES,string>> = {}
  Notes: string | null = null
  NotesLocalized: Partial<Record<WOW_LOCALES,string>> = {}
  IconTexture: string | null = null
  IconAtlas: string | null = null
  AddonCompartmentFunc: string | null = null
  AddonCompartmentFuncOnEnter: string | null = null
  AddonCompartmentFuncOnLeave: string | null = null
  LoadOnDemand: boolean = false
  Dependencies: string[] = []
  OptionalDeps: string[] = []
  LoadWith: string[] = []
  LoadManagers: string[] = []
  DefaultState: boolean = true
  SavedVariables: string[] = []
  SavedVariablesPerCharacter: string[] = []
  Author: string | null = null
  Version: string | null = null
  xTags: Record<string, string> = {}
  files: string[] = []

  /*
  toString(){
    var result: string[] = [];
    for(const tag in toc.allTags) {
      result.push(`${TOC_PREFIX_TAG}${tag}${TOC_TAG_SEPARATOR} ${toc.allTags[tag]}`)
    }
    result.concat(this.files)
    return result.join('\n');
  };
  */
}

// import { open } from 'fs/promises';
// const file = await open('./words.txt', 'r');
export const parse = async function(file: FileHandle, strict = true) {
  const result = new TOC();
  const allTags: Record<string, string> = {}
  for await (const line of file.readLines()) {
    if (strict && line.length > TOC_LINE_MAX_LENGTH) {
      throw new Error('Line is longer than TOC_LINE_MAX_LENGTH characters, WoW will truncate!');
    }

    if (line.slice(0, TOC_PREFIX_TAG.length) === TOC_PREFIX_TAG) {
      const tagData = line.slice(TOC_PREFIX_TAG.length+1).split(TOC_TAG_DELIMITER)
      if(tagData.length !== 2){
        if(strict){
          throw new Error(`Tag could not be parsed: ${tagData}`)
        } else {
          continue
        }
      }

      const tagName = tagData[0].trim()
      const tagValue = tagData[1].trim()
      if(strict && allTags[tagName]){
        throw new Error(`Duplicate value: ${tagName}`)
      }

      allTags[tagName] = tagValue;

      switch(tagName.toLowerCase()){
        case TOC_TAG_NAME_INTERFACE.toLowerCase():
          result.Interface = Number(tagValue)
          break;
        case TOC_TAG_NAME_TITLE.toLowerCase():
          result.Title = tagValue  
          break;
        case TOC_TAG_NAME_NOTES.toLocaleLowerCase():
          result.Notes = tagValue  
          break
        case TOC_TAG_NAME_ICONTEXTURE.toLowerCase():
          result.IconTexture = tagValue
          break
        case TOC_TAG_NAME_ICONATLAS.toLowerCase():
          result.IconAtlas = tagValue
          break
        case TOC_TAG_NAME_ADDONCOMPARTMENTFUNC.toLowerCase():
          result.AddonCompartmentFunc = tagValue
          break
        case TOC_TAG_NAME_ADDONCOMPARTMENTFUNCONENTER.toLowerCase():
          result.AddonCompartmentFuncOnEnter = tagValue
          break
        case TOC_TAG_NAME_ADDONCOMPARTMENTFUNCONLEAVE.toLowerCase():
          result.AddonCompartmentFuncOnLeave = tagValue
          break
        case TOC_TAG_NAME_LOADONDEMAND.toLowerCase():
          result.LoadOnDemand = tagValue === TOC_TAG_VALUE_LOADONDEMAND
          break
        case TOC_TAG_NAME_OPTIONALDEPS.toLowerCase():
          result.OptionalDeps = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          break
        case TOC_TAG_NAME_LOADWITH.toLowerCase():
          result.LoadWith = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          break
        case TOC_TAG_NAME_LOADMANAGERS.toLowerCase():
          result.LoadManagers = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          break
        case TOC_TAG_NAME_DEFAULTSTATE.toLowerCase():
          result.DefaultState = tagValue.toLowerCase() !== TOC_TAG_VALUE_DEFAULTSTATE_DISABLED
          break
        case TOC_TAG_NAME_SAVEDVARIABLES.toLowerCase():
          result.SavedVariables = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          break
        case TOC_TAG_NAME_SAVEDVARIABESPERCHARACTER.toLowerCase():
          result.SavedVariablesPerCharacter = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          break
        case TOC_TAG_NAME_AUTHOR.toLowerCase():
          result.Author = tagValue
          break
        case TOC_TAG_NAME_VERSION.toLowerCase():
          result.Version = tagValue
          break
        default:
          if(tagName.toLowerCase().startsWith(TOC_TAG_PREFIX_TITLELOCALIZED) && tagName.length === TOC_TAG_PREFIX_TITLELOCALIZED.length+4){
            const locale = tagName.slice(TOC_TAG_PREFIX_TITLELOCALIZED.length,TOC_TAG_PREFIX_TITLELOCALIZED.length+4)
            if(Object.keys(WOW_LOCALES).includes(locale)){
              result.TitleLocalized[locale as WOW_LOCALES] = tagValue
            } else if(strict){
              throw new Error(`locale not found ${locale}`)
            }
          } else if(tagName.toLowerCase().startsWith(TOC_TAG_PREFIX_NOTESLOCALIZED) && tagName.length === TOC_TAG_PREFIX_NOTESLOCALIZED.length+4){
            const locale = tagName.slice(TOC_TAG_PREFIX_NOTESLOCALIZED.length,TOC_TAG_PREFIX_NOTESLOCALIZED.length+4)
            if(Object.keys(WOW_LOCALES).includes(locale)){
              result.NotesLocalized[locale as WOW_LOCALES] = tagValue
            } else if(strict){
              throw new Error(`locale not found ${locale}`)
            }
          } else if(tagName.toLowerCase().startsWith(TOC_TAG_PREFIX_DEP)){
            result.Dependencies = tagValue.split(TOC_TAG_LIST_DELIMITER).map((s) => s.trim())
          } else if(tagName.toLowerCase().startsWith(TOC_TAG_PREFIX_X)){
            result.xTags[tagName.slice(TOC_TAG_PREFIX_X.length)] = tagValue
          } else if(strict){
            throw new Error(`Unknown Tag name: ${tagName}`)
          }
      }
    } else if (line.slice(0, 1) !== TOC_PREFIX_COMMENT && !line.trim()) {
      result.files.push(line.trimEnd());
    } 
  }
  return result;
};
