/**
 * VTEX Checkout Interfaces
 */

interface ClientPreferencesData {
    locale: string;
    optinNewsLetter: boolean;
}

interface ClientProfileData {
    email: string;
    firstName: string;
    lastName: string;
    document: string;
    documentType: string;
    corporateDocument: string | null;
    phone: string;
    corporateName: string | null;
    corporatePhone: string | null;
    tradeName: string | null;
    customerClass: string | null;
    profileCompleteOnLoading: boolean;
    profileErrorOnLoading: boolean;
    stateInscription: string | null;
    isCorporate: boolean;
}

interface CustomApp {
    id: string;
    fields: any;
    major: number;
}

interface CustomData {
    customApps: CustomApp[];
}

interface Dimension {
    cubicweight: number;
    height: number;
    length: number;
    weight: number;
    width: number;
}

interface AdditionalInfo {
    dimension: Dimension;
    brandName: string;
    brandId: string;
    offeringInfo: string | null;
    offeringType: string | null;
    offeringTypeId: string | null;
}

interface ProductCategories {
    [key: string]: any;
}

interface SellingPrice {
    quantity: number;
    value: number;
}

interface PriceDefinition {
    calculatedSellingPrice: number;
    total: number;
    sellingPrice: SellingPrice[];
}

interface PriceTags {
    name: string;
    value: number;
    rawValue;
    isPercentual: boolean;
    identifier: string | null;
}

interface Item {
    uniqueId: string;
    id: string;
    productId: string;
    productRefId: string;
    refId: string | null;
    ean: string;
    name: string;
    skuName: string;
    modalType: any;
    parentItemIndex: any;
    parentAssemblyBinding: any;
    assemblies: any[];
    priceValidUntil: string; // Timestamp
    tax: number;
    price: number;
    listPrice: number;
    manualPrice: number;
    manualPriceAppliedBy: string;
    sellingPrice: number;
    rewardValue: number;
    isGift: boolean;
    additionalInfo: AdditionalInfo;
    preSaleDate: string;
    productCategoryIds: string;
    productCategories: ProductCategories;
    quantity: number;
    seller: string;
    sellerChain: string[];
    imageUrl: string;
    detailUrl: string;
    components: any[];
    bundleItems: any[];
    attachments: any[];
    attachmentOfferings: any[];
    offerings: any[];
    priceTags: PriceTags[];
    availability: string;
    measurementUnit: string;
    unitMultiplier: number;
    manufacturerCode: string | null;
    priceDefinition: PriceDefinition;
}

interface MarketingData {
    attachmentId: string;
    coupon: string | null;
    marketingTags: string[];
    utmCampaign: string;
    utmMedium: string | null;
    utmSource: string | null;
    utmiCampaign: string | null;
    utmiPart: string | null;
    utmipage: string | null;
}

interface Messages {
    code: string | number | null;
    status: string;
    text: string;
}

interface OpenTextField {
    value: string;
}

interface ItemsOrdination {
    criteria: string;
    ascending: boolean;
}

interface GiftCards {
    redemptionCode: string;
    value: number;
    balance: number;
    name: string | null;
    id: string;
    inUse: boolean;
    isSpecialCard: boolean;
}

interface Installments {
    count: number;
    hasInterestRate: number;
    value: number;
    total: number;
}

interface InstallmentOptions {
    paymentSystem: string;
    value: number;
    installments: Installments[];
}

interface AvailableAccounts {
    accountId: string;
    paymentSystem: string;
    paymentSystemName: string;
    cardNumber: string;
    availableAddresses: string[];
}

interface PaymentSistemValidator {
    regex: string;
    mask: string;
    cardCodeRegex: string;
    cardCodeMask: string;
    weights: number[];
}

interface PaymentSystem {
    id: number;
    name: string;
    groupName: string;
    validator: PaymentSistemValidator;
    stringId: string | null;
    template: string;
    requiresDocument: boolean;
    selected: boolean;
    isCustom: boolean;
    description: string | null;
    requiresAuthentication?: boolean;
    dueDate?: string; // Timestamp
    availablePayments?: any;
}

interface Payment {
    accountId?: string | null;
    bin: string | null;
    installments: number;
    paymentSystem: string; // number in string
    referenceVaue: number;
    value: number;
    // For OrderPlaced
    id?: string;
    paymentSystemName?: string;
    connectorResponses?: any;
    cardHolder?: string;
    cardNumber?: string;
    firstDigits?: string;
    lastDigits?: string;
    cvv2?: string;
    expireMonth?: string;
    expireYear?: string;
    url?: string;
    koinUrl?: string;
    tid?: string;
    redemptionCode?: string;
    giftCardId?: string;
    giftCardProvider?: string;
    giftCardAsDiscount?: string;
    group?: string;
    dueDate?: string;
    parentAccountId?: string;
    bankIssuedInvoiceIdentificationNumber?: string;
    bankIssuedInvoiceIdentificationNumberFormatted?: string;
    bankIssuedInvoiceBarCodeNumber?: string;
    bankIssuedInvoiceBarCodeType?: string;
    billingAddress?: string;
}

interface Transaction {
    isActive: boolean;
    transactionId: string;
    merchantName: string;
    payments: Payment[];
    sharedTransaction: boolean;
}

interface PaymentData {
    giftCards: GiftCards;
    giftCardMessages: Messages[];
    availableAccounts: AvailableAccounts[];
    availableTokens: string[];
    installmentOptions: InstallmentOptions[];
    paymentSystems: PaymentSystem[];
    payments: Payment[];
    transactions?: Transaction[];
}

interface RatesAndBenefitsData {
    rateAndBenefitsIdentifiers: any[]; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    teaser: any[]; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
}

interface Seller {
    id: string; // number in string
    name: string;
    logo: string; // Url image
}

interface Address {
    addressType: 'residential' | 'pickup';
    receiverName: string;
    addressId?: string | number;
    postalCode: string;
    geoCoordinates?: string[] | number[];
    city: string;
    state: string;
    country: string;
    street: string;
    number: string | null;
    neighborhood: string;
    complement?: string;
    reference?: string | null;
    isDisposable?: boolean | null;
    addressQuery?: string;
}

interface DeliveryWindow {
    startDateUtc?: string;
    endDateUtc?: string;
    listPrice?: number;
    price: number;
    taxt?: number;
}

interface PickupStoreInfo {
    isPickupStore: boolean;
    friendlyName: string;
    address: Address;
    additionalInfo?: string;
}

interface Slas {
    id: string;
    deliveryChannel: 'delivery' | 'pickup-in-point';
    name: string;
    price: number;
    tax?: number;
    shippingEstimate: string;
    shippingEstimateDate?: string;
    availableDeliveryWindows?: DeliveryWindow[];
    pickupStoreInfo?: PickupStoreInfo;
    lockTTL?: string;
    deliveryWindow?: DeliveryWindow;
}

interface DeliveryChannels {
    id: 'delivery' | 'pickup-in-point';
    stockBalance: number;
}

interface LogisticsInfo {
    itemIndex: number;
    selectedSla: string;
    lockTTL?: string;
    shippingEstimate?: string;
    price: number;
    deliveryWindow?: DeliveryWindow;
    slas: Slas[];
    stockBalance: number;
    deliveryChannels: DeliveryChannels;
}

interface ShippingData {
    attachmentId: string;
    address: Address;
    availableAddresses: Address[];
    logisticsInfo: LogisticsInfo[];
    pickupPoints: Address[];
    selectedAddresses: Address[];
    clearAddressIfPostalCodeNotFound?: boolean; // For attachment endpoint
    expectedOrderFormSections?: string[]; // For attachment endpoint
}

interface TemplateOptions {
    toggleCorporate: boolean;
}

interface CurrencyFormatInfo {
    currencyDecimalDigits: number;
    currencyDecimalSeparator: string;
    currencyGroupSeparator: string;
    currencyGroupSize: number;
    startsWithCurrencySymbol: boolean;
}

interface StorePreferencesData {
    countryCode: string;
    checkToSavePersonDataByDefault: boolean;
    templateOptions: TemplateOptions;
    timeZone: string;
    currencyCode: string;
    currencyLocale: number;
    currencySymbol: string;
    currencyFormatInfo: CurrencyFormatInfo;
}

interface Total {
    id: string;
    name: string;
    value: number;
}

interface OrderForm {
    allowManualPrice: boolean;
    canEditData: boolean;
    checkedInPickupPointId: boolean | null;
    clientPreferencesData: ClientPreferencesData;
    clientProfileData: ClientProfileData;
    commercialConditionData: any; // 🚧 Without information from official documentation
    customData: any; // Fields by apps, users definition
    giftRegistryData: any; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    hooksData: any; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    items: Item[];
    invoiceData: any; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    itemsOrdination: ItemsOrdination;
    marketingData: MarketingData;
    messages: Messages[];
    openTextField: OpenTextField;
    paymentData: PaymentData;
    products: any; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    ratesAndBenefitsData: RatesAndBenefitsData;
    selectableGifts: any[]; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    sellers: Seller[];
    shippingData: ShippingData;
    storeId: string | null; // 🚧 Work in progress This guide is currently being written and published as content becomes available.
    storePreferencesData: StorePreferencesData;
    subscriptionData: any; // 🚧 Without information from official documentation
    totalizers: Total[];
    value: number;
}

interface ItemMetaData {
    id: string;
    seller: string;
    name: string;
    skuName: string;
    productId: string;
    refId: string;
    ean: string | null;
    imageUrl: string;
    detailUrl: string;
    assemblyOptions: any[];
}

interface OrderGroup extends OrderForm {
    orderId: string;
    orderGroup: string;
    state: string;
    isCheckedIn: boolean;
    sellerOrderId: string;
    totals: Total[];
    itemMetadata: {
        items: ItemMetaData[];
    };
    taxData: string | null;
    changeData: any;
    salesChannel: string;
    followUpEmail: string;
    creationDate: string; // Timestamp
    lastChange: string; // Timestamp
    timeZoneCreationDate: string; // Timestamp
    timeZoneLastChange: string; // Timestamp
    orderFormCreationDate: string; // Timestamp
    isCompleted: boolean;
    hostName: string;
    merchantName: string | null;
    userType: string;
    roundingError: number;
    allowEdition: boolean;
    allowCancellation: boolean;
    isUserDataVisible: boolean;
    allowChangeSeller: boolean;
}

type SUMMARY_MODE = 'totalizer' | 'summary' | 'payment_summary';

interface CountryItemCity {
    city: string;
    code: string;
}

interface CountryItem {
    state: string;
    cities: CountryItemCity[];
}