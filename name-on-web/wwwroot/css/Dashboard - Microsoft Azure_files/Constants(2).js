define(["require", "exports", "EMA/ClientResources/ClientResources", "../Workflow/Constants"], function (require, exports, ClientResources, WorkflowConstants) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArtifactNameRegEx = "^[a-zA-Z0-9\-_.()]+$";
    exports.IdentityValueRegEx = "^\"?[a-zA-Z0-9\-_.() ]+\"?$";
    exports.UrlRegEx = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
    exports.ArtifactNameMaxLength = 80;
    exports.BatchConfigurationNameMaxLength = 20;
    exports.BatchConfigurationNameRegEx = "^[a-zA-Z0-9]+$";
    exports.FileNameKey = "fileName";
    exports.DefaultContentVersion = "1.0";
    exports.MultipleErrorsOccurred = "MultipleErrorsOccurred";
    exports.BusinessIdentityValueMaxLength = 128;
    exports.DefaultPageSize = 1000;
    exports.PartnersListDefaultPageSize = 20;
    exports.DefaultBatchGroupName = "DEFAULT";
    exports.MaxBatchSize = 83886080;
    var PricingTier = (function () {
        function PricingTier() {
        }
        return PricingTier;
    }());
    PricingTier.Free = "Free";
    PricingTier.Basic = "Basic";
    PricingTier.Standard = "Standard";
    exports.PricingTier = PricingTier;
    var HelpLinks = (function () {
        function HelpLinks() {
        }
        return HelpLinks;
    }());
    HelpLinks.SchemasLearnMore = "integration-account-schemas";
    HelpLinks.IntegrationAccountOms = "logicappsaccount";
    HelpLinks.AssembliesLearnMore = "integration-account-assemblies";
    exports.HelpLinks = HelpLinks;
    var BatchConfigurationReleaseTypes = (function () {
        function BatchConfigurationReleaseTypes() {
        }
        return BatchConfigurationReleaseTypes;
    }());
    BatchConfigurationReleaseTypes.MessageCountBased = "MessageCount";
    BatchConfigurationReleaseTypes.BatchSizeBased = "BatchSize";
    BatchConfigurationReleaseTypes.ScheduleBased = "Schedule";
    exports.BatchConfigurationReleaseTypes = BatchConfigurationReleaseTypes;
    var RecurrenceFrequency = (function () {
        function RecurrenceFrequency() {
        }
        return RecurrenceFrequency;
    }());
    RecurrenceFrequency.Month = "Month";
    RecurrenceFrequency.Week = "Week";
    RecurrenceFrequency.Day = "Day";
    RecurrenceFrequency.Hour = "Hour";
    RecurrenceFrequency.Minute = "Minute";
    RecurrenceFrequency.Second = "Second";
    exports.RecurrenceFrequency = RecurrenceFrequency;
    var RecurrenceDaysInWeek = (function () {
        function RecurrenceDaysInWeek() {
        }
        return RecurrenceDaysInWeek;
    }());
    RecurrenceDaysInWeek.Monday = "Monday";
    RecurrenceDaysInWeek.Tuesday = "Tuesday";
    RecurrenceDaysInWeek.Wednesday = "Wednesday";
    RecurrenceDaysInWeek.Thursday = "Thursday";
    RecurrenceDaysInWeek.Friday = "Friday";
    RecurrenceDaysInWeek.Saturday = "Saturday";
    RecurrenceDaysInWeek.Sunday = "Sunday";
    exports.RecurrenceDaysInWeek = RecurrenceDaysInWeek;
    var RecurrenceTimeZones = (function () {
        function RecurrenceTimeZones() {
        }
        return RecurrenceTimeZones;
    }());
    RecurrenceTimeZones.DatelineStandardTime = "Dateline Standard Time";
    RecurrenceTimeZones.UtcMinus11 = "UTC-11";
    RecurrenceTimeZones.AleutianStandardTime = "Aleutian Standard Time";
    RecurrenceTimeZones.HawaiianStandardTime = "Hawaiian Standard Time";
    RecurrenceTimeZones.MarquesasStandardTime = "Marquesas Standard Time";
    RecurrenceTimeZones.AlaskanStandardTime = "Alaskan Standard Time";
    RecurrenceTimeZones.UtcMinus9 = "UTC-09";
    RecurrenceTimeZones.MexicoPacificStandardTime = "Pacific Standard Time (Mexico)";
    RecurrenceTimeZones.UtcMinus8 = "UTC-08";
    RecurrenceTimeZones.PacificStandardTime = "Pacific Standard Time";
    RecurrenceTimeZones.UsMountainStandardTime = "US Mountain Standard Time";
    RecurrenceTimeZones.MexicoMountainStandardTime = "Mountain Standard Time (Mexico)";
    RecurrenceTimeZones.MountainStandardTime = "Mountain Standard Time";
    RecurrenceTimeZones.CentralAmericaStandardTime = "Central America Standard Time";
    RecurrenceTimeZones.CentralStandardTime = "Central Standard Time";
    RecurrenceTimeZones.EasterIslandStandardTime = "Easter Island Standard Time";
    RecurrenceTimeZones.MexicoCentralStandardTime = "Central Standard Time (Mexico)";
    RecurrenceTimeZones.CanadaCentralStandardTime = "Canada Central Standard Time";
    RecurrenceTimeZones.SaPacificStandardTime = "SA Pacific Standard Time";
    RecurrenceTimeZones.MexicoEasternStandardTime = "Eastern Standard Time (Mexico)";
    RecurrenceTimeZones.EasternStandardTime = "Eastern Standard Time";
    RecurrenceTimeZones.HaitiStandardTime = "Haiti Standard Time";
    RecurrenceTimeZones.CubaStandardTime = "Cuba Standard Time";
    RecurrenceTimeZones.UsEasternStandardTime = "US Eastern Standard Time";
    RecurrenceTimeZones.ParaguayStandardTime = "Paraguay Standard Time";
    RecurrenceTimeZones.AtlanticStandardTime = "Atlantic Standard Time";
    RecurrenceTimeZones.VenezuelaStandardTime = "Venezuela Standard Time";
    RecurrenceTimeZones.CentralBrazilianStandardTime = "Central Brazilian Standard Time";
    RecurrenceTimeZones.SaWesternStandardTime = "SA Western Standard Time";
    RecurrenceTimeZones.PacificSaStandardTime = "Pacific SA Standard Time";
    RecurrenceTimeZones.TurksAndCaicosStandardTime = "Turks And Caicos Standard Time";
    RecurrenceTimeZones.NewfoundlandStandardTime = "Newfoundland Standard Time";
    RecurrenceTimeZones.TocantinsStandardTime = "Tocantins Standard Time";
    RecurrenceTimeZones.EastSouthAmericaStandardTime = "E. South America Standard Time";
    RecurrenceTimeZones.SaEasternStandardTime = "SA Eastern Standard Time";
    RecurrenceTimeZones.ArgentinaStandardTime = "Argentina Standard Time";
    RecurrenceTimeZones.GreenlandStandardTime = "Greenland Standard Time";
    RecurrenceTimeZones.MontevideoStandardTime = "Montevideo Standard Time";
    RecurrenceTimeZones.SaintPierreStandardTime = "Saint Pierre Standard Time";
    RecurrenceTimeZones.BahiaStandardTime = "Bahia Standard Time";
    RecurrenceTimeZones.UtcMinus2 = "UTC-02";
    RecurrenceTimeZones.MidAtlanticStandardTime = "Mid-Atlantic Standard Time";
    RecurrenceTimeZones.AzoresStandardTime = "Azores Standard Time";
    RecurrenceTimeZones.CapeVerdeStandardTime = "Cape Verde Standard Time";
    RecurrenceTimeZones.Utc = "UTC";
    RecurrenceTimeZones.MoroccoStandardTime = "Morocco Standard Time";
    RecurrenceTimeZones.GmtStandardTime = "GMT Standard Time";
    RecurrenceTimeZones.GreenwichStandardTime = "Greenwich Standard Time";
    RecurrenceTimeZones.WesternEuropeStandardTime = "W. Europe Standard Time";
    RecurrenceTimeZones.CentralEuropeStandardTime = "Central Europe Standard Time";
    RecurrenceTimeZones.RomanceStandardTime = "Romance Standard Time";
    RecurrenceTimeZones.CentralEuropeanStandardTime = "Central European Standard Time";
    RecurrenceTimeZones.WestCentralAfricaStandardTime = "W. Central Africa Standard Time";
    RecurrenceTimeZones.NamibiaStandardTime = "Namibia Standard Time";
    RecurrenceTimeZones.JordanStandardTime = "Jordan Standard Time";
    RecurrenceTimeZones.GtbStandardTime = "GTB Standard Time";
    RecurrenceTimeZones.MiddleEastStandardTime = "Middle East Standard Time";
    RecurrenceTimeZones.EgyptStandardTime = "Egypt Standard Time";
    RecurrenceTimeZones.EasternEuropeanStandardTime = "E. Europe Standard Time";
    RecurrenceTimeZones.SyriaStandardTime = "Syria Standard Time";
    RecurrenceTimeZones.WestBankStandardTime = "West Bank Standard Time";
    RecurrenceTimeZones.SouthAfricaStandardTime = "South Africa Standard Time";
    RecurrenceTimeZones.FleStandardTime = "FLE Standard Time";
    RecurrenceTimeZones.TurkeyStandardTime = "Turkey Standard Time";
    RecurrenceTimeZones.IsraelStandardTime = "Israel Standard Time";
    RecurrenceTimeZones.KaliningradStandardTime = "Kaliningrad Standard Time";
    RecurrenceTimeZones.LibyaStandardTime = "Libya Standard Time";
    RecurrenceTimeZones.ArabicStandardTime = "Arabic Standard Time";
    RecurrenceTimeZones.ArabStandardTime = "Arab Standard Time";
    RecurrenceTimeZones.BelarusStandardTime = "Belarus Standard Time";
    RecurrenceTimeZones.RussianStandardTime = "Russian Standard Time";
    RecurrenceTimeZones.EasternAfricaStandardTime = "E. Africa Standard Time";
    RecurrenceTimeZones.IranStandardTime = "Iran Standard Time";
    RecurrenceTimeZones.ArabianStandardTime = "Arabian Standard Time";
    RecurrenceTimeZones.AstrakhanStandardTime = "Astrakhan Standard Time";
    RecurrenceTimeZones.AzerbaijanStandardTime = "Azerbaijan Standard Time";
    RecurrenceTimeZones.RussiaTimeZone3 = "Russia Time Zone 3";
    RecurrenceTimeZones.MauritiusStandardTime = "Mauritius Standard Time";
    RecurrenceTimeZones.GeorgianStandardTime = "Georgian Standard Time";
    RecurrenceTimeZones.CaucasusStandardTime = "Caucasus Standard Time";
    RecurrenceTimeZones.AfghanistanStandardTime = "Afghanistan Standard Time";
    RecurrenceTimeZones.WestAsiaStandardTime = "West Asia Standard Time";
    RecurrenceTimeZones.EkaterinburgStandardTime = "Ekaterinburg Standard Time";
    RecurrenceTimeZones.PakistanStandardTime = "Pakistan Standard Time";
    RecurrenceTimeZones.IndiaStandardTime = "India Standard Time";
    RecurrenceTimeZones.SriLankaStandardTime = "Sri Lanka Standard Time";
    RecurrenceTimeZones.NepalStandardTime = "Nepal Standard Time";
    RecurrenceTimeZones.CentralAsiaStandardTime = "Central Asia Standard Time";
    RecurrenceTimeZones.BangladeshStandardTime = "Bangladesh Standard Time";
    RecurrenceTimeZones.NorthCentralAsiaStandardTime = "N. Central Asia Standard Time";
    RecurrenceTimeZones.MyanmarStandardTime = "Myanmar Standard Time";
    RecurrenceTimeZones.SeAsiaStandardTime = "SE Asia Standard Time";
    RecurrenceTimeZones.AltaiStandardTime = "Altai Standard Time";
    RecurrenceTimeZones.WestMongoliaStandardTime = "W. Mongolia Standard Time";
    RecurrenceTimeZones.NorthAsiaStandardTime = "North Asia Standard Time";
    RecurrenceTimeZones.TomskStandardTime = "Tomsk Standard Time";
    RecurrenceTimeZones.ChinaStandardTime = "China Standard Time";
    RecurrenceTimeZones.NorthAsiaEastStandardTime = "North Asia East Standard Time";
    RecurrenceTimeZones.SingaporeStandardTime = "Singapore Standard Time";
    RecurrenceTimeZones.WestAustraliaStandardTime = "W. Australia Standard Time";
    RecurrenceTimeZones.TaipeiStandardTime = "Taipei Standard Time";
    RecurrenceTimeZones.UlaanbaatarStandardTime = "Ulaanbaatar Standard Time";
    RecurrenceTimeZones.NorthKoreaStandardTime = "North Korea Standard Time";
    RecurrenceTimeZones.AustraliaCentralWesternStandardTime = "Aus Central W. Standard Time";
    RecurrenceTimeZones.TransbaikalStandardTime = "Transbaikal Standard Time";
    RecurrenceTimeZones.TokyoStandardTime = "Tokyo Standard Time";
    RecurrenceTimeZones.KoreaStandardTime = "Korea Standard Time";
    RecurrenceTimeZones.YakutskStandardTime = "Yakutsk Standard Time";
    RecurrenceTimeZones.CentralAustraliaStandardTime = "Cen. Australia Standard Time";
    RecurrenceTimeZones.AustraliaCentralStandardTime = "AUS Central Standard Time";
    RecurrenceTimeZones.EasternAustraliaStandardTime = "E. Australia Standard Time";
    RecurrenceTimeZones.AustraliaEasternStandardTime = "AUS Eastern Standard Time";
    RecurrenceTimeZones.WestPacificStandardTime = "West Pacific Standard Time";
    RecurrenceTimeZones.TasmaniaStandardTime = "Tasmania Standard Time";
    RecurrenceTimeZones.VladivostokStandardTime = "Vladivostok Standard Time";
    RecurrenceTimeZones.LordHoweStandardTime = "Lord Howe Standard Time";
    RecurrenceTimeZones.BougainvilleStandardTime = "Bougainville Standard Time";
    RecurrenceTimeZones.RussiaTimeZone10 = "Russia Time Zone 10";
    RecurrenceTimeZones.MagadanStandardTime = "Magadan Standard Time";
    RecurrenceTimeZones.NorfolkStandardTime = "Norfolk Standard Time";
    RecurrenceTimeZones.SakhalinStandardTime = "Sakhalin Standard Time";
    RecurrenceTimeZones.CentralPacificStandardTime = "Central Pacific Standard Time";
    RecurrenceTimeZones.RussiaTimeZone11 = "Russia Time Zone 11";
    RecurrenceTimeZones.NewZealandStandardTime = "New Zealand Standard Time";
    RecurrenceTimeZones.UtcPlus12 = "UTC+12";
    RecurrenceTimeZones.FijiStandardTime = "Fiji Standard Time";
    RecurrenceTimeZones.KamchatkaStandardTime = "Kamchatka Standard Time";
    RecurrenceTimeZones.ChathamIslandsStandardTime = "Chatham Islands Standard Time";
    RecurrenceTimeZones.TongaStandardTime = "Tonga Standard Time";
    RecurrenceTimeZones.SamoaStandardTime = "Samoa Standard Time";
    RecurrenceTimeZones.LineIslandsStandardTime = "Line Islands Standard Time";
    exports.RecurrenceTimeZones = RecurrenceTimeZones;
    var Format = (function () {
        function Format() {
        }
        return Format;
    }());
    Format.DateFormat = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    };
    exports.Format = Format;
    var UploadFileSize = (function () {
        function UploadFileSize() {
        }
        return UploadFileSize;
    }());
    UploadFileSize.Small = "Small";
    UploadFileSize.Large = "Large";
    exports.UploadFileSize = UploadFileSize;
    var Metadata = (function () {
        function Metadata() {
        }
        return Metadata;
    }());
    Metadata.Object = "[object]";
    exports.Metadata = Metadata;
    var Create = (function () {
        function Create() {
        }
        return Create;
    }());
    Create.ResourceProvider = "Microsoft.Logic";
    Create.RootResource = "IntegrationAccounts";
    Create.FreeSpecId = "Free";
    exports.Create = Create;
    var CreateBladeTemplateIds = (function () {
        function CreateBladeTemplateIds() {
        }
        return CreateBladeTemplateIds;
    }());
    CreateBladeTemplateIds.CreateIntegrationAccount = "CreateIntegrationAccount";
    CreateBladeTemplateIds.CreateIntegrationAccountAndIntegrationServiceEnvironment = "CreateIntegrationAccount_IntegrationServiceEnvironment";
    CreateBladeTemplateIds.CreateIntegrationAccountAndOmsWorkspace = "CreateIntegrationAccount_OmsWorkspace";
    CreateBladeTemplateIds.CreateIntegrationAccountOmsWorkspaceAndIntegrationServiceEnvironment = "CreateIntegrationAccount_OmsWorkspace_IntegrationServiceEnvironment";
    CreateBladeTemplateIds.OmsLogicAppB2BSolutionName = "LogicAppB2B";
    exports.CreateBladeTemplateIds = CreateBladeTemplateIds;
    var ContentType = (function () {
        function ContentType() {
        }
        return ContentType;
    }());
    ContentType.ApplicationXml = "application/xml";
    ContentType.TextPlain = "text/plain";
    ContentType.OctetStream = "application/octet-stream";
    exports.ContentType = ContentType;
    var Schemas = (function () {
        function Schemas() {
        }
        return Schemas;
    }());
    Schemas.Type = "xml";
    Schemas.FileExtension = ".xsd";
    Schemas.MaxFileSize = 2 * 1024 * 1024;
    Schemas.ExpandedType = "Microsoft.Logic/integrationAccounts/schemas";
    exports.Schemas = Schemas;
    var Assemblies = (function () {
        function Assemblies() {
        }
        return Assemblies;
    }());
    Assemblies.FileExtension = ".dll";
    Assemblies.MaxFileSize = 2 * 1024 * 1024;
    exports.Assemblies = Assemblies;
    var Maps = (function () {
        function Maps() {
        }
        return Maps;
    }());
    Maps.LiquidValue = "Liquid";
    Maps.Xslt1Value = "Xslt";
    Maps.Xslt2Value = "Xslt20";
    Maps.Xslt3Value = "Xslt30";
    // Duplicated strings until the upgrade to ES6 and can use variables
    Maps.MapTypesDisplay = {
        "Liquid": ClientResources.IntegrationAccount.Maps.MapType.liquid,
        "Xslt": ClientResources.IntegrationAccount.Maps.MapType.xslt,
        "Xslt20": ClientResources.IntegrationAccount.Maps.MapType.xslt20,
        "Xslt30": ClientResources.IntegrationAccount.Maps.MapType.xslt30
    };
    Maps.LiquidFileExtension = ".liquid";
    Maps.XsltFileExtension = ".xslt";
    Maps.FileExtensions = Maps.LiquidFileExtension + ", " + Maps.XsltFileExtension;
    exports.Maps = Maps;
    var Agreements = (function () {
        function Agreements() {
        }
        return Agreements;
    }());
    Agreements.AS2 = "AS2";
    Agreements.X12 = "X12";
    Agreements.EDIFACT = "EDIFACT";
    Agreements.DefaultMessageContentType = "text/plain";
    Agreements.IdSeparator = "/agreements/";
    Agreements.DefaultDispositionURL = "http://localhost";
    Agreements.QualifierValueSeparator = " : ";
    exports.Agreements = Agreements;
    var MicHashing = (function () {
        function MicHashing() {
        }
        return MicHashing;
    }());
    MicHashing.Algorithms = ko.observableArray([
        { text: ko.observable("SHA1"), value: "SHA1" },
        { text: ko.observable("MD5"), value: "MD5" },
        { text: ko.observable("SHA2-256"), value: "SHA2256" },
        { text: ko.observable("SHA2-384"), value: "SHA2384" },
        { text: ko.observable("SHA2-512"), value: "SHA2512" }
    ]);
    MicHashing.DefaultHashingAlgorithm = "SHA1";
    exports.MicHashing = MicHashing;
    var Encryption = (function () {
        function Encryption() {
        }
        return Encryption;
    }());
    Encryption.Algorithms = ko.observableArray([
        { text: ko.observable("AES-128"), value: "AES128" },
        { text: ko.observable("AES-192"), value: "AES192" },
        { text: ko.observable("AES-256"), value: "AES256" },
        { text: ko.observable("DES3"), value: "DES3" },
        { text: ko.observable("RC2"), value: "RC2" },
    ]);
    Encryption.DefaultEncryptionAlgorithm = "DES3";
    exports.Encryption = Encryption;
    var Signing = (function () {
        function Signing() {
        }
        return Signing;
    }());
    Signing.Algorithms = ko.observableArray([
        { text: ko.observable("Default - Based on certificate"), value: "Default" },
        { text: ko.observable("SHA1"), value: "SHA1" },
        { text: ko.observable("SHA2-256"), value: "SHA2256" },
        { text: ko.observable("SHA2-384"), value: "SHA2384" },
        { text: ko.observable("SHA2-512"), value: "SHA2512" },
    ]);
    Signing.DefaultSigningAlgorithm = "Default";
    exports.Signing = Signing;
    var Algorithms = (function () {
        function Algorithms() {
        }
        return Algorithms;
    }());
    Algorithms.Sha2AlgorithmFormats = ko.observableArray([
        { text: ko.observable(""), value: null },
        { text: ko.observable("Sha2"), value: "sha2" },
        { text: ko.observable("ShaHashSize - e.g. sha256"), value: "ShaHashSize" },
        { text: ko.observable("Sha-HashSize - e.g. sha-256"), value: "Sha-HashSize" },
        { text: ko.observable("Sha2_HashSize - e.g. sha2_256"), value: "Sha2_HashSize" },
    ]);
    exports.Algorithms = Algorithms;
    var SendSettings = (function () {
        function SendSettings() {
        }
        return SendSettings;
    }());
    SendSettings.CharacterSets = ko.observableArray([
        { text: ko.observable("Basic"), value: "Basic" },
        { text: ko.observable("Extended"), value: "Extended" },
        { text: ko.observable("UTF8"), value: "UTF8" }
    ]);
    SendSettings.InputType = ko.observableArray([
        { text: ko.observable("Char"), value: "Char" }
    ]);
    SendSettings.Suffix = ko.observableArray([
        { text: ko.observable("None"), value: "None" },
        { text: ko.observable("CR"), value: "CR" },
        { text: ko.observable("LF"), value: "LF" },
        { text: ko.observable("CRLF"), value: "CRLF" }
    ]);
    SendSettings.AllowZeroes = ko.observableArray([
        { text: ko.observable("Allow"), value: "true" },
        { text: ko.observable("Not Allowed"), value: "false" }
    ]);
    SendSettings.TrailingSeparatorPolicy = ko.observableArray([
        { text: ko.observable("Not Allowed"), value: "NotAllowed" },
        { text: ko.observable("Optional"), value: "Optional" },
        { text: ko.observable("Mandatory"), value: "Mandatory" }
    ]);
    SendSettings.UsageIndicators = ko.observableArray([
        { text: ko.observable("Test"), value: "Test" },
        { text: ko.observable("Information"), value: "Information" },
        { text: ko.observable("Production"), value: "Production" }
    ]);
    SendSettings.DateFormats = ko.observableArray([
        { text: ko.observable("CCYYMMDD"), value: "CCYYMMDD" },
        { text: ko.observable("YYMMDD"), value: "YYMMDD" }
    ]);
    SendSettings.TimeFormats = ko.observableArray([
        { text: ko.observable("HHMM"), value: "HHMM" },
        { text: ko.observable("HHMMSS"), value: "HHMMSS" },
        { text: ko.observable("HHMMSSdd"), value: "HHMMSSdd" },
        { text: ko.observable("HHMMSSd"), value: "HHMMSSd" }
    ]);
    SendSettings.ResponsibleAgencyCodes = ko.observableArray([
        { text: ko.observable("Transportation Data Coordinating Committee (TDCC)"), value: "T" },
        { text: ko.observable("Accredited Standards Committee X12"), value: "X" }
    ]);
    SendSettings.DecimalNotations = ko.observableArray([
        { text: ko.observable("Decimal"), value: "Decimal" },
        { text: ko.observable("Comma"), value: "Comma" }
    ]);
    SendSettings.DefaultSendSettingsCharacterSet = "Basic";
    SendSettings.Default = "Default";
    exports.SendSettings = SendSettings;
    exports.LOCATIONS = WorkflowConstants.LOCATIONS;
});
