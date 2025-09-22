/**
 * Iyzipay Node.js Client Integration (TypeScript)
 * Strongly-typed wrapper around the official `iyzipay` SDK.
 */

import Iyzipay from "iyzipay";

// ===== Types (strict, no any) =====

export type Locale = "tr" | "en";

export type Currency = "TRY" | "USD" | "EUR" | "GBP" | "RUB" | "BRL" | "IRR";

export type PaymentGroup = "PRODUCT" | "LISTING" | "SUBSCRIPTION";

export type BasketItemType = "PHYSICAL" | "VIRTUAL";

export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  uri: string;
}

export interface BuyerInfo {
  id: string;
  name: string;
  surname: string;
  identityNumber?: string;
  email: string;
  gsmNumber?: string;
  registrationDate?: string; // YYYY-MM-DD HH:mm:ss
  lastLoginDate?: string; // YYYY-MM-DD HH:mm:ss
  registrationAddress: string;
  city: string;
  country: string;
  zipCode?: string;
  ip: string;
}

export interface AddressInfo {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode?: string;
}

export interface BasketItem {
  id: string;
  name: string;
  category1: string;
  category2?: string;
  itemType: BasketItemType;
  price: string; // decimal string as required by Iyzico
  // Marketplace optional fields
  subMerchantKey?: string;
  subMerchantPrice?: string; // decimal string
}

export interface CheckoutFormInitializeRequest {
  locale?: Locale;
  conversationId: string;
  price: string; // decimal string
  paidPrice: string; // decimal string
  currency: Currency;
  basketId: string;
  paymentGroup: PaymentGroup;
  callbackUrl: string;
  enabledInstallments?: number[]; // e.g. [2,3,6,9]
  forceThreeDS?: string; // "0" | "1"
  cardUserKey?: string;
  buyer: BuyerInfo;
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  basketItems: BasketItem[];
}

export interface CheckoutFormInitializeResult {
  status: "success" | "failure";
  locale?: Locale;
  systemTime?: number;
  conversationId?: string;
  token?: string;
  tokenExpireTime?: number;
  checkoutFormContent?: string;
  paymentPageUrl?: string;
  payWithIyzicoPageUrl?: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

export interface CheckoutFormRetrieveResultPaymentItem {
  itemId?: string;
  paymentTransactionId?: string;
  price?: string;
  paidPrice?: string;
  merchantCommissionRate?: string;
  merchantCommissionRateAmount?: string;
  iyziCommissionRateAmount?: string;
  iyziCommissionFee?: string;
  blockageRate?: string;
  blockageRateAmountMerchant?: string;
}

export interface CheckoutFormRetrieveResult {
  status: "success" | "failure";
  locale?: Locale;
  systemTime?: number;
  conversationId?: string;
  token?: string;
  price?: string;
  paidPrice?: string;
  currency?: Currency;
  installment?: number;
  paymentId?: string;
  paymentStatus?: "SUCCESS" | "FAILURE";
  paymentItems?: CheckoutFormRetrieveResultPaymentItem[];
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

export interface PaymentCreateRequestCard {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string; // MM
  expireYear: string; // YY or YYYY as accepted by API
  cvc: string;
  registerCard?: string; // "0" | "1"
}

export interface PaymentCreateRequest {
  locale?: Locale;
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: Currency;
  installment?: number;
  basketId: string;
  paymentGroup: PaymentGroup;
  paymentCard: PaymentCreateRequestCard;
  buyer: BuyerInfo;
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  basketItems: BasketItem[];
}

export interface PaymentCreateResult {
  status: "success" | "failure";
  locale?: Locale;
  systemTime?: number;
  conversationId?: string;
  paymentId?: string;
  fraudStatus?: number;
  installment?: number;
  price?: string;
  paidPrice?: string;
  currency?: Currency;
  itemTransactions?: CheckoutFormRetrieveResultPaymentItem[];
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

export interface CancelRequest {
  locale?: Locale;
  conversationId: string;
  paymentId: string;
  ip?: string;
}

export interface RefundRequest {
  locale?: Locale;
  conversationId: string;
  paymentTransactionId: string;
  price: string; // decimal string
  currency: Currency;
  ip?: string;
}

export interface CancelOrRefundResult {
  status: "success" | "failure";
  locale?: Locale;
  systemTime?: number;
  conversationId?: string;
  paymentId?: string;
  paymentTransactionId?: string;
  price?: string;
  currency?: Currency;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
}

// Native Iyzipay client surface that we rely on (minimal, typed)
interface IyzipayCheckoutFormInitializeModule {
  create:
    | ((
        request: CheckoutFormInitializeRequest,
        cb: (err: unknown, result: CheckoutFormInitializeResult) => void
      ) => void)
    | undefined;
}

interface IyzipayCheckoutFormModule {
  retrieve:
    | ((
        request: { token: string },
        cb: (err: unknown, result: CheckoutFormRetrieveResult) => void
      ) => void)
    | undefined;
}

interface IyzipayPaymentModule {
  create:
    | ((
        request: PaymentCreateRequest,
        cb: (err: unknown, result: PaymentCreateResult) => void
      ) => void)
    | undefined;
}

interface IyzipayCancelModule {
  create:
    | ((
        request: CancelRequest,
        cb: (err: unknown, result: CancelOrRefundResult) => void
      ) => void)
    | undefined;
}

interface IyzipayRefundModule {
  create:
    | ((
        request: RefundRequest,
        cb: (err: unknown, result: CancelOrRefundResult) => void
      ) => void)
    | undefined;
}

interface IyzipayClientNative {
  checkoutFormInitialize: IyzipayCheckoutFormInitializeModule;
  checkoutForm: IyzipayCheckoutFormModule;
  payment: IyzipayPaymentModule;
  cancel: IyzipayCancelModule;
  refund: IyzipayRefundModule;
}

// ===== Implementation =====

export class IyzicoClient {
  private readonly iyzipay: IyzipayClientNative;

  constructor(config: IyzicoConfig) {
    const IyzipayCtor = Iyzipay as unknown as new (
      config: IyzicoConfig
    ) => IyzipayClientNative;
    this.iyzipay = new IyzipayCtor(config);
  }

  getIyzipayInstance(): IyzipayClientNative {
    return this.iyzipay;
  }

  async initializeCheckoutForm(
    requestData: CheckoutFormInitializeRequest
  ): Promise<CheckoutFormInitializeResult> {
    return new Promise<CheckoutFormInitializeResult>((resolve, reject) => {
      this.iyzipay.checkoutFormInitialize.create?.(
        requestData,
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  async retrieveCheckoutForm(
    token: string
  ): Promise<CheckoutFormRetrieveResult> {
    return new Promise<CheckoutFormRetrieveResult>((resolve, reject) => {
      this.iyzipay.checkoutForm.retrieve?.({ token }, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  async createPayment(
    requestData: PaymentCreateRequest
  ): Promise<PaymentCreateResult> {
    return new Promise<PaymentCreateResult>((resolve, reject) => {
      this.iyzipay.payment.create?.(requestData, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  async cancelPayment(
    requestData: CancelRequest
  ): Promise<CancelOrRefundResult> {
    return new Promise<CancelOrRefundResult>((resolve, reject) => {
      this.iyzipay.cancel.create?.(requestData, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  async refundPayment(
    requestData: RefundRequest
  ): Promise<CancelOrRefundResult> {
    return new Promise<CancelOrRefundResult>((resolve, reject) => {
      this.iyzipay.refund.create?.(requestData, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

function resolveConfigFromEnv(): IyzicoConfig {
  const environment = process.env.IYZICO_ENVIRONMENT || "sandbox";

  if (environment === "production") {
    // Production environment
    const apiKey =
      process.env.IYZICO_PRODUCTION_API_KEY || process.env.IYZIPAY_API_KEY;
    const secretKey =
      process.env.IYZICO_PRODUCTION_SECRET_KEY ||
      process.env.IYZIPAY_SECRET_KEY;
    const uri =
      process.env.IYZICO_PRODUCTION_URI ||
      process.env.IYZIPAY_URI ||
      "https://api.iyzipay.com";

    if (!apiKey || !secretKey) {
      throw new Error(
        "Production Iyzico API keys not found. Set IYZICO_PRODUCTION_API_KEY and IYZICO_PRODUCTION_SECRET_KEY, or IYZIPAY_API_KEY and IYZIPAY_SECRET_KEY."
      );
    }

    console.log("Using Iyzico Production environment");
    return {
      apiKey,
      secretKey,
      uri,
    };
  } else {
    // Sandbox environment (default)
    const apiKey =
      process.env.IYZICO_SANDBOX_API_KEY || process.env.IYZIPAY_API_KEY;
    const secretKey =
      process.env.IYZICO_SANDBOX_SECRET_KEY || process.env.IYZIPAY_SECRET_KEY;
    const uri =
      process.env.IYZICO_SANDBOX_URI ||
      process.env.IYZIPAY_URI ||
      "https://sandbox-api.iyzipay.com";

    if (!apiKey || !secretKey) {
      throw new Error(
        "Sandbox Iyzico API keys not found. Set IYZICO_SANDBOX_API_KEY and IYZICO_SANDBOX_SECRET_KEY, or IYZIPAY_API_KEY and IYZIPAY_SECRET_KEY."
      );
    }

    console.log("Using Iyzico Sandbox environment");
    return {
      apiKey,
      secretKey,
      uri,
    };
  }
}

let singletonClient: IyzicoClient | null = null;

export function getIyzicoClient(): IyzicoClient {
  if (!singletonClient) {
    const config = resolveConfigFromEnv();
    singletonClient = new IyzicoClient(config);
  }
  return singletonClient;
}

export default getIyzicoClient;
