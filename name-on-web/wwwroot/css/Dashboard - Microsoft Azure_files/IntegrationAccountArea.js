/// <reference path="../TypeReferences.d.ts" />
define(["require", "exports", "./Constants", "./Data/LocationData", "../Shared/Data/OmsData", "./SubscriptionsData", "../IntegrationServiceEnvironment/Data/IntegrationServiceEnvironmentData", "./Helpers/IntegrationAccountMetadataHelper"], function (require, exports, Constants, LocationDataRef, OmsDataRef, SubscriptionsData, IntegrationServiceEnvironmentData_1, MetadataHelper) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var invokeApi = "api/invoke";
    var contentType = "application/json";
    var dataType = "json";
    var apiVersionQueryParam = "?api-version=";
    var setAuthorizationHeader = true;
    var endpoint = MsPortalFx.getEnvironmentValue("csmManagementServiceUri");
    var rpApiVersion = MsPortalFx.getEnvironmentValue("integrationAccountRPApiVersion");
    var armApiVersion = MsPortalFx.getEnvironmentValue("armApiVersion");
    var keyVaultApiVersion = MsPortalFx.getEnvironmentValue("keyVaultApiVersion");
    var defaultPageSize = MsPortalFx.getEnvironmentValue("integrationAccountArtifactDefaultPageSize") || Constants.DefaultPageSize;
    var partnersListDefaultPageSize = MsPortalFx.getEnvironmentValue("integrationAccountPartnerDefaultPageSize") || Constants.PartnersListDefaultPageSize;
    var topQueryParam = "&$top=" + defaultPageSize;
    var partnersListTopQueryParam = "&$top=" + partnersListDefaultPageSize;
    ;
    var DataContext = (function () {
        function DataContext() {
            var _this = this;
            this.integrationServiceEnvironmentData = new IntegrationServiceEnvironmentData_1.IntegrationServiceEnvironmentData();
            this._integrationAccountsClient = new ExtensionCore.Cors.CsmResourceClient(Constants.Create.ResourceProvider, Constants.Create.RootResource, MsPortalFx.getEnvironmentValue("integrationAccountRPApiVersion"));
            this.subscriptions = new SubscriptionsData.SubscriptionsData();
            this.locationData = new LocationDataRef.LocationData();
            this.omsData = new OmsDataRef.OmsData();
            this.resourcesEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.IntegrationAccountType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        headers: headers,
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                        data: data
                    });
                },
                poll: false
            });
            this.integrationAccountsQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: EMAExtension.DataModels.IntegrationAccountResourcePropertiesType,
                sourceUri: function (subscriptionId) {
                    return _this._integrationAccountsClient.getListInSubscriptionUri(subscriptionId);
                },
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return _this.getIntegrationAccounts(uri);
                },
                poll: false
            });
            // Schemas Area
            this.schemasQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.SchemaArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/schemas" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        headers: headers,
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                        data: data
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.schemasEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.SchemaArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.schemasQueryCache,
                    entityMatchesId: function (schema, schemaId) {
                        return schema.id() === schemaId;
                    }
                },
                poll: false
            });
            // Assemblies Area
            this.assembliesQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.AssemblyArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/assemblies" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        headers: headers,
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                        data: data
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.assembliesEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.AssemblyArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.assembliesQueryCache,
                    entityMatchesId: function (assembly, assemblyId) {
                        return assembly.id() === assemblyId;
                    }
                },
                poll: false
            });
            // Maps Area
            this.mapsQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.MapArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/maps" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        headers: headers,
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                        data: data
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.mapsEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.MapArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.mapsQueryCache,
                    entityMatchesId: function (map, mapId) {
                        return map.id() === mapId;
                    }
                },
                poll: false
            });
            // Partners Area
            this.partnersQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.PartnerArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/partners" + apiVersionQueryParam + rpApiVersion + "&$top=" + partnersListDefaultPageSize, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    var deferred = Q.defer();
                    _this.fetchAllPartnersRecursively(uri)
                        .then(function (partnersResult) {
                        deferred.resolve(partnersResult);
                    });
                    return deferred.promise;
                },
                poll: false
            });
            this.partnersEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.PartnerArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.partnersQueryCache,
                    entityMatchesId: function (partner, partnerId) {
                        return partner.id() === partnerId;
                    }
                },
                poll: false
            });
            // Batch Configurations Area
            this.batchConfigurationsQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.BatchConfigurationArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/batchConfigurations" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.batchConfigurationsEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.BatchConfigurationArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.batchConfigurationsQueryCache,
                    entityMatchesId: function (batchConfiguration, batchConfigurationId) {
                        return batchConfiguration.id() === batchConfigurationId;
                    }
                },
                poll: false
            });
            // Certificates Area
            this.certificatesQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.CertificateArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/certificates" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.certificatesEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.CertificateArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.certificatesQueryCache,
                    entityMatchesId: function (certificate, certificateId) {
                        return certificate.id() === certificateId;
                    }
                },
                poll: false
            });
            // KeyVault Area
            this.keyVaultQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.KeyVaultType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "/subscriptions/{subscription}/resourceGroups/{resourceGroup}/providers/Microsoft.KeyVault/vaults" + apiVersionQueryParam + keyVaultApiVersion, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            // ResourceGroup Area
            this.resourceGroupQueryCache = new MsPortalFx.Data.QueryCache({
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "/subscriptions/{id}/resourcegroups" + apiVersionQueryParam + armApiVersion, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            // Agreements Area
            this.agreementsQueryCache = new MsPortalFx.Data.QueryCache({
                entityTypeName: IntegrationAccount.DataModels.AgreementArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}/agreements" + apiVersionQueryParam + rpApiVersion + topQueryParam, false),
                supplyData: function (httpMethod, uri, headers, data, params) {
                    return MsPortalFx.Base.Net2.ajax({
                        uri: uri,
                        type: "GET",
                        dataType: "json",
                        headers: headers,
                        contentType: contentType,
                        setAuthorizationHeader: setAuthorizationHeader,
                        invokeApi: invokeApi,
                        data: data
                    }).then(function (response) {
                        return response.value;
                    });
                },
                poll: false
            });
            this.agreementsEntityCache = new MsPortalFx.Data.EntityCache({
                entityTypeName: IntegrationAccount.DataModels.AgreementArtifactType,
                sourceUri: MsPortalFx.Data.uriFormatter(endpoint + "{id}" + apiVersionQueryParam + rpApiVersion, false),
                findCachedEntity: {
                    queryCache: this.agreementsQueryCache,
                    entityMatchesId: function (agreement, agreementId) {
                        return agreement.id() === agreementId;
                    }
                },
                poll: false
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.IntegrationAccountType, {
                name: IntegrationAccount.DataModels.IntegrationAccountType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    type: null,
                    location: null,
                    sku: null
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.ContentLinkType, {
                name: IntegrationAccount.DataModels.ContentLinkType,
                entityType: false,
                properties: {
                    uri: null,
                    contentVersion: null,
                    contentSize: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.SchemaArtifactPropertiesType, {
                properties: {
                    schemaType: null,
                    targetNamespace: null,
                    documentName: null,
                    contentLink: {
                        itemType: IntegrationAccount.DataModels.ContentLinkType
                    },
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    content: null,
                    contentType: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.SchemaArtifactType, {
                name: IntegrationAccount.DataModels.SchemaArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.SchemaArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AssemblyArtifactPropertiesType, {
                properties: {
                    assemblyName: null,
                    assemblyVersion: null,
                    assemblyCulture: null,
                    assemblyPublicKeyToken: null,
                    contentLink: null,
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    content: null,
                    contentType: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AssemblyArtifactType, {
                name: IntegrationAccount.DataModels.AssemblyArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.AssemblyArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.MapArtifactPropertiesType, {
                properties: {
                    mapType: null,
                    targetNamespace: null,
                    contentLink: null,
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    content: null,
                    contentType: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.MapArtifactType, {
                name: IntegrationAccount.DataModels.MapArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.MapArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.KeyVaultType, {
                properties: {
                    id: null,
                    name: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.KeyVaultKeyType, {
                properties: {
                    keyVault: {
                        itemType: IntegrationAccount.DataModels.KeyVaultType
                    },
                    keyName: null,
                    keyVersion: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.CertificateArtifactPropertiesType, {
                properties: {
                    key: {
                        itemType: IntegrationAccount.DataModels.KeyVaultKeyType
                    },
                    publicCertificate: null,
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    metadata: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.CertificateArtifactType, {
                name: IntegrationAccount.DataModels.CertificateArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.CertificateArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.FlowRecurrenceScheduleOccurrenceType, {
                properties: {
                    day: null,
                    occurrence: null,
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.FlowRecurrenceScheduleType, {
                properties: {
                    minutes: null,
                    hours: null,
                    weekDays: null,
                    monthDays: null,
                    monthlyOccurrences: {
                        itemType: IntegrationAccount.DataModels.FlowRecurrenceScheduleOccurrenceType,
                        isArray: true
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.FlowRecurrenceType, {
                properties: {
                    frequency: null,
                    interval: null,
                    count: null,
                    startTime: null,
                    timeZone: null,
                    schedule: {
                        itemType: IntegrationAccount.DataModels.FlowRecurrenceScheduleType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.BatchReleaseCriteriaType, {
                properties: {
                    messageCount: null,
                    batchSize: null,
                    recurrence: {
                        itemType: IntegrationAccount.DataModels.FlowRecurrenceType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.BatchConfigurationArtifactPropertiesType, {
                properties: {
                    batchGroupName: null,
                    releaseCriteria: {
                        itemType: IntegrationAccount.DataModels.BatchReleaseCriteriaType
                    },
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    metadata: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.BatchConfigurationArtifactType, {
                name: IntegrationAccount.DataModels.BatchConfigurationArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.BatchConfigurationArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.BusinessIdentityType, {
                entityType: true,
                properties: {
                    qualifier: null,
                    value: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.B2BPartnerContentType, {
                properties: {
                    businessIdentities: {
                        itemType: IntegrationAccount.DataModels.BusinessIdentityType,
                        isArray: true
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.PartnerContentType, {
                properties: {
                    b2b: {
                        itemType: IntegrationAccount.DataModels.B2BPartnerContentType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.PartnerArtifactPropertiesType, {
                properties: {
                    partnerType: null,
                    content: {
                        itemType: IntegrationAccount.DataModels.PartnerContentType
                    },
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    metadataArrayForUI: {
                        isArray: true,
                        itemType: IntegrationAccount.DataModels.MetadataEntityType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.PartnerArtifactType, {
                name: IntegrationAccount.DataModels.PartnerArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.PartnerArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2MessageConnectionSettingsType, {
                properties: {
                    ignoreCertificateNameMismatch: false,
                    supportHttpStatusCodeContinue: true,
                    keepHttpConnectionAlive: true,
                    unfoldHttpHeaders: true
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2AcknowledgementConnectionSettingsType, {
                properties: {
                    ignoreCertificateNameMismatch: false,
                    supportHttpStatusCodeContinue: true,
                    keepHttpConnectionAlive: true,
                    unfoldHttpHeaders: false
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2MDNSettingsType, {
                properties: {
                    needMDN: false,
                    signMDN: false,
                    micHashingAlgorithm: Constants.MicHashing.DefaultHashingAlgorithm,
                    sendMDNAsynchronously: false,
                    receiptDeliveryUrl: null,
                    dispositionNotificationTo: Constants.Agreements.DefaultDispositionURL,
                    signOutboundMDNIfOptional: false,
                    sendInboundMDNToMessageBox: true,
                    mdnText: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2SecuritySettingsType, {
                properties: {
                    encryptionCertificateName: null,
                    signingCertificateName: null,
                    overrideGroupSigningCertificate: false,
                    enableNRRForInboundDecodedMessages: false,
                    enableNRRForInboundEncodedMessages: false,
                    enableNRRForOutboundMDN: false,
                    enableNRRForOutboundDecodedMessages: false,
                    enableNRRForOutboundEncodedMessages: false,
                    enableNRRForInboundMDN: false,
                    sha2AlgorithmFormat: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2ValidationSettingsType, {
                properties: {
                    signMessage: false,
                    compressMessage: false,
                    encryptMessage: false,
                    overrideMessageProperties: false,
                    encryptionAlgorithm: Constants.Encryption.DefaultEncryptionAlgorithm,
                    signingAlgorithm: Constants.Signing.DefaultSigningAlgorithm,
                    checkDuplicateMessage: false,
                    interchangeDuplicatesValidityDays: 5,
                    checkCertificateRevocationListOnSend: false,
                    checkCertificateRevocationListOnReceive: false
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2EnvelopeSettingsType, {
                properties: {
                    messageContentType: Constants.Agreements.DefaultMessageContentType,
                    transmitFileNameInMimeHeader: false,
                    fileNameTemplate: "%FILE().ReceivedFileName%",
                    suspendMessageOnFileNameGenerationError: true,
                    autogenerateFileName: false
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2ErrorSettingsType, {
                properties: {
                    suspendDuplicateMessage: false,
                    resendIfMDNNotReceived: false
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2ProtocolSettingsType, {
                properties: {
                    messageConnectionSettings: {
                        itemType: IntegrationAccount.DataModels.AS2MessageConnectionSettingsType
                    },
                    acknowledgementConnectionSettings: {
                        itemType: IntegrationAccount.DataModels.AS2AcknowledgementConnectionSettingsType
                    },
                    mdnSettings: {
                        itemType: IntegrationAccount.DataModels.AS2MDNSettingsType
                    },
                    securitySettings: {
                        itemType: IntegrationAccount.DataModels.AS2SecuritySettingsType
                    },
                    validationSettings: {
                        itemType: IntegrationAccount.DataModels.AS2ValidationSettingsType
                    },
                    envelopeSettings: {
                        itemType: IntegrationAccount.DataModels.AS2EnvelopeSettingsType
                    },
                    errorSettings: {
                        itemType: IntegrationAccount.DataModels.AS2ErrorSettingsType
                    },
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2OneWayAgreementType, {
                properties: {
                    protocolSettings: {
                        itemType: IntegrationAccount.DataModels.AS2ProtocolSettingsType
                    },
                    senderBusinessIdentity: null,
                    receiverBusinessIdentity: null,
                    agreementTypeForUI: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AS2AgreementContentType, {
                properties: {
                    receiveAgreement: {
                        itemType: IntegrationAccount.DataModels.AS2OneWayAgreementType
                    },
                    sendAgreement: {
                        itemType: IntegrationAccount.DataModels.AS2OneWayAgreementType
                    }
                }
            });
            // EDIFACT Agreement
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTAcknowledgementSettingsType, {
                properties: {
                    needTechnicalAcknowledgement: null,
                    batchTechnicalAcknowledgements: null,
                    needFunctionalAcknowledgement: null,
                    batchFunctionalAcknowledgements: null,
                    needLoopForValidMessages: null,
                    sendSynchronousAcknowledgement: null,
                    acknowledgementControlNumberPrefix: null,
                    acknowledgementControlNumberSuffix: null,
                    acknowledgementControlNumberLowerBound: null,
                    acknowledgementControlNumberUpperBound: null,
                    rolloverAcknowledgementControlNumber: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTAgreementContentType, {
                properties: {
                    receiveAgreement: {
                        itemType: IntegrationAccount.DataModels.EDIFACTOneWayAgreementType
                    },
                    sendAgreement: {
                        itemType: IntegrationAccount.DataModels.EDIFACTOneWayAgreementType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTDelimiterOverrideType, {
                properties: {
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    dataElementSeparator: null,
                    componentSeparator: null,
                    segmentTerminator: null,
                    repetitionSeparator: null,
                    segmentTerminatorSuffix: null,
                    decimalPointIndicator: null,
                    releaseIndicator: null,
                    messageAssociationAssignedCode: null,
                    targetNamespace: null,
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTDelimiterOverrideForUIType, {
                entityType: true,
                properties: {
                    schemaName: null,
                    inputType: null,
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    dataElementSeparator: null,
                    componentSeparator: null,
                    segmentTerminator: null,
                    repetitionSeparator: null,
                    segmentTerminatorSuffix: null,
                    decimalPointIndicator: null,
                    releaseIndicator: null,
                    messageAssociationAssignedCode: null,
                    targetNamespace: null,
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTEnvelopeOverrideType, {
                properties: {
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    messageAssociationAssignedCode: null,
                    targetNamespace: null,
                    functionalGroupId: null,
                    senderApplicationQualifier: null,
                    senderApplicationId: null,
                    receiverApplicationQualifier: null,
                    receiverApplicationId: null,
                    controllingAgencyCode: null,
                    groupHeaderMessageVersion: null,
                    groupHeaderMessageRelease: null,
                    associationAssignedCode: null,
                    applicationPassword: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTEnvelopeOverrideForUIType, {
                entityType: true,
                properties: {
                    schemaName: null,
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    messageAssociationAssignedCode: null,
                    targetNamespace: null,
                    functionalGroupId: null,
                    senderApplicationQualifier: null,
                    senderApplicationId: null,
                    receiverApplicationQualifier: null,
                    receiverApplicationId: null,
                    controllingAgencyCode: null,
                    groupHeaderMessageVersion: null,
                    groupHeaderMessageRelease: null,
                    associationAssignedCode: null,
                    applicationPassword: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTEnvelopeSettingsType, {
                properties: {
                    groupAssociationAssignedCode: null,
                    communicationAgreementId: null,
                    applyDelimiterStringAdvice: null,
                    createGroupingSegments: null,
                    enableDefaultGroupHeaders: null,
                    recipientReferencePasswordValue: null,
                    recipientReferencePasswordQualifier: null,
                    applicationReferenceId: null,
                    processingPriorityCode: null,
                    interchangeControlNumberLowerBound: null,
                    interchangeControlNumberUpperBound: null,
                    rolloverInterchangeControlNumber: null,
                    interchangeControlNumberPrefix: null,
                    interchangeControlNumberSuffix: null,
                    senderReverseRoutingAddress: null,
                    receiverReverseRoutingAddress: null,
                    functionalGroupId: null,
                    groupControllingAgencyCode: null,
                    groupMessageVersion: null,
                    groupMessageRelease: null,
                    groupControlNumberLowerBound: null,
                    groupControlNumberUpperBound: null,
                    rolloverGroupControlNumber: null,
                    groupControlNumberPrefix: null,
                    groupControlNumberSuffix: null,
                    groupApplicationReceiverQualifier: null,
                    groupApplicationReceiverId: null,
                    groupApplicationSenderQualifier: null,
                    groupApplicationSenderId: null,
                    groupApplicationPassword: null,
                    overwriteExistingTransactionSetControlNumber: null,
                    transactionSetControlNumberPrefix: null,
                    transactionSetControlNumberSuffix: null,
                    transactionSetControlNumberLowerBound: null,
                    transactionSetControlNumberUpperBound: null,
                    rolloverTransactionSetControlNumber: null,
                    isTestInterchange: null,
                    senderInternalIdentification: null,
                    senderInternalSubIdentification: null,
                    receiverInternalIdentification: null,
                    receiverInternalSubIdentification: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTFramingSettingsType, {
                properties: {
                    serviceCodeListDirectoryVersion: null,
                    characterEncoding: null,
                    protocolVersion: null,
                    dataElementSeparator: null,
                    componentSeparator: null,
                    segmentTerminator: null,
                    releaseIndicator: null,
                    repetitionSeparator: null,
                    characterSet: null,
                    decimalPointIndicator: null,
                    segmentTerminatorSuffix: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTMessageFilterType, {
                properties: {
                    messageFilterType: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTMessageIdentifierType, {
                properties: {
                    messageId: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTOneWayAgreementType, {
                properties: {
                    protocolSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTProtocolSettingsType
                    },
                    senderBusinessIdentity: null,
                    receiverBusinessIdentity: null,
                    agreementTypeForUI: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTProcessingSettingsType, {
                properties: {
                    maskSecurityInfo: null,
                    preserveInterchange: null,
                    suspendInterchangeOnError: null,
                    createEmptyXmlTagsForTrailingSeparators: null,
                    useDotAsDecimalSeparator: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTProtocolSettingsType, {
                properties: {
                    validationSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTValidationSettingsType
                    },
                    framingSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTFramingSettingsType
                    },
                    envelopeSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTEnvelopeSettingsType
                    },
                    acknowledgementSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTAcknowledgementSettingsType
                    },
                    messageFilter: {
                        itemType: IntegrationAccount.DataModels.EDIFACTMessageFilterType
                    },
                    processingSettings: {
                        itemType: IntegrationAccount.DataModels.EDIFACTProcessingSettingsType
                    },
                    envelopeOverrides: {
                        itemType: IntegrationAccount.DataModels.EDIFACTEnvelopeOverrideType,
                        isArray: true
                    },
                    messageFilterList: {
                        itemType: IntegrationAccount.DataModels.EDIFACTMessageIdentifierType,
                        isArray: true
                    },
                    schemaReferences: {
                        itemType: IntegrationAccount.DataModels.EDIFACTSchemaReferenceType,
                        isArray: true
                    },
                    validationOverrides: {
                        itemType: IntegrationAccount.DataModels.EDIFACTValidationOverrideType,
                        isArray: true
                    },
                    edifactDelimiterOverrides: {
                        itemType: IntegrationAccount.DataModels.EDIFACTDelimiterOverrideType,
                        isArray: true
                    },
                    envelopeOverridesForUI: {
                        itemType: IntegrationAccount.DataModels.EDIFACTEnvelopeOverrideForUIType,
                        isArray: true
                    },
                    schemaReferencesForUI: {
                        itemType: IntegrationAccount.DataModels.EDIFACTSchemaReferenceForUIType,
                        isArray: true
                    },
                    validationOverridesForUI: {
                        itemType: IntegrationAccount.DataModels.EDIFACTValidationOverrideForUIType,
                        isArray: true
                    },
                    edifactDelimiterOverridesForUI: {
                        itemType: IntegrationAccount.DataModels.EDIFACTDelimiterOverrideForUIType,
                        isArray: true
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTSchemaReferenceType, {
                properties: {
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    senderApplicationId: null,
                    senderApplicationQualifier: null,
                    associationAssignedCode: null,
                    schemaName: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTSchemaReferenceForUIType, {
                entityType: true,
                properties: {
                    messageId: null,
                    messageVersion: null,
                    messageRelease: null,
                    senderApplicationId: null,
                    senderApplicationQualifier: null,
                    associationAssignedCode: null,
                    schemaName: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTValidationOverrideType, {
                properties: {
                    messageId: null,
                    enforceCharacterSet: null,
                    validateEDITypes: null,
                    validateXSDTypes: null,
                    allowLeadingAndTrailingSpacesAndZeroes: null,
                    trailingSeparatorPolicy: null,
                    trimLeadingAndTrailingSpacesAndZeroes: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTValidationOverrideForUIType, {
                entityType: true,
                properties: {
                    messageId: null,
                    enforceCharacterSet: null,
                    validateEDITypes: null,
                    validateXSDTypes: null,
                    allowLeadingAndTrailingSpacesAndZeroes: null,
                    trailingSeparatorPolicy: null,
                    trimLeadingAndTrailingSpacesAndZeroes: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.EDIFACTValidationSettingsType, {
                properties: {
                    validateCharacterSet: null,
                    checkDuplicateInterchangeControlNumber: null,
                    interchangeControlNumberValidityDays: null,
                    checkDuplicateGroupControlNumber: null,
                    checkDuplicateTransactionSetControlNumber: null,
                    validateEDITypes: null,
                    validateXSDTypes: null,
                    trimLeadingAndTrailingSpacesAndZeroes: null,
                    allowLeadingAndTrailingSpacesAndZeroes: null,
                    trailingSeparatorPolicy: null
                }
            });
            // X12 Agreement defaults
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12SecuritySettingsType, {
                properties: {
                    authorizationQualifier: "00",
                    authorizationValue: null,
                    securityQualifier: "00",
                    passwordValue: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12AcknowledgementSettingsType, {
                properties: {
                    needTechnicalAcknowledgement: false,
                    batchTechnicalAcknowledgements: true,
                    needFunctionalAcknowledgement: false,
                    functionalAcknowledgementVersion: "00401",
                    batchFunctionalAcknowledgements: true,
                    needImplementationAcknowledgement: false,
                    implementationAcknowledgementVersion: null,
                    batchImplementationAcknowledgements: false,
                    needLoopForValidMessages: false,
                    sendSynchronousAcknowledgement: true,
                    acknowledgementControlNumberPrefix: null,
                    acknowledgementControlNumberSuffix: null,
                    acknowledgementControlNumberLowerBound: 1,
                    acknowledgementControlNumberUpperBound: 999999999,
                    rolloverAcknowledgementControlNumber: true,
                    transactionSetAcknowledgmentRejectionCodeOverwrite: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12EnvelopeSettingsType, {
                properties: {
                    controlStandardsId: ("U").charCodeAt(0),
                    useControlStandardsIdAsRepetitionCharacter: false,
                    senderApplicationId: "BTS-SENDER",
                    receiverApplicationId: "RECEIVE-APP",
                    controlVersionNumber: "00401",
                    interchangeControlNumberLowerBound: 1,
                    interchangeControlNumberUpperBound: 999999999,
                    rolloverInterchangeControlNumber: true,
                    enableDefaultGroupHeaders: true,
                    functionalGroupId: null,
                    groupControlNumberLowerBound: 1,
                    groupControlNumberUpperBound: 999999999,
                    rolloverGroupControlNumber: true,
                    groupHeaderAgencyCode: "T",
                    groupHeaderVersion: "00401",
                    transactionSetControlNumberLowerBound: 1,
                    transactionSetControlNumberUpperBound: 999999999,
                    rolloverTransactionSetControlNumber: true,
                    transactionSetControlNumberPrefix: null,
                    transactionSetControlNumberSuffix: null,
                    overwriteExistingTransactionSetControlNumber: true,
                    groupHeaderDateFormat: "CCYYMMDD",
                    groupHeaderTimeFormat: "HHMM",
                    usageIndicator: "Test"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12ValidationSettingsType, {
                properties: {
                    validateCharacterSet: false,
                    checkDuplicateInterchangeControlNumber: false,
                    interchangeControlNumberValidityDays: 30,
                    checkDuplicateGroupControlNumber: false,
                    checkDuplicateTransactionSetControlNumber: false,
                    validateEDITypes: true,
                    validateXSDTypes: false,
                    allowLeadingAndTrailingSpacesAndZeroes: false,
                    trimLeadingAndTrailingSpacesAndZeroes: false,
                    trailingSeparatorPolicy: "NotAllowed"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12ValidationforUIType, {
                entityType: true,
                properties: {
                    messageId: null,
                    validateEDITypes: true,
                    validateXSDTypes: false,
                    allowLeadingAndTrailingSpacesAndZeroes: false,
                    validateCharacterSet: false,
                    trimLeadingAndTrailingSpacesAndZeroes: false,
                    trailingSeparatorPolicy: "NotAllowed"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12ValidationOverrideType, {
                properties: {
                    messageId: null,
                    validateEDITypes: true,
                    validateXSDTypes: false,
                    allowLeadingAndTrailingSpacesAndZeroes: false,
                    validateCharacterSet: false,
                    trimLeadingAndTrailingSpacesAndZeroes: false,
                    trailingSeparatorPolicy: "NotAllowed"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12DelimiterOverridesType, {
                properties: {
                    protocolVersion: null,
                    messageId: null,
                    dataElementSeparator: ("*").charCodeAt(0),
                    componentSeparator: (":").charCodeAt(0),
                    segmentTerminator: ("~").charCodeAt(0),
                    segmentTerminatorSuffix: "None",
                    replaceCharacter: ("$").charCodeAt(0),
                    replaceSeparatorsInPayload: false,
                    targetNamespace: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12EnvelopeOverrideType, {
                properties: {
                    targetNamespace: null,
                    protocolVersion: null,
                    messageId: null,
                    responsibleAgencyCode: null,
                    headerVersion: "00401",
                    senderApplicationId: "BTS-SENDER",
                    receiverApplicationId: "RECEIVE-APP",
                    functionalIdentifierCode: null,
                    dateFormat: "CCYYMMDD",
                    timeFormat: "HHMM"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12EnvelopeOverrideForUIType, {
                entityType: true,
                properties: {
                    schemaName: null,
                    targetNamespace: null,
                    protocolVersion: null,
                    messageId: null,
                    responsibleAgencyCode: null,
                    headerVersion: "00401",
                    senderApplicationId: "BTS-SENDER",
                    receiverApplicationId: "RECEIVE-APP",
                    functionalIdentifierCode: null,
                    dateFormat: "CCYYMMDD",
                    timeFormat: "HHMM"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12DelimiterOverridesForUIType, {
                entityType: true,
                idProperties: ["schemaId", "dataElementSeparator", "componentSeparator"],
                properties: {
                    schemaName: null,
                    inputType: null,
                    protocolVersion: null,
                    messageId: null,
                    dataElementSeparator: ("*").charCodeAt(0),
                    componentSeparator: (":").charCodeAt(0),
                    segmentTerminator: ("~").charCodeAt(0),
                    segmentTerminatorSuffix: "None",
                    replaceCharacter: ("$").charCodeAt(0),
                    targetNamespace: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12FramingSettingsType, {
                properties: {
                    messageId: null,
                    characterSet: "UTF8",
                    dataElementSeparator: ("*").charCodeAt(0),
                    componentSeparator: (":").charCodeAt(0),
                    segmentTerminator: ("~").charCodeAt(0),
                    segmentTerminatorSuffix: "None",
                    replaceCharacter: ("$").charCodeAt(0),
                    replaceSeparatorsInPayload: false
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12SchemaReferenceForUIType, {
                entityType: true,
                properties: {
                    messageId: null,
                    senderApplicationId: null,
                    schemaVersion: null,
                    schemaName: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12SchemaReferenceType, {
                properties: {
                    messageId: null,
                    senderApplicationId: null,
                    schemaVersion: null,
                    schemaName: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12ProcessingSettingsType, {
                properties: {
                    convertImpliedDecimal: false,
                    preserveInterchange: false,
                    suspendInterchangeOnError: false,
                    createEmptyXmlTagsForTrailingSeparators: false,
                    useDotAsDecimalSeparator: false,
                    maskSecurityInfo: true
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12MessageFilterType, {
                properties: {
                    messageFilterType: "Exclude"
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12MessageIdentifierType, {
                properties: {
                    messageId: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12ProtocolSettingsType, {
                properties: {
                    securitySettings: {
                        itemType: IntegrationAccount.DataModels.X12SecuritySettingsType
                    },
                    acknowledgementSettings: {
                        itemType: IntegrationAccount.DataModels.X12AcknowledgementSettingsType
                    },
                    envelopeSettings: {
                        itemType: IntegrationAccount.DataModels.X12EnvelopeSettingsType
                    },
                    validationSettings: {
                        itemType: IntegrationAccount.DataModels.X12ValidationSettingsType
                    },
                    messageFilter: {
                        itemType: IntegrationAccount.DataModels.X12MessageFilterType
                    },
                    processingSettings: {
                        itemType: IntegrationAccount.DataModels.X12ProcessingSettingsType
                    },
                    framingSettings: {
                        itemType: IntegrationAccount.DataModels.X12FramingSettingsType
                    },
                    envelopeOverrides: {
                        itemType: IntegrationAccount.DataModels.X12EnvelopeOverrideType,
                        isArray: true
                    },
                    schemaReferences: {
                        itemType: IntegrationAccount.DataModels.X12SchemaReferenceType,
                        isArray: true
                    },
                    validationOverrides: {
                        itemType: IntegrationAccount.DataModels.X12ValidationOverrideType,
                        isArray: true
                    },
                    x12DelimiterOverrides: {
                        itemType: IntegrationAccount.DataModels.X12DelimiterOverridesType,
                        isArray: true
                    },
                    x12DelimiterOverridesForUI: {
                        itemType: IntegrationAccount.DataModels.X12DelimiterOverridesForUIType,
                        isArray: true
                    },
                    schemaReferencesForUI: {
                        itemType: IntegrationAccount.DataModels.X12SchemaReferenceForUIType,
                        isArray: true
                    },
                    validationSettingsForUI: {
                        itemType: IntegrationAccount.DataModels.X12ValidationforUIType,
                        isArray: true
                    },
                    envelopeOverridesForUI: {
                        itemType: IntegrationAccount.DataModels.X12EnvelopeOverrideForUIType,
                        isArray: true
                    },
                    messageFilterList: {
                        itemType: IntegrationAccount.DataModels.X12MessageIdentifierType,
                        isArray: true
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12OneWayAgreementType, {
                properties: {
                    protocolSettings: {
                        itemType: IntegrationAccount.DataModels.X12ProtocolSettingsType
                    },
                    senderBusinessIdentity: null,
                    receiverBusinessIdentity: null,
                    agreementTypeForUI: null
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.X12AgreementContentType, {
                properties: {
                    receiveAgreement: {
                        itemType: IntegrationAccount.DataModels.X12OneWayAgreementType
                    },
                    sendAgreement: {
                        itemType: IntegrationAccount.DataModels.X12OneWayAgreementType
                    }
                }
            });
            // Agreement defaults.
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AgreementContentType, {
                properties: {
                    aS2: {
                        itemType: IntegrationAccount.DataModels.AS2AgreementContentType
                    },
                    edifact: {
                        itemType: IntegrationAccount.DataModels.EDIFACTAgreementContentType
                    },
                    x12: {
                        itemType: IntegrationAccount.DataModels.X12AgreementContentType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AgreementArtifactPropertiesType, {
                properties: {
                    agreementType: null,
                    hostPartner: null,
                    hostIdentity: null,
                    guestPartner: null,
                    guestIdentity: null,
                    createdTime: {
                        isDate: true
                    },
                    changedTime: {
                        isDate: true
                    },
                    metadata: null,
                    content: {
                        itemType: IntegrationAccount.DataModels.AgreementContentType
                    }
                }
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.AgreementArtifactType, {
                name: IntegrationAccount.DataModels.AgreementArtifactType,
                idProperties: ["id"],
                entityType: true,
                properties: {
                    id: null,
                    name: null,
                    properties: {
                        itemType: IntegrationAccount.DataModels.AgreementArtifactPropertiesType
                    }
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata("IntegrationAccountEditArtifactAsJsonModel", {
                name: "IntegrationAccountEditArtifactAsJsonModel",
                idProperties: ["artifactId"],
                entityType: true,
                properties: {
                    artifactId: null,
                    artifactName: null,
                    artifactContent: null
                },
                hasGloballyUniqueId: true
            });
            MsPortalFx.Data.Metadata.setTypeMetadata(IntegrationAccount.DataModels.MetadataEntityType, {
                name: IntegrationAccount.DataModels.MetadataEntityType,
                idProperties: ["key"],
                entityType: true,
                properties: {
                    key: null,
                    value: null,
                    valueObject: null
                },
                hasGloballyUniqueId: false
            });
        }
        DataContext.prototype.deleteResource = function (resourceId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + resourceId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.updateIntegrationAccount = function (integrationAccount) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + integrationAccount.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(integrationAccount)
            });
        };
        DataContext.prototype.getCallbackUrl = function (resourceId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + resourceId + "/listCallbackUrl" + apiVersionQueryParam + rpApiVersion,
                type: "POST",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            }).then(function (data) {
                return data.value;
            });
        };
        DataContext.prototype.deleteSchema = function (schemaId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + schemaId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.addOrUpdateSchema = function (schema) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + schema.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(schema)
            });
        };
        DataContext.prototype.deleteAssembly = function (assemblyId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + assemblyId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.addOrUpdateAssembly = function (assembly) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + assembly.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(assembly)
            });
        };
        DataContext.prototype.deleteMap = function (mapId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + mapId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.addOrUpdateMap = function (map) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + map.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(map)
            });
        };
        DataContext.prototype.addOrUpdatePartner = function (partnerId, partner) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + partnerId + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(partner)
            });
        };
        DataContext.prototype.deletePartner = function (partnerId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + partnerId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.deleteBatchConfiguration = function (batchConfigurationId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + batchConfigurationId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.addOrUpdateBatchConfiguration = function (batchConfiguration) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + batchConfiguration.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(batchConfiguration)
            });
        };
        DataContext.prototype.deleteCertificate = function (certificateId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + certificateId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.addOrUpdateCertificate = function (certificate) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + certificate.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(certificate)
            });
        };
        DataContext.prototype.listKeyVaultKeys = function (listkeyVaultKeysDefinition, integrationAccountId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + integrationAccountId + "/listkeyvaultkeys" + apiVersionQueryParam + rpApiVersion,
                type: "POST",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(listkeyVaultKeysDefinition)
            });
        };
        DataContext.prototype.addOrUpdateAgreement = function (agreement) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + agreement.id() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: ko.toJSON(agreement)
            });
        };
        DataContext.prototype.deleteAgreement = function (agreementId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + agreementId + apiVersionQueryParam + rpApiVersion,
                type: "DELETE",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.getArtifact = function (artifactId) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + artifactId + apiVersionQueryParam + rpApiVersion,
                type: "GET",
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            });
        };
        DataContext.prototype.putArtifact = function (artifact) {
            return MsPortalFx.Base.Net2.ajax({
                uri: "" + endpoint + artifact.artifactId() + apiVersionQueryParam + rpApiVersion,
                type: "PUT",
                dataType: dataType,
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi,
                data: artifact.artifactContent()
            });
        };
        DataContext.prototype.getIntegrationAccounts = function (uri, integrationAccountsList) {
            var _this = this;
            if (integrationAccountsList === void 0) { integrationAccountsList = []; }
            return MsPortalFx.Base.Net2.ajax({
                uri: uri,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                setAuthorizationHeader: true,
                invokeApi: "api/invoke"
            }).then(function (response) {
                integrationAccountsList.push.apply(integrationAccountsList, response.value);
                if (response.nextLink) {
                    return _this.getIntegrationAccounts(response.nextLink, integrationAccountsList);
                }
                else {
                    return integrationAccountsList;
                }
            });
        };
        ;
        DataContext.prototype.isIntegrationAccountNameAvailable = function (subscriptionId, resourceGroup, integrationAccountName) {
            return Q(this._integrationAccountsClient.listInResourceGroup(subscriptionId, resourceGroup)).then(function (integrationAccounts) {
                return !integrationAccounts.some(function (integrationAccount) {
                    return StringEx.equals(integrationAccount.name, integrationAccountName, StringComparison.IgnoreCase);
                });
            });
        };
        DataContext.prototype.isFreeSkuIntegrationAccountAllowed = function (subscriptionId, location) {
            var _this = this;
            return Q(this._integrationAccountsClient.listInSubscription(subscriptionId)).then(function (integrationAccountsList) {
                return !integrationAccountsList.some(function (integrationAccount) {
                    return _this.isFreeSkuIntegrationAccount(integrationAccount, location);
                });
            });
        };
        DataContext.prototype.isFreeSkuIntegrationAccount = function (integrationAccount, location) {
            return StringEx.equals(integrationAccount.sku.name, Constants.PricingTier.Free, StringComparison.IgnoreCase) && StringEx.equals(integrationAccount.location, location, StringComparison.IgnoreCase);
        };
        DataContext.prototype.fetchAllPartnersRecursively = function (uri) {
            var _this = this;
            var deferred = Q.defer();
            MsPortalFx.Base.Net2.ajax({
                uri: uri,
                type: "GET",
                dataType: "json",
                contentType: contentType,
                setAuthorizationHeader: setAuthorizationHeader,
                invokeApi: invokeApi
            }).then(function (response) {
                // If more records are there, fetch them using next link.
                if (typeof response.nextLink !== "undefined") {
                    _this.fetchAllPartnersRecursively(response.nextLink).then(function (partnersResult) {
                        // Resolve the promise using a concatenated list of current list and the list fetched from next link.
                        deferred.resolve(_this.processPartnersListResponse(response).concat(partnersResult));
                    });
                }
                else {
                    // If there are no more records to fetch, resolve the promise with the current list.
                    deferred.resolve(_this.processPartnersListResponse(response));
                }
            });
            return deferred.promise;
        };
        DataContext.prototype.processPartnersListResponse = function (response) {
            // TODO: Create and use a new interface for partner artifact which has non-observable properties (Task 1500240)
            var partnersFromServer = response.value;
            var partnersResult = [];
            for (var i = 0; i < partnersFromServer.length; i++) {
                // We are processing the raw JSON result here. Hence this should be of type "any".
                var partnerArtifact = partnersFromServer[i];
                // If there is no metadata then initialize metadataArrayForUI to an empty array.
                if (partnerArtifact.properties.metadata) {
                    partnerArtifact.properties.metadataArrayForUI = MetadataHelper.ConvertMetadataToMetadataEntityArray(partnerArtifact.properties.metadata);
                    // The data cache promotes all properties to observables. This causes data merge issues
                    // when a new item is added. Hence this should be deleted here and added when we do a PUT/PATCH.
                    delete partnerArtifact.properties.metadata;
                }
                else {
                    partnerArtifact.properties.metadataArrayForUI = [];
                }
                partnersResult.push(partnerArtifact);
            }
            return partnersResult;
        };
        return DataContext;
    }());
    exports.DataContext = DataContext;
});
