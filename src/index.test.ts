import { open } from 'fs/promises';
import { TOC, parse } from './'

describe('parse TOC', () => {
  describe('empty file', () => {
    it('returns empty TOC object', async () => {
        const file = await open(__dirname + '/../test/fixtures/empty.toc', 'r');
        const toc = await parse(file)
        expect(toc).toEqual(new TOC())
    })
  })
  describe('basic file', () => {
    it('returns basic TOC object', async () => {
        const file = await open(__dirname + '/../test/fixtures/basic.toc', 'r');
        const toc = await parse(file)
        expect(toc).toEqual({
            AddonCompartmentFunc: null,
            AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: 50400,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: "\"Just basic\"",
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Basic Toc File",
            TitleLocalized: {},
            Version: "4.2",
            files: [
              "Dornhoeschen.xml",
              "Rapunzel.lua",
            ],
            xTags: {},
          })
    })
  })
  describe('complete file', () => {
    it('returns complete TOC object', async () => {
        const file = await open(__dirname + '/../test/fixtures/complete.toc', 'r');
        const toc = await parse(file)
        expect(toc).toEqual({
            "AddonCompartmentFunc": "Func1",
            "AddonCompartmentFuncOnEnter": "Func2",
            "AddonCompartmentFuncOnLeave": "Func3",
            "Author": "ulfgebhardt",
            "DefaultState": false,
            "Dependencies": [
              "Lib1",
              "Lib2",
              "Lib3",
            ],
            "IconAtlas": "IconB",
            "IconTexture": "IconA",
            "Interface": 123,
            "LoadManagers": [
              "Addon1",
              "Addon2",
              "Addon3",
            ],
            "LoadOnDemand": true,
            "LoadWith": [
              "AddonA",
              "AddonB",
              "AddonC",
            ],
            "Notes": "Describes the full Toc API",
            "NotesLocalized": {
              "deDE": "Notes deDE",
              "enGB": "Notes enGB",
              "enUS": "Notes enUS",
              "esES": "Notes esES",
              "esMX": "Notes esMX",
              "frFR": "Notes frFR",
              "itIT": "Notes itIT",
              "koKR": "Notes koKR",
              "ptBR": "Notes ptBR",
              "ruRU": "Notes ruRU",
              "zhCN": "Notes zhCN",
              "zhTW": "Notes zhTW",
            },
            "OptionalDeps": [
              "LibA",
              "LibB",
              "LibC",
            ],
            "SavedVariables": [
              "Var1",
              "Var2",
              "Var3",
            ],
            "SavedVariablesPerCharacter": [
              "CVar1",
              "CVar2",
              "CVar3",
            ],
            "Title": "Complete Toc File",
            "TitleLocalized": {
              "deDE": "Title deDE",
              "enGB": "Title enGB",
              "enUS": "Title enUS",
              "esES": "Title esES",
              "esMX": "Title esMX",
              "frFR": "Title frFR",
              "itIT": "Title itIT",
              "koKR": "Title koKR",
              "ptBR": "Title ptBR",
              "ruRU": "Title ruRU",
              "zhCN": "Title zhCN",
              "zhTW": "Title zhTW",
            },
            "Version": "456",
             "files": [
               "Dornhoeschen.xml",
               "Rapunzel.lua",
             ],
            "xTags": {
              "Tag": "XTag",
            }
         })
    })
  })
  describe('Recount file', () => {
    it('returns Recount TOC object', async () => {
        const file = await open(__dirname + '/../test/fixtures/Recount.toc', 'r');
        const toc = await parse(file)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
          AddonCompartmentFuncOnLeave: null,
          Author: "Cryect, ported to 2.4 by Elsia, maintained by Resike from 5.4",
          DefaultState: true,
          Dependencies: [],
          IconAtlas: null,
          IconTexture: null,
          Interface: 50400,
          LoadManagers: [],
          LoadOnDemand: false,
          LoadWith: [],
          Notes: "Records Damage and Healing for Graph Based Display.",
          NotesLocalized: {
            "ruRU": "Записывает урон и исцеления и отоброжает различные графики.",
            "zhCN": "基于 Graph 裤开发的伤害/治疗统计插件.",
            "zhTW": "圖形化顯示的傷害/治療統計插件.",
          },
          OptionalDeps: [
            "Ace3",
            "LibDropdown-1.0",
            "LibSharedMedia-3.0",
            "LibBossIDs-1.0",
            "LibGraph-2.0",
          ],
          SavedVariables: ["RecountDB"],
          SavedVariablesPerCharacter: ["RecountPerCharDB"],
          Title: "Recount",
          TitleLocalized: {},
          Version: "r1269",
          files: [
            "embeds.xml",
            "locales\\Recount-enUS.lua",
            "locales\\Recount-deDE.lua",
            "locales\\Recount-esES.lua",
            "locales\\Recount-esMX.lua",
            "locales\\Recount-frFR.lua",
            "locales\\Recount-ptBR.lua",
            "locales\\Recount-ruRU.lua",
            "locales\\Recount-koKR.lua",
            "locales\\Recount-zhTW.lua",
            "locales\\Recount-zhCN.lua",
            "Recount.lua",
            "Fonts.lua",
            "colors.lua",
            "Widgets.lua",
            "WindowOrder.lua",
            "Fights.lua",
            "Recount_Modes.lua",
            "TrackerModules\\TrackerModule_Dispels.lua",
            "TrackerModules\\TrackerModule_Interrupts.lua",
            "TrackerModules\\TrackerModule_Resurrection.lua",
            "TrackerModules\\TrackerModule_CCBreakers.lua",
            "TrackerModules\\TrackerModule_PowerGains.lua",
            "Tracker.lua",
            "roster.lua",
            "LazySync.lua",
            "deletion.lua",
            "zonefilters.lua",
            "debug.lua",
            "GUI_Main.lua",
            "GUI_Detail.lua",
            "GUI_DeathGraph.lua",
            "GUI_Graph.lua",
            "GUI_Reset.lua",
            "GUI_Report.lua",
            "GUI_Config.lua",
            "GUI_Realtime.lua"
          ],
          xTags: {
            "Curse-Packaged-Version": "r1269",
            "Curse-Project-ID": "recount",
            "Curse-Project-Name": "Recount",
            "Curse-Repository-ID": "wow/recount/mainline"
          },
        })
    })
  })
  describe('strict checks', () => {
    describe('for lines longer then 1024 characters', () => {
        it('fails with strict = true', async () => {
            const file = await open(__dirname + '/../test/fixtures/strict.1024.toc', 'r');
            expect(parse(file)).rejects.toThrowError('Line is longer than TOC_LINE_MAX_LENGTH characters, WoW will truncate!')
        })
        it('succeeds with strict = false', async () => {
            const file = await open(__dirname + '/../test/fixtures/strict.1024.toc', 'r');
            const toc = await parse(file, false)
            expect(toc).toEqual({
              AddonCompartmentFunc: null,
              AddonCompartmentFuncOnEnter: null,
                AddonCompartmentFuncOnLeave: null,
                Author: null,
                DefaultState: true,
                Dependencies: [],
                IconAtlas: null,
                IconTexture: null,
                Interface: null,
                LoadManagers: [],
                LoadOnDemand: false,
                LoadWith: [],
                Notes: null,
                NotesLocalized: {},
                OptionalDeps: [],
                SavedVariables: [],
                SavedVariablesPerCharacter: [],
                Title: "Strict Check - 1024",
                TitleLocalized: {},
                Version: null,
                files: [
                    "somefile.lua",
                ],
                xTags: {
                    "Long": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                },
            })
        })
    })
  describe('for double colon', () => {
    it('fails with strict = true', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.doublecolon.toc', 'r');
        expect(parse(file)).rejects.toThrowError('Tag could not be parsed: X-Invalid-Tag1,, Weird Tag1')
    })
    it('succeeds with strict = false', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.doublecolon.toc', 'r');
        const toc = await parse(file, false)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: null,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: null,
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Strict Check - Double Colon",
            TitleLocalized: {},
            Version: null,
            files: [
                "somefile.lua",
            ],
            xTags: {
            },
        })
    })
})
describe('for duplicate tag', () => {
    it('fails with strict = true', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.duplicate.toc', 'r');
        expect(parse(file)).rejects.toThrowError('Duplicate value: X-Duplicate-Tag')
    })
    it('succeeds with strict = false', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.duplicate.toc', 'r');
        const toc = await parse(file, false)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: null,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: null,
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Strict Check - Duplicate Tag",
            TitleLocalized: {},
            Version: null,
            files: [
                "somefile.lua",
            ],
            xTags: {
              "Duplicate-Tag": "Second"
            },
        })
    })
})
describe('for unknown notes locale', () => {
    it('fails with strict = true', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.locale.notes.toc', 'r');
        expect(parse(file)).rejects.toThrowError('Locale not found: noNO')
    })
    it('succeeds with strict = false', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.locale.notes.toc', 'r');
        const toc = await parse(file, false)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: null,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: null,
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Strict Check - Unknown Notes Locale",
            TitleLocalized: {},
            Version: null,
            files: [
                "somefile.lua",
            ],
            xTags: {
            },
        })
    })
})
describe('for unknown title locale', () => {
    it('fails with strict = true', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.locale.title.toc', 'r');
        expect(parse(file)).rejects.toThrowError('Locale not found: noNO')
    })
    it('succeeds with strict = false', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.locale.title.toc', 'r');
        const toc = await parse(file, false)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: null,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: null,
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Strict Check - Unknown Title Locale",
            TitleLocalized: {},
            Version: null,
            files: [
                "somefile.lua",
            ],
            xTags: {
            },
        })
    })
})
describe('for unknown tag', () => {
    it('fails with strict = true', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.unknowntag.toc', 'r');
        expect(parse(file)).rejects.toThrowError('Unknown Tag name: SomeTag')
    })
    it('succeeds with strict = false', async () => {
        const file = await open(__dirname + '/../test/fixtures/strict.unknowntag.toc', 'r');
        const toc = await parse(file, false)
        expect(toc).toEqual({
          AddonCompartmentFunc: null,
          AddonCompartmentFuncOnEnter: null,
            AddonCompartmentFuncOnLeave: null,
            Author: null,
            DefaultState: true,
            Dependencies: [],
            IconAtlas: null,
            IconTexture: null,
            Interface: null,
            LoadManagers: [],
            LoadOnDemand: false,
            LoadWith: [],
            Notes: null,
            NotesLocalized: {},
            OptionalDeps: [],
            SavedVariables: [],
            SavedVariablesPerCharacter: [],
            Title: "Strict Check - Unknown Tag",
            TitleLocalized: {},
            Version: null,
            files: [
                "somefile.lua",
            ],
            xTags: {
            },
        })
    })
})
})
})
