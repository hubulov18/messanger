
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MessageAttachment
 * 
 */
export type MessageAttachment = $Result.DefaultSelection<Prisma.$MessageAttachmentPayload>
/**
 * Model MessageReaction
 * 
 */
export type MessageReaction = $Result.DefaultSelection<Prisma.$MessageReactionPayload>
/**
 * Model MessageRevision
 * 
 */
export type MessageRevision = $Result.DefaultSelection<Prisma.$MessageRevisionPayload>
/**
 * Model ReadReceipt
 * 
 */
export type ReadReceipt = $Result.DefaultSelection<Prisma.$ReadReceiptPayload>
/**
 * Model DeliveryReceipt
 * 
 */
export type DeliveryReceipt = $Result.DefaultSelection<Prisma.$DeliveryReceiptPayload>
/**
 * Model ChatMessageCounter
 * 
 */
export type ChatMessageCounter = $Result.DefaultSelection<Prisma.$ChatMessageCounterPayload>
/**
 * Model ChatSummaryProjection
 * 
 */
export type ChatSummaryProjection = $Result.DefaultSelection<Prisma.$ChatSummaryProjectionPayload>
/**
 * Model ChatSummaryProjectionEvent
 * 
 */
export type ChatSummaryProjectionEvent = $Result.DefaultSelection<Prisma.$ChatSummaryProjectionEventPayload>
/**
 * Model ChatSummaryProjectionOffset
 * 
 */
export type ChatSummaryProjectionOffset = $Result.DefaultSelection<Prisma.$ChatSummaryProjectionOffsetPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MessageType: {
  text: 'text',
  image: 'image',
  video: 'video',
  audio: 'audio',
  file: 'file',
  system: 'system'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]


export const MessageStatus: {
  sent: 'sent',
  edited: 'edited',
  deleted: 'deleted'
};

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus]


export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

export type MessageStatus = $Enums.MessageStatus

export const MessageStatus: typeof $Enums.MessageStatus

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Messages
 * const messages = await prisma.message.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageAttachment`: Exposes CRUD operations for the **MessageAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageAttachments
    * const messageAttachments = await prisma.messageAttachment.findMany()
    * ```
    */
  get messageAttachment(): Prisma.MessageAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageReaction`: Exposes CRUD operations for the **MessageReaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageReactions
    * const messageReactions = await prisma.messageReaction.findMany()
    * ```
    */
  get messageReaction(): Prisma.MessageReactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageRevision`: Exposes CRUD operations for the **MessageRevision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageRevisions
    * const messageRevisions = await prisma.messageRevision.findMany()
    * ```
    */
  get messageRevision(): Prisma.MessageRevisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.readReceipt`: Exposes CRUD operations for the **ReadReceipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReadReceipts
    * const readReceipts = await prisma.readReceipt.findMany()
    * ```
    */
  get readReceipt(): Prisma.ReadReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryReceipt`: Exposes CRUD operations for the **DeliveryReceipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryReceipts
    * const deliveryReceipts = await prisma.deliveryReceipt.findMany()
    * ```
    */
  get deliveryReceipt(): Prisma.DeliveryReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMessageCounter`: Exposes CRUD operations for the **ChatMessageCounter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessageCounters
    * const chatMessageCounters = await prisma.chatMessageCounter.findMany()
    * ```
    */
  get chatMessageCounter(): Prisma.ChatMessageCounterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatSummaryProjection`: Exposes CRUD operations for the **ChatSummaryProjection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatSummaryProjections
    * const chatSummaryProjections = await prisma.chatSummaryProjection.findMany()
    * ```
    */
  get chatSummaryProjection(): Prisma.ChatSummaryProjectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatSummaryProjectionEvent`: Exposes CRUD operations for the **ChatSummaryProjectionEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatSummaryProjectionEvents
    * const chatSummaryProjectionEvents = await prisma.chatSummaryProjectionEvent.findMany()
    * ```
    */
  get chatSummaryProjectionEvent(): Prisma.ChatSummaryProjectionEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatSummaryProjectionOffset`: Exposes CRUD operations for the **ChatSummaryProjectionOffset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatSummaryProjectionOffsets
    * const chatSummaryProjectionOffsets = await prisma.chatSummaryProjectionOffset.findMany()
    * ```
    */
  get chatSummaryProjectionOffset(): Prisma.ChatSummaryProjectionOffsetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Message: 'Message',
    MessageAttachment: 'MessageAttachment',
    MessageReaction: 'MessageReaction',
    MessageRevision: 'MessageRevision',
    ReadReceipt: 'ReadReceipt',
    DeliveryReceipt: 'DeliveryReceipt',
    ChatMessageCounter: 'ChatMessageCounter',
    ChatSummaryProjection: 'ChatSummaryProjection',
    ChatSummaryProjectionEvent: 'ChatSummaryProjectionEvent',
    ChatSummaryProjectionOffset: 'ChatSummaryProjectionOffset',
    OutboxEvent: 'OutboxEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "message" | "messageAttachment" | "messageReaction" | "messageRevision" | "readReceipt" | "deliveryReceipt" | "chatMessageCounter" | "chatSummaryProjection" | "chatSummaryProjectionEvent" | "chatSummaryProjectionOffset" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MessageAttachment: {
        payload: Prisma.$MessageAttachmentPayload<ExtArgs>
        fields: Prisma.MessageAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          findFirst: {
            args: Prisma.MessageAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          findMany: {
            args: Prisma.MessageAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[]
          }
          create: {
            args: Prisma.MessageAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          createMany: {
            args: Prisma.MessageAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[]
          }
          delete: {
            args: Prisma.MessageAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          update: {
            args: Prisma.MessageAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.MessageAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.MessageAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          aggregate: {
            args: Prisma.MessageAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageAttachment>
          }
          groupBy: {
            args: Prisma.MessageAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<MessageAttachmentCountAggregateOutputType> | number
          }
        }
      }
      MessageReaction: {
        payload: Prisma.$MessageReactionPayload<ExtArgs>
        fields: Prisma.MessageReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          findFirst: {
            args: Prisma.MessageReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          findMany: {
            args: Prisma.MessageReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>[]
          }
          create: {
            args: Prisma.MessageReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          createMany: {
            args: Prisma.MessageReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageReactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>[]
          }
          delete: {
            args: Prisma.MessageReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          update: {
            args: Prisma.MessageReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          deleteMany: {
            args: Prisma.MessageReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageReactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>[]
          }
          upsert: {
            args: Prisma.MessageReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageReactionPayload>
          }
          aggregate: {
            args: Prisma.MessageReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageReaction>
          }
          groupBy: {
            args: Prisma.MessageReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageReactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageReactionCountArgs<ExtArgs>
            result: $Utils.Optional<MessageReactionCountAggregateOutputType> | number
          }
        }
      }
      MessageRevision: {
        payload: Prisma.$MessageRevisionPayload<ExtArgs>
        fields: Prisma.MessageRevisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageRevisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageRevisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          findFirst: {
            args: Prisma.MessageRevisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageRevisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          findMany: {
            args: Prisma.MessageRevisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>[]
          }
          create: {
            args: Prisma.MessageRevisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          createMany: {
            args: Prisma.MessageRevisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageRevisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>[]
          }
          delete: {
            args: Prisma.MessageRevisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          update: {
            args: Prisma.MessageRevisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          deleteMany: {
            args: Prisma.MessageRevisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageRevisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageRevisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>[]
          }
          upsert: {
            args: Prisma.MessageRevisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRevisionPayload>
          }
          aggregate: {
            args: Prisma.MessageRevisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageRevision>
          }
          groupBy: {
            args: Prisma.MessageRevisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageRevisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageRevisionCountArgs<ExtArgs>
            result: $Utils.Optional<MessageRevisionCountAggregateOutputType> | number
          }
        }
      }
      ReadReceipt: {
        payload: Prisma.$ReadReceiptPayload<ExtArgs>
        fields: Prisma.ReadReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReadReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReadReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          findFirst: {
            args: Prisma.ReadReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReadReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          findMany: {
            args: Prisma.ReadReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>[]
          }
          create: {
            args: Prisma.ReadReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          createMany: {
            args: Prisma.ReadReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReadReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>[]
          }
          delete: {
            args: Prisma.ReadReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          update: {
            args: Prisma.ReadReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          deleteMany: {
            args: Prisma.ReadReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReadReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReadReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>[]
          }
          upsert: {
            args: Prisma.ReadReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReadReceiptPayload>
          }
          aggregate: {
            args: Prisma.ReadReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReadReceipt>
          }
          groupBy: {
            args: Prisma.ReadReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReadReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReadReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<ReadReceiptCountAggregateOutputType> | number
          }
        }
      }
      DeliveryReceipt: {
        payload: Prisma.$DeliveryReceiptPayload<ExtArgs>
        fields: Prisma.DeliveryReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          findFirst: {
            args: Prisma.DeliveryReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          findMany: {
            args: Prisma.DeliveryReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          create: {
            args: Prisma.DeliveryReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          createMany: {
            args: Prisma.DeliveryReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          delete: {
            args: Prisma.DeliveryReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          update: {
            args: Prisma.DeliveryReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryReceiptPayload>
          }
          aggregate: {
            args: Prisma.DeliveryReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryReceipt>
          }
          groupBy: {
            args: Prisma.DeliveryReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryReceiptCountAggregateOutputType> | number
          }
        }
      }
      ChatMessageCounter: {
        payload: Prisma.$ChatMessageCounterPayload<ExtArgs>
        fields: Prisma.ChatMessageCounterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageCounterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageCounterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          findFirst: {
            args: Prisma.ChatMessageCounterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageCounterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          findMany: {
            args: Prisma.ChatMessageCounterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>[]
          }
          create: {
            args: Prisma.ChatMessageCounterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          createMany: {
            args: Prisma.ChatMessageCounterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMessageCounterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>[]
          }
          delete: {
            args: Prisma.ChatMessageCounterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          update: {
            args: Prisma.ChatMessageCounterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageCounterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageCounterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMessageCounterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>[]
          }
          upsert: {
            args: Prisma.ChatMessageCounterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessageCounterPayload>
          }
          aggregate: {
            args: Prisma.ChatMessageCounterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessageCounter>
          }
          groupBy: {
            args: Prisma.ChatMessageCounterGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCounterGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCounterCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCounterCountAggregateOutputType> | number
          }
        }
      }
      ChatSummaryProjection: {
        payload: Prisma.$ChatSummaryProjectionPayload<ExtArgs>
        fields: Prisma.ChatSummaryProjectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatSummaryProjectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatSummaryProjectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          findFirst: {
            args: Prisma.ChatSummaryProjectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatSummaryProjectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          findMany: {
            args: Prisma.ChatSummaryProjectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>[]
          }
          create: {
            args: Prisma.ChatSummaryProjectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          createMany: {
            args: Prisma.ChatSummaryProjectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatSummaryProjectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>[]
          }
          delete: {
            args: Prisma.ChatSummaryProjectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          update: {
            args: Prisma.ChatSummaryProjectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          deleteMany: {
            args: Prisma.ChatSummaryProjectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatSummaryProjectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatSummaryProjectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>[]
          }
          upsert: {
            args: Prisma.ChatSummaryProjectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionPayload>
          }
          aggregate: {
            args: Prisma.ChatSummaryProjectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatSummaryProjection>
          }
          groupBy: {
            args: Prisma.ChatSummaryProjectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatSummaryProjectionCountArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionCountAggregateOutputType> | number
          }
        }
      }
      ChatSummaryProjectionEvent: {
        payload: Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>
        fields: Prisma.ChatSummaryProjectionEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatSummaryProjectionEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatSummaryProjectionEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          findFirst: {
            args: Prisma.ChatSummaryProjectionEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatSummaryProjectionEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          findMany: {
            args: Prisma.ChatSummaryProjectionEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>[]
          }
          create: {
            args: Prisma.ChatSummaryProjectionEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          createMany: {
            args: Prisma.ChatSummaryProjectionEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatSummaryProjectionEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>[]
          }
          delete: {
            args: Prisma.ChatSummaryProjectionEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          update: {
            args: Prisma.ChatSummaryProjectionEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          deleteMany: {
            args: Prisma.ChatSummaryProjectionEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatSummaryProjectionEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatSummaryProjectionEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>[]
          }
          upsert: {
            args: Prisma.ChatSummaryProjectionEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionEventPayload>
          }
          aggregate: {
            args: Prisma.ChatSummaryProjectionEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatSummaryProjectionEvent>
          }
          groupBy: {
            args: Prisma.ChatSummaryProjectionEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatSummaryProjectionEventCountArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionEventCountAggregateOutputType> | number
          }
        }
      }
      ChatSummaryProjectionOffset: {
        payload: Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>
        fields: Prisma.ChatSummaryProjectionOffsetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatSummaryProjectionOffsetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatSummaryProjectionOffsetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          findFirst: {
            args: Prisma.ChatSummaryProjectionOffsetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatSummaryProjectionOffsetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          findMany: {
            args: Prisma.ChatSummaryProjectionOffsetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>[]
          }
          create: {
            args: Prisma.ChatSummaryProjectionOffsetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          createMany: {
            args: Prisma.ChatSummaryProjectionOffsetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatSummaryProjectionOffsetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>[]
          }
          delete: {
            args: Prisma.ChatSummaryProjectionOffsetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          update: {
            args: Prisma.ChatSummaryProjectionOffsetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          deleteMany: {
            args: Prisma.ChatSummaryProjectionOffsetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatSummaryProjectionOffsetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatSummaryProjectionOffsetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>[]
          }
          upsert: {
            args: Prisma.ChatSummaryProjectionOffsetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatSummaryProjectionOffsetPayload>
          }
          aggregate: {
            args: Prisma.ChatSummaryProjectionOffsetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatSummaryProjectionOffset>
          }
          groupBy: {
            args: Prisma.ChatSummaryProjectionOffsetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionOffsetGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatSummaryProjectionOffsetCountArgs<ExtArgs>
            result: $Utils.Optional<ChatSummaryProjectionOffsetCountAggregateOutputType> | number
          }
        }
      }
      OutboxEvent: {
        payload: Prisma.$OutboxEventPayload<ExtArgs>
        fields: Prisma.OutboxEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findFirst: {
            args: Prisma.OutboxEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findMany: {
            args: Prisma.OutboxEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          create: {
            args: Prisma.OutboxEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          createMany: {
            args: Prisma.OutboxEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          delete: {
            args: Prisma.OutboxEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          update: {
            args: Prisma.OutboxEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          deleteMany: {
            args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutboxEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          upsert: {
            args: Prisma.OutboxEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          aggregate: {
            args: Prisma.OutboxEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboxEvent>
          }
          groupBy: {
            args: Prisma.OutboxEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxEventCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    message?: MessageOmit
    messageAttachment?: MessageAttachmentOmit
    messageReaction?: MessageReactionOmit
    messageRevision?: MessageRevisionOmit
    readReceipt?: ReadReceiptOmit
    deliveryReceipt?: DeliveryReceiptOmit
    chatMessageCounter?: ChatMessageCounterOmit
    chatSummaryProjection?: ChatSummaryProjectionOmit
    chatSummaryProjectionEvent?: ChatSummaryProjectionEventOmit
    chatSummaryProjectionOffset?: ChatSummaryProjectionOffsetOmit
    outboxEvent?: OutboxEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    attachments: number
    reactions: number
    revisions: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | MessageCountOutputTypeCountAttachmentsArgs
    reactions?: boolean | MessageCountOutputTypeCountReactionsArgs
    revisions?: boolean | MessageCountOutputTypeCountRevisionsArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageAttachmentWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageReactionWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountRevisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageRevisionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    senderUserId: string | null
    clientMessageId: string | null
    type: $Enums.MessageType | null
    text: string | null
    replyToMessageId: string | null
    forwardedFromMessageId: string | null
    createdAt: Date | null
    editedAt: Date | null
    deletedAt: Date | null
    status: $Enums.MessageStatus | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    senderUserId: string | null
    clientMessageId: string | null
    type: $Enums.MessageType | null
    text: string | null
    replyToMessageId: string | null
    forwardedFromMessageId: string | null
    createdAt: Date | null
    editedAt: Date | null
    deletedAt: Date | null
    status: $Enums.MessageStatus | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    chatId: number
    senderUserId: number
    clientMessageId: number
    type: number
    text: number
    replyToMessageId: number
    forwardedFromMessageId: number
    createdAt: number
    editedAt: number
    deletedAt: number
    status: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    chatId?: true
    senderUserId?: true
    clientMessageId?: true
    type?: true
    text?: true
    replyToMessageId?: true
    forwardedFromMessageId?: true
    createdAt?: true
    editedAt?: true
    deletedAt?: true
    status?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    chatId?: true
    senderUserId?: true
    clientMessageId?: true
    type?: true
    text?: true
    replyToMessageId?: true
    forwardedFromMessageId?: true
    createdAt?: true
    editedAt?: true
    deletedAt?: true
    status?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    chatId?: true
    senderUserId?: true
    clientMessageId?: true
    type?: true
    text?: true
    replyToMessageId?: true
    forwardedFromMessageId?: true
    createdAt?: true
    editedAt?: true
    deletedAt?: true
    status?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text: string | null
    replyToMessageId: string | null
    forwardedFromMessageId: string | null
    createdAt: Date
    editedAt: Date | null
    deletedAt: Date | null
    status: $Enums.MessageStatus
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    senderUserId?: boolean
    clientMessageId?: boolean
    type?: boolean
    text?: boolean
    replyToMessageId?: boolean
    forwardedFromMessageId?: boolean
    createdAt?: boolean
    editedAt?: boolean
    deletedAt?: boolean
    status?: boolean
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    revisions?: boolean | Message$revisionsArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    senderUserId?: boolean
    clientMessageId?: boolean
    type?: boolean
    text?: boolean
    replyToMessageId?: boolean
    forwardedFromMessageId?: boolean
    createdAt?: boolean
    editedAt?: boolean
    deletedAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    senderUserId?: boolean
    clientMessageId?: boolean
    type?: boolean
    text?: boolean
    replyToMessageId?: boolean
    forwardedFromMessageId?: boolean
    createdAt?: boolean
    editedAt?: boolean
    deletedAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    chatId?: boolean
    senderUserId?: boolean
    clientMessageId?: boolean
    type?: boolean
    text?: boolean
    replyToMessageId?: boolean
    forwardedFromMessageId?: boolean
    createdAt?: boolean
    editedAt?: boolean
    deletedAt?: boolean
    status?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "senderUserId" | "clientMessageId" | "type" | "text" | "replyToMessageId" | "forwardedFromMessageId" | "createdAt" | "editedAt" | "deletedAt" | "status", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    reactions?: boolean | Message$reactionsArgs<ExtArgs>
    revisions?: boolean | Message$revisionsArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      attachments: Prisma.$MessageAttachmentPayload<ExtArgs>[]
      reactions: Prisma.$MessageReactionPayload<ExtArgs>[]
      revisions: Prisma.$MessageRevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      senderUserId: string
      clientMessageId: string
      type: $Enums.MessageType
      text: string | null
      replyToMessageId: string | null
      forwardedFromMessageId: string | null
      createdAt: Date
      editedAt: Date | null
      deletedAt: Date | null
      status: $Enums.MessageStatus
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachments<T extends Message$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Message$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends Message$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, Message$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    revisions<T extends Message$revisionsArgs<ExtArgs> = {}>(args?: Subset<T, Message$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly chatId: FieldRef<"Message", 'String'>
    readonly senderUserId: FieldRef<"Message", 'String'>
    readonly clientMessageId: FieldRef<"Message", 'String'>
    readonly type: FieldRef<"Message", 'MessageType'>
    readonly text: FieldRef<"Message", 'String'>
    readonly replyToMessageId: FieldRef<"Message", 'String'>
    readonly forwardedFromMessageId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly editedAt: FieldRef<"Message", 'DateTime'>
    readonly deletedAt: FieldRef<"Message", 'DateTime'>
    readonly status: FieldRef<"Message", 'MessageStatus'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.attachments
   */
  export type Message$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    where?: MessageAttachmentWhereInput
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    cursor?: MessageAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * Message.reactions
   */
  export type Message$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    where?: MessageReactionWhereInput
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    cursor?: MessageReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * Message.revisions
   */
  export type Message$revisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    where?: MessageRevisionWhereInput
    orderBy?: MessageRevisionOrderByWithRelationInput | MessageRevisionOrderByWithRelationInput[]
    cursor?: MessageRevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageRevisionScalarFieldEnum | MessageRevisionScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MessageAttachment
   */

  export type AggregateMessageAttachment = {
    _count: MessageAttachmentCountAggregateOutputType | null
    _avg: MessageAttachmentAvgAggregateOutputType | null
    _sum: MessageAttachmentSumAggregateOutputType | null
    _min: MessageAttachmentMinAggregateOutputType | null
    _max: MessageAttachmentMaxAggregateOutputType | null
  }

  export type MessageAttachmentAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type MessageAttachmentSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type MessageAttachmentMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    mediaId: string | null
    attachmentType: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type MessageAttachmentMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    mediaId: string | null
    attachmentType: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type MessageAttachmentCountAggregateOutputType = {
    id: number
    messageId: number
    mediaId: number
    attachmentType: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type MessageAttachmentAvgAggregateInputType = {
    sortOrder?: true
  }

  export type MessageAttachmentSumAggregateInputType = {
    sortOrder?: true
  }

  export type MessageAttachmentMinAggregateInputType = {
    id?: true
    messageId?: true
    mediaId?: true
    attachmentType?: true
    sortOrder?: true
    createdAt?: true
  }

  export type MessageAttachmentMaxAggregateInputType = {
    id?: true
    messageId?: true
    mediaId?: true
    attachmentType?: true
    sortOrder?: true
    createdAt?: true
  }

  export type MessageAttachmentCountAggregateInputType = {
    id?: true
    messageId?: true
    mediaId?: true
    attachmentType?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageAttachment to aggregate.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageAttachments
    **/
    _count?: true | MessageAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageAttachmentMaxAggregateInputType
  }

  export type GetMessageAttachmentAggregateType<T extends MessageAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageAttachment[P]>
      : GetScalarType<T[P], AggregateMessageAttachment[P]>
  }




  export type MessageAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageAttachmentWhereInput
    orderBy?: MessageAttachmentOrderByWithAggregationInput | MessageAttachmentOrderByWithAggregationInput[]
    by: MessageAttachmentScalarFieldEnum[] | MessageAttachmentScalarFieldEnum
    having?: MessageAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageAttachmentCountAggregateInputType | true
    _avg?: MessageAttachmentAvgAggregateInputType
    _sum?: MessageAttachmentSumAggregateInputType
    _min?: MessageAttachmentMinAggregateInputType
    _max?: MessageAttachmentMaxAggregateInputType
  }

  export type MessageAttachmentGroupByOutputType = {
    id: string
    messageId: string
    mediaId: string
    attachmentType: string
    sortOrder: number
    createdAt: Date
    _count: MessageAttachmentCountAggregateOutputType | null
    _avg: MessageAttachmentAvgAggregateOutputType | null
    _sum: MessageAttachmentSumAggregateOutputType | null
    _min: MessageAttachmentMinAggregateOutputType | null
    _max: MessageAttachmentMaxAggregateOutputType | null
  }

  type GetMessageAttachmentGroupByPayload<T extends MessageAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type MessageAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    mediaId?: boolean
    attachmentType?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageAttachment"]>

  export type MessageAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    mediaId?: boolean
    attachmentType?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageAttachment"]>

  export type MessageAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    mediaId?: boolean
    attachmentType?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageAttachment"]>

  export type MessageAttachmentSelectScalar = {
    id?: boolean
    messageId?: boolean
    mediaId?: boolean
    attachmentType?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type MessageAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "mediaId" | "attachmentType" | "sortOrder" | "createdAt", ExtArgs["result"]["messageAttachment"]>
  export type MessageAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageAttachment"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      mediaId: string
      attachmentType: string
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["messageAttachment"]>
    composites: {}
  }

  type MessageAttachmentGetPayload<S extends boolean | null | undefined | MessageAttachmentDefaultArgs> = $Result.GetResult<Prisma.$MessageAttachmentPayload, S>

  type MessageAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageAttachmentCountAggregateInputType | true
    }

  export interface MessageAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageAttachment'], meta: { name: 'MessageAttachment' } }
    /**
     * Find zero or one MessageAttachment that matches the filter.
     * @param {MessageAttachmentFindUniqueArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageAttachmentFindUniqueArgs>(args: SelectSubset<T, MessageAttachmentFindUniqueArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageAttachmentFindUniqueOrThrowArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindFirstArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageAttachmentFindFirstArgs>(args?: SelectSubset<T, MessageAttachmentFindFirstArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindFirstOrThrowArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageAttachments
     * const messageAttachments = await prisma.messageAttachment.findMany()
     * 
     * // Get first 10 MessageAttachments
     * const messageAttachments = await prisma.messageAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageAttachmentWithIdOnly = await prisma.messageAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageAttachmentFindManyArgs>(args?: SelectSubset<T, MessageAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageAttachment.
     * @param {MessageAttachmentCreateArgs} args - Arguments to create a MessageAttachment.
     * @example
     * // Create one MessageAttachment
     * const MessageAttachment = await prisma.messageAttachment.create({
     *   data: {
     *     // ... data to create a MessageAttachment
     *   }
     * })
     * 
     */
    create<T extends MessageAttachmentCreateArgs>(args: SelectSubset<T, MessageAttachmentCreateArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageAttachments.
     * @param {MessageAttachmentCreateManyArgs} args - Arguments to create many MessageAttachments.
     * @example
     * // Create many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageAttachmentCreateManyArgs>(args?: SelectSubset<T, MessageAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageAttachments and returns the data saved in the database.
     * @param {MessageAttachmentCreateManyAndReturnArgs} args - Arguments to create many MessageAttachments.
     * @example
     * // Create many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageAttachments and only return the `id`
     * const messageAttachmentWithIdOnly = await prisma.messageAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageAttachment.
     * @param {MessageAttachmentDeleteArgs} args - Arguments to delete one MessageAttachment.
     * @example
     * // Delete one MessageAttachment
     * const MessageAttachment = await prisma.messageAttachment.delete({
     *   where: {
     *     // ... filter to delete one MessageAttachment
     *   }
     * })
     * 
     */
    delete<T extends MessageAttachmentDeleteArgs>(args: SelectSubset<T, MessageAttachmentDeleteArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageAttachment.
     * @param {MessageAttachmentUpdateArgs} args - Arguments to update one MessageAttachment.
     * @example
     * // Update one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageAttachmentUpdateArgs>(args: SelectSubset<T, MessageAttachmentUpdateArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageAttachments.
     * @param {MessageAttachmentDeleteManyArgs} args - Arguments to filter MessageAttachments to delete.
     * @example
     * // Delete a few MessageAttachments
     * const { count } = await prisma.messageAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageAttachmentDeleteManyArgs>(args?: SelectSubset<T, MessageAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageAttachmentUpdateManyArgs>(args: SelectSubset<T, MessageAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageAttachments and returns the data updated in the database.
     * @param {MessageAttachmentUpdateManyAndReturnArgs} args - Arguments to update many MessageAttachments.
     * @example
     * // Update many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageAttachments and only return the `id`
     * const messageAttachmentWithIdOnly = await prisma.messageAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageAttachment.
     * @param {MessageAttachmentUpsertArgs} args - Arguments to update or create a MessageAttachment.
     * @example
     * // Update or create a MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.upsert({
     *   create: {
     *     // ... data to create a MessageAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageAttachment we want to update
     *   }
     * })
     */
    upsert<T extends MessageAttachmentUpsertArgs>(args: SelectSubset<T, MessageAttachmentUpsertArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentCountArgs} args - Arguments to filter MessageAttachments to count.
     * @example
     * // Count the number of MessageAttachments
     * const count = await prisma.messageAttachment.count({
     *   where: {
     *     // ... the filter for the MessageAttachments we want to count
     *   }
     * })
    **/
    count<T extends MessageAttachmentCountArgs>(
      args?: Subset<T, MessageAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAttachmentAggregateArgs>(args: Subset<T, MessageAttachmentAggregateArgs>): Prisma.PrismaPromise<GetMessageAttachmentAggregateType<T>>

    /**
     * Group by MessageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: MessageAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageAttachment model
   */
  readonly fields: MessageAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageAttachment model
   */
  interface MessageAttachmentFieldRefs {
    readonly id: FieldRef<"MessageAttachment", 'String'>
    readonly messageId: FieldRef<"MessageAttachment", 'String'>
    readonly mediaId: FieldRef<"MessageAttachment", 'String'>
    readonly attachmentType: FieldRef<"MessageAttachment", 'String'>
    readonly sortOrder: FieldRef<"MessageAttachment", 'Int'>
    readonly createdAt: FieldRef<"MessageAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageAttachment findUnique
   */
  export type MessageAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment findUniqueOrThrow
   */
  export type MessageAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment findFirst
   */
  export type MessageAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageAttachments.
     */
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment findFirstOrThrow
   */
  export type MessageAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageAttachments.
     */
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment findMany
   */
  export type MessageAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachments to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment create
   */
  export type MessageAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageAttachment.
     */
    data: XOR<MessageAttachmentCreateInput, MessageAttachmentUncheckedCreateInput>
  }

  /**
   * MessageAttachment createMany
   */
  export type MessageAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageAttachments.
     */
    data: MessageAttachmentCreateManyInput | MessageAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageAttachment createManyAndReturn
   */
  export type MessageAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many MessageAttachments.
     */
    data: MessageAttachmentCreateManyInput | MessageAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageAttachment update
   */
  export type MessageAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageAttachment.
     */
    data: XOR<MessageAttachmentUpdateInput, MessageAttachmentUncheckedUpdateInput>
    /**
     * Choose, which MessageAttachment to update.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment updateMany
   */
  export type MessageAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageAttachments.
     */
    data: XOR<MessageAttachmentUpdateManyMutationInput, MessageAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which MessageAttachments to update
     */
    where?: MessageAttachmentWhereInput
    /**
     * Limit how many MessageAttachments to update.
     */
    limit?: number
  }

  /**
   * MessageAttachment updateManyAndReturn
   */
  export type MessageAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update MessageAttachments.
     */
    data: XOR<MessageAttachmentUpdateManyMutationInput, MessageAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which MessageAttachments to update
     */
    where?: MessageAttachmentWhereInput
    /**
     * Limit how many MessageAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageAttachment upsert
   */
  export type MessageAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageAttachment to update in case it exists.
     */
    where: MessageAttachmentWhereUniqueInput
    /**
     * In case the MessageAttachment found by the `where` argument doesn't exist, create a new MessageAttachment with this data.
     */
    create: XOR<MessageAttachmentCreateInput, MessageAttachmentUncheckedCreateInput>
    /**
     * In case the MessageAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageAttachmentUpdateInput, MessageAttachmentUncheckedUpdateInput>
  }

  /**
   * MessageAttachment delete
   */
  export type MessageAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter which MessageAttachment to delete.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment deleteMany
   */
  export type MessageAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageAttachments to delete
     */
    where?: MessageAttachmentWhereInput
    /**
     * Limit how many MessageAttachments to delete.
     */
    limit?: number
  }

  /**
   * MessageAttachment without action
   */
  export type MessageAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageAttachment
     */
    omit?: MessageAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model MessageReaction
   */

  export type AggregateMessageReaction = {
    _count: MessageReactionCountAggregateOutputType | null
    _min: MessageReactionMinAggregateOutputType | null
    _max: MessageReactionMaxAggregateOutputType | null
  }

  export type MessageReactionMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type MessageReactionMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    emoji: string | null
    createdAt: Date | null
  }

  export type MessageReactionCountAggregateOutputType = {
    id: number
    messageId: number
    userId: number
    emoji: number
    createdAt: number
    _all: number
  }


  export type MessageReactionMinAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type MessageReactionMaxAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
  }

  export type MessageReactionCountAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    emoji?: true
    createdAt?: true
    _all?: true
  }

  export type MessageReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageReaction to aggregate.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageReactions
    **/
    _count?: true | MessageReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageReactionMaxAggregateInputType
  }

  export type GetMessageReactionAggregateType<T extends MessageReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageReaction[P]>
      : GetScalarType<T[P], AggregateMessageReaction[P]>
  }




  export type MessageReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageReactionWhereInput
    orderBy?: MessageReactionOrderByWithAggregationInput | MessageReactionOrderByWithAggregationInput[]
    by: MessageReactionScalarFieldEnum[] | MessageReactionScalarFieldEnum
    having?: MessageReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageReactionCountAggregateInputType | true
    _min?: MessageReactionMinAggregateInputType
    _max?: MessageReactionMaxAggregateInputType
  }

  export type MessageReactionGroupByOutputType = {
    id: string
    messageId: string
    userId: string
    emoji: string
    createdAt: Date
    _count: MessageReactionCountAggregateOutputType | null
    _min: MessageReactionMinAggregateOutputType | null
    _max: MessageReactionMaxAggregateOutputType | null
  }

  type GetMessageReactionGroupByPayload<T extends MessageReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageReactionGroupByOutputType[P]>
            : GetScalarType<T[P], MessageReactionGroupByOutputType[P]>
        }
      >
    >


  export type MessageReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageReaction"]>

  export type MessageReactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageReaction"]>

  export type MessageReactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageReaction"]>

  export type MessageReactionSelectScalar = {
    id?: boolean
    messageId?: boolean
    userId?: boolean
    emoji?: boolean
    createdAt?: boolean
  }

  export type MessageReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "userId" | "emoji" | "createdAt", ExtArgs["result"]["messageReaction"]>
  export type MessageReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageReactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageReactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageReaction"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      userId: string
      emoji: string
      createdAt: Date
    }, ExtArgs["result"]["messageReaction"]>
    composites: {}
  }

  type MessageReactionGetPayload<S extends boolean | null | undefined | MessageReactionDefaultArgs> = $Result.GetResult<Prisma.$MessageReactionPayload, S>

  type MessageReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageReactionCountAggregateInputType | true
    }

  export interface MessageReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageReaction'], meta: { name: 'MessageReaction' } }
    /**
     * Find zero or one MessageReaction that matches the filter.
     * @param {MessageReactionFindUniqueArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageReactionFindUniqueArgs>(args: SelectSubset<T, MessageReactionFindUniqueArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageReaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageReactionFindUniqueOrThrowArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageReaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindFirstArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageReactionFindFirstArgs>(args?: SelectSubset<T, MessageReactionFindFirstArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageReaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindFirstOrThrowArgs} args - Arguments to find a MessageReaction
     * @example
     * // Get one MessageReaction
     * const messageReaction = await prisma.messageReaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageReactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageReactions
     * const messageReactions = await prisma.messageReaction.findMany()
     * 
     * // Get first 10 MessageReactions
     * const messageReactions = await prisma.messageReaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageReactionWithIdOnly = await prisma.messageReaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageReactionFindManyArgs>(args?: SelectSubset<T, MessageReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageReaction.
     * @param {MessageReactionCreateArgs} args - Arguments to create a MessageReaction.
     * @example
     * // Create one MessageReaction
     * const MessageReaction = await prisma.messageReaction.create({
     *   data: {
     *     // ... data to create a MessageReaction
     *   }
     * })
     * 
     */
    create<T extends MessageReactionCreateArgs>(args: SelectSubset<T, MessageReactionCreateArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageReactions.
     * @param {MessageReactionCreateManyArgs} args - Arguments to create many MessageReactions.
     * @example
     * // Create many MessageReactions
     * const messageReaction = await prisma.messageReaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageReactionCreateManyArgs>(args?: SelectSubset<T, MessageReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageReactions and returns the data saved in the database.
     * @param {MessageReactionCreateManyAndReturnArgs} args - Arguments to create many MessageReactions.
     * @example
     * // Create many MessageReactions
     * const messageReaction = await prisma.messageReaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageReactions and only return the `id`
     * const messageReactionWithIdOnly = await prisma.messageReaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageReactionCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageReaction.
     * @param {MessageReactionDeleteArgs} args - Arguments to delete one MessageReaction.
     * @example
     * // Delete one MessageReaction
     * const MessageReaction = await prisma.messageReaction.delete({
     *   where: {
     *     // ... filter to delete one MessageReaction
     *   }
     * })
     * 
     */
    delete<T extends MessageReactionDeleteArgs>(args: SelectSubset<T, MessageReactionDeleteArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageReaction.
     * @param {MessageReactionUpdateArgs} args - Arguments to update one MessageReaction.
     * @example
     * // Update one MessageReaction
     * const messageReaction = await prisma.messageReaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageReactionUpdateArgs>(args: SelectSubset<T, MessageReactionUpdateArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageReactions.
     * @param {MessageReactionDeleteManyArgs} args - Arguments to filter MessageReactions to delete.
     * @example
     * // Delete a few MessageReactions
     * const { count } = await prisma.messageReaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageReactionDeleteManyArgs>(args?: SelectSubset<T, MessageReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageReactions
     * const messageReaction = await prisma.messageReaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageReactionUpdateManyArgs>(args: SelectSubset<T, MessageReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageReactions and returns the data updated in the database.
     * @param {MessageReactionUpdateManyAndReturnArgs} args - Arguments to update many MessageReactions.
     * @example
     * // Update many MessageReactions
     * const messageReaction = await prisma.messageReaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageReactions and only return the `id`
     * const messageReactionWithIdOnly = await prisma.messageReaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageReactionUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageReaction.
     * @param {MessageReactionUpsertArgs} args - Arguments to update or create a MessageReaction.
     * @example
     * // Update or create a MessageReaction
     * const messageReaction = await prisma.messageReaction.upsert({
     *   create: {
     *     // ... data to create a MessageReaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageReaction we want to update
     *   }
     * })
     */
    upsert<T extends MessageReactionUpsertArgs>(args: SelectSubset<T, MessageReactionUpsertArgs<ExtArgs>>): Prisma__MessageReactionClient<$Result.GetResult<Prisma.$MessageReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageReactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionCountArgs} args - Arguments to filter MessageReactions to count.
     * @example
     * // Count the number of MessageReactions
     * const count = await prisma.messageReaction.count({
     *   where: {
     *     // ... the filter for the MessageReactions we want to count
     *   }
     * })
    **/
    count<T extends MessageReactionCountArgs>(
      args?: Subset<T, MessageReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageReactionAggregateArgs>(args: Subset<T, MessageReactionAggregateArgs>): Prisma.PrismaPromise<GetMessageReactionAggregateType<T>>

    /**
     * Group by MessageReaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageReactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageReactionGroupByArgs['orderBy'] }
        : { orderBy?: MessageReactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageReaction model
   */
  readonly fields: MessageReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageReaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageReaction model
   */
  interface MessageReactionFieldRefs {
    readonly id: FieldRef<"MessageReaction", 'String'>
    readonly messageId: FieldRef<"MessageReaction", 'String'>
    readonly userId: FieldRef<"MessageReaction", 'String'>
    readonly emoji: FieldRef<"MessageReaction", 'String'>
    readonly createdAt: FieldRef<"MessageReaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageReaction findUnique
   */
  export type MessageReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction findUniqueOrThrow
   */
  export type MessageReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction findFirst
   */
  export type MessageReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageReactions.
     */
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction findFirstOrThrow
   */
  export type MessageReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReaction to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageReactions.
     */
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction findMany
   */
  export type MessageReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter, which MessageReactions to fetch.
     */
    where?: MessageReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageReactions to fetch.
     */
    orderBy?: MessageReactionOrderByWithRelationInput | MessageReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageReactions.
     */
    cursor?: MessageReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageReactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageReactions.
     */
    skip?: number
    distinct?: MessageReactionScalarFieldEnum | MessageReactionScalarFieldEnum[]
  }

  /**
   * MessageReaction create
   */
  export type MessageReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageReaction.
     */
    data: XOR<MessageReactionCreateInput, MessageReactionUncheckedCreateInput>
  }

  /**
   * MessageReaction createMany
   */
  export type MessageReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageReactions.
     */
    data: MessageReactionCreateManyInput | MessageReactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageReaction createManyAndReturn
   */
  export type MessageReactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * The data used to create many MessageReactions.
     */
    data: MessageReactionCreateManyInput | MessageReactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageReaction update
   */
  export type MessageReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageReaction.
     */
    data: XOR<MessageReactionUpdateInput, MessageReactionUncheckedUpdateInput>
    /**
     * Choose, which MessageReaction to update.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction updateMany
   */
  export type MessageReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageReactions.
     */
    data: XOR<MessageReactionUpdateManyMutationInput, MessageReactionUncheckedUpdateManyInput>
    /**
     * Filter which MessageReactions to update
     */
    where?: MessageReactionWhereInput
    /**
     * Limit how many MessageReactions to update.
     */
    limit?: number
  }

  /**
   * MessageReaction updateManyAndReturn
   */
  export type MessageReactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * The data used to update MessageReactions.
     */
    data: XOR<MessageReactionUpdateManyMutationInput, MessageReactionUncheckedUpdateManyInput>
    /**
     * Filter which MessageReactions to update
     */
    where?: MessageReactionWhereInput
    /**
     * Limit how many MessageReactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageReaction upsert
   */
  export type MessageReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageReaction to update in case it exists.
     */
    where: MessageReactionWhereUniqueInput
    /**
     * In case the MessageReaction found by the `where` argument doesn't exist, create a new MessageReaction with this data.
     */
    create: XOR<MessageReactionCreateInput, MessageReactionUncheckedCreateInput>
    /**
     * In case the MessageReaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageReactionUpdateInput, MessageReactionUncheckedUpdateInput>
  }

  /**
   * MessageReaction delete
   */
  export type MessageReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
    /**
     * Filter which MessageReaction to delete.
     */
    where: MessageReactionWhereUniqueInput
  }

  /**
   * MessageReaction deleteMany
   */
  export type MessageReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageReactions to delete
     */
    where?: MessageReactionWhereInput
    /**
     * Limit how many MessageReactions to delete.
     */
    limit?: number
  }

  /**
   * MessageReaction without action
   */
  export type MessageReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageReaction
     */
    select?: MessageReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageReaction
     */
    omit?: MessageReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageReactionInclude<ExtArgs> | null
  }


  /**
   * Model MessageRevision
   */

  export type AggregateMessageRevision = {
    _count: MessageRevisionCountAggregateOutputType | null
    _min: MessageRevisionMinAggregateOutputType | null
    _max: MessageRevisionMaxAggregateOutputType | null
  }

  export type MessageRevisionMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    previousText: string | null
    editedByUserId: string | null
    editedAt: Date | null
  }

  export type MessageRevisionMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    previousText: string | null
    editedByUserId: string | null
    editedAt: Date | null
  }

  export type MessageRevisionCountAggregateOutputType = {
    id: number
    messageId: number
    previousText: number
    editedByUserId: number
    editedAt: number
    _all: number
  }


  export type MessageRevisionMinAggregateInputType = {
    id?: true
    messageId?: true
    previousText?: true
    editedByUserId?: true
    editedAt?: true
  }

  export type MessageRevisionMaxAggregateInputType = {
    id?: true
    messageId?: true
    previousText?: true
    editedByUserId?: true
    editedAt?: true
  }

  export type MessageRevisionCountAggregateInputType = {
    id?: true
    messageId?: true
    previousText?: true
    editedByUserId?: true
    editedAt?: true
    _all?: true
  }

  export type MessageRevisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageRevision to aggregate.
     */
    where?: MessageRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRevisions to fetch.
     */
    orderBy?: MessageRevisionOrderByWithRelationInput | MessageRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageRevisions
    **/
    _count?: true | MessageRevisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageRevisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageRevisionMaxAggregateInputType
  }

  export type GetMessageRevisionAggregateType<T extends MessageRevisionAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageRevision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageRevision[P]>
      : GetScalarType<T[P], AggregateMessageRevision[P]>
  }




  export type MessageRevisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageRevisionWhereInput
    orderBy?: MessageRevisionOrderByWithAggregationInput | MessageRevisionOrderByWithAggregationInput[]
    by: MessageRevisionScalarFieldEnum[] | MessageRevisionScalarFieldEnum
    having?: MessageRevisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageRevisionCountAggregateInputType | true
    _min?: MessageRevisionMinAggregateInputType
    _max?: MessageRevisionMaxAggregateInputType
  }

  export type MessageRevisionGroupByOutputType = {
    id: string
    messageId: string
    previousText: string | null
    editedByUserId: string
    editedAt: Date
    _count: MessageRevisionCountAggregateOutputType | null
    _min: MessageRevisionMinAggregateOutputType | null
    _max: MessageRevisionMaxAggregateOutputType | null
  }

  type GetMessageRevisionGroupByPayload<T extends MessageRevisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageRevisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageRevisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageRevisionGroupByOutputType[P]>
            : GetScalarType<T[P], MessageRevisionGroupByOutputType[P]>
        }
      >
    >


  export type MessageRevisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    previousText?: boolean
    editedByUserId?: boolean
    editedAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageRevision"]>

  export type MessageRevisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    previousText?: boolean
    editedByUserId?: boolean
    editedAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageRevision"]>

  export type MessageRevisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    previousText?: boolean
    editedByUserId?: boolean
    editedAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageRevision"]>

  export type MessageRevisionSelectScalar = {
    id?: boolean
    messageId?: boolean
    previousText?: boolean
    editedByUserId?: boolean
    editedAt?: boolean
  }

  export type MessageRevisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "previousText" | "editedByUserId" | "editedAt", ExtArgs["result"]["messageRevision"]>
  export type MessageRevisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageRevisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }
  export type MessageRevisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageRevisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageRevision"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      previousText: string | null
      editedByUserId: string
      editedAt: Date
    }, ExtArgs["result"]["messageRevision"]>
    composites: {}
  }

  type MessageRevisionGetPayload<S extends boolean | null | undefined | MessageRevisionDefaultArgs> = $Result.GetResult<Prisma.$MessageRevisionPayload, S>

  type MessageRevisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageRevisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageRevisionCountAggregateInputType | true
    }

  export interface MessageRevisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageRevision'], meta: { name: 'MessageRevision' } }
    /**
     * Find zero or one MessageRevision that matches the filter.
     * @param {MessageRevisionFindUniqueArgs} args - Arguments to find a MessageRevision
     * @example
     * // Get one MessageRevision
     * const messageRevision = await prisma.messageRevision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageRevisionFindUniqueArgs>(args: SelectSubset<T, MessageRevisionFindUniqueArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageRevision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageRevisionFindUniqueOrThrowArgs} args - Arguments to find a MessageRevision
     * @example
     * // Get one MessageRevision
     * const messageRevision = await prisma.messageRevision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageRevisionFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageRevisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageRevision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionFindFirstArgs} args - Arguments to find a MessageRevision
     * @example
     * // Get one MessageRevision
     * const messageRevision = await prisma.messageRevision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageRevisionFindFirstArgs>(args?: SelectSubset<T, MessageRevisionFindFirstArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageRevision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionFindFirstOrThrowArgs} args - Arguments to find a MessageRevision
     * @example
     * // Get one MessageRevision
     * const messageRevision = await prisma.messageRevision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageRevisionFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageRevisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageRevisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageRevisions
     * const messageRevisions = await prisma.messageRevision.findMany()
     * 
     * // Get first 10 MessageRevisions
     * const messageRevisions = await prisma.messageRevision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageRevisionWithIdOnly = await prisma.messageRevision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageRevisionFindManyArgs>(args?: SelectSubset<T, MessageRevisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageRevision.
     * @param {MessageRevisionCreateArgs} args - Arguments to create a MessageRevision.
     * @example
     * // Create one MessageRevision
     * const MessageRevision = await prisma.messageRevision.create({
     *   data: {
     *     // ... data to create a MessageRevision
     *   }
     * })
     * 
     */
    create<T extends MessageRevisionCreateArgs>(args: SelectSubset<T, MessageRevisionCreateArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageRevisions.
     * @param {MessageRevisionCreateManyArgs} args - Arguments to create many MessageRevisions.
     * @example
     * // Create many MessageRevisions
     * const messageRevision = await prisma.messageRevision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageRevisionCreateManyArgs>(args?: SelectSubset<T, MessageRevisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageRevisions and returns the data saved in the database.
     * @param {MessageRevisionCreateManyAndReturnArgs} args - Arguments to create many MessageRevisions.
     * @example
     * // Create many MessageRevisions
     * const messageRevision = await prisma.messageRevision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageRevisions and only return the `id`
     * const messageRevisionWithIdOnly = await prisma.messageRevision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageRevisionCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageRevisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageRevision.
     * @param {MessageRevisionDeleteArgs} args - Arguments to delete one MessageRevision.
     * @example
     * // Delete one MessageRevision
     * const MessageRevision = await prisma.messageRevision.delete({
     *   where: {
     *     // ... filter to delete one MessageRevision
     *   }
     * })
     * 
     */
    delete<T extends MessageRevisionDeleteArgs>(args: SelectSubset<T, MessageRevisionDeleteArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageRevision.
     * @param {MessageRevisionUpdateArgs} args - Arguments to update one MessageRevision.
     * @example
     * // Update one MessageRevision
     * const messageRevision = await prisma.messageRevision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageRevisionUpdateArgs>(args: SelectSubset<T, MessageRevisionUpdateArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageRevisions.
     * @param {MessageRevisionDeleteManyArgs} args - Arguments to filter MessageRevisions to delete.
     * @example
     * // Delete a few MessageRevisions
     * const { count } = await prisma.messageRevision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageRevisionDeleteManyArgs>(args?: SelectSubset<T, MessageRevisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageRevisions
     * const messageRevision = await prisma.messageRevision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageRevisionUpdateManyArgs>(args: SelectSubset<T, MessageRevisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageRevisions and returns the data updated in the database.
     * @param {MessageRevisionUpdateManyAndReturnArgs} args - Arguments to update many MessageRevisions.
     * @example
     * // Update many MessageRevisions
     * const messageRevision = await prisma.messageRevision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageRevisions and only return the `id`
     * const messageRevisionWithIdOnly = await prisma.messageRevision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageRevisionUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageRevisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageRevision.
     * @param {MessageRevisionUpsertArgs} args - Arguments to update or create a MessageRevision.
     * @example
     * // Update or create a MessageRevision
     * const messageRevision = await prisma.messageRevision.upsert({
     *   create: {
     *     // ... data to create a MessageRevision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageRevision we want to update
     *   }
     * })
     */
    upsert<T extends MessageRevisionUpsertArgs>(args: SelectSubset<T, MessageRevisionUpsertArgs<ExtArgs>>): Prisma__MessageRevisionClient<$Result.GetResult<Prisma.$MessageRevisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionCountArgs} args - Arguments to filter MessageRevisions to count.
     * @example
     * // Count the number of MessageRevisions
     * const count = await prisma.messageRevision.count({
     *   where: {
     *     // ... the filter for the MessageRevisions we want to count
     *   }
     * })
    **/
    count<T extends MessageRevisionCountArgs>(
      args?: Subset<T, MessageRevisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageRevisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageRevisionAggregateArgs>(args: Subset<T, MessageRevisionAggregateArgs>): Prisma.PrismaPromise<GetMessageRevisionAggregateType<T>>

    /**
     * Group by MessageRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRevisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageRevisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageRevisionGroupByArgs['orderBy'] }
        : { orderBy?: MessageRevisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageRevisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageRevisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageRevision model
   */
  readonly fields: MessageRevisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageRevision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageRevisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageRevision model
   */
  interface MessageRevisionFieldRefs {
    readonly id: FieldRef<"MessageRevision", 'String'>
    readonly messageId: FieldRef<"MessageRevision", 'String'>
    readonly previousText: FieldRef<"MessageRevision", 'String'>
    readonly editedByUserId: FieldRef<"MessageRevision", 'String'>
    readonly editedAt: FieldRef<"MessageRevision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageRevision findUnique
   */
  export type MessageRevisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter, which MessageRevision to fetch.
     */
    where: MessageRevisionWhereUniqueInput
  }

  /**
   * MessageRevision findUniqueOrThrow
   */
  export type MessageRevisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter, which MessageRevision to fetch.
     */
    where: MessageRevisionWhereUniqueInput
  }

  /**
   * MessageRevision findFirst
   */
  export type MessageRevisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter, which MessageRevision to fetch.
     */
    where?: MessageRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRevisions to fetch.
     */
    orderBy?: MessageRevisionOrderByWithRelationInput | MessageRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageRevisions.
     */
    cursor?: MessageRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageRevisions.
     */
    distinct?: MessageRevisionScalarFieldEnum | MessageRevisionScalarFieldEnum[]
  }

  /**
   * MessageRevision findFirstOrThrow
   */
  export type MessageRevisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter, which MessageRevision to fetch.
     */
    where?: MessageRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRevisions to fetch.
     */
    orderBy?: MessageRevisionOrderByWithRelationInput | MessageRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageRevisions.
     */
    cursor?: MessageRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageRevisions.
     */
    distinct?: MessageRevisionScalarFieldEnum | MessageRevisionScalarFieldEnum[]
  }

  /**
   * MessageRevision findMany
   */
  export type MessageRevisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter, which MessageRevisions to fetch.
     */
    where?: MessageRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRevisions to fetch.
     */
    orderBy?: MessageRevisionOrderByWithRelationInput | MessageRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageRevisions.
     */
    cursor?: MessageRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRevisions.
     */
    skip?: number
    distinct?: MessageRevisionScalarFieldEnum | MessageRevisionScalarFieldEnum[]
  }

  /**
   * MessageRevision create
   */
  export type MessageRevisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageRevision.
     */
    data: XOR<MessageRevisionCreateInput, MessageRevisionUncheckedCreateInput>
  }

  /**
   * MessageRevision createMany
   */
  export type MessageRevisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageRevisions.
     */
    data: MessageRevisionCreateManyInput | MessageRevisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageRevision createManyAndReturn
   */
  export type MessageRevisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * The data used to create many MessageRevisions.
     */
    data: MessageRevisionCreateManyInput | MessageRevisionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageRevision update
   */
  export type MessageRevisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageRevision.
     */
    data: XOR<MessageRevisionUpdateInput, MessageRevisionUncheckedUpdateInput>
    /**
     * Choose, which MessageRevision to update.
     */
    where: MessageRevisionWhereUniqueInput
  }

  /**
   * MessageRevision updateMany
   */
  export type MessageRevisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageRevisions.
     */
    data: XOR<MessageRevisionUpdateManyMutationInput, MessageRevisionUncheckedUpdateManyInput>
    /**
     * Filter which MessageRevisions to update
     */
    where?: MessageRevisionWhereInput
    /**
     * Limit how many MessageRevisions to update.
     */
    limit?: number
  }

  /**
   * MessageRevision updateManyAndReturn
   */
  export type MessageRevisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * The data used to update MessageRevisions.
     */
    data: XOR<MessageRevisionUpdateManyMutationInput, MessageRevisionUncheckedUpdateManyInput>
    /**
     * Filter which MessageRevisions to update
     */
    where?: MessageRevisionWhereInput
    /**
     * Limit how many MessageRevisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageRevision upsert
   */
  export type MessageRevisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageRevision to update in case it exists.
     */
    where: MessageRevisionWhereUniqueInput
    /**
     * In case the MessageRevision found by the `where` argument doesn't exist, create a new MessageRevision with this data.
     */
    create: XOR<MessageRevisionCreateInput, MessageRevisionUncheckedCreateInput>
    /**
     * In case the MessageRevision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageRevisionUpdateInput, MessageRevisionUncheckedUpdateInput>
  }

  /**
   * MessageRevision delete
   */
  export type MessageRevisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
    /**
     * Filter which MessageRevision to delete.
     */
    where: MessageRevisionWhereUniqueInput
  }

  /**
   * MessageRevision deleteMany
   */
  export type MessageRevisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageRevisions to delete
     */
    where?: MessageRevisionWhereInput
    /**
     * Limit how many MessageRevisions to delete.
     */
    limit?: number
  }

  /**
   * MessageRevision without action
   */
  export type MessageRevisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRevision
     */
    select?: MessageRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageRevision
     */
    omit?: MessageRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRevisionInclude<ExtArgs> | null
  }


  /**
   * Model ReadReceipt
   */

  export type AggregateReadReceipt = {
    _count: ReadReceiptCountAggregateOutputType | null
    _min: ReadReceiptMinAggregateOutputType | null
    _max: ReadReceiptMaxAggregateOutputType | null
  }

  export type ReadReceiptMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    lastReadMessageId: string | null
    updatedAt: Date | null
  }

  export type ReadReceiptMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    lastReadMessageId: string | null
    updatedAt: Date | null
  }

  export type ReadReceiptCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    lastReadMessageId: number
    updatedAt: number
    _all: number
  }


  export type ReadReceiptMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastReadMessageId?: true
    updatedAt?: true
  }

  export type ReadReceiptMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastReadMessageId?: true
    updatedAt?: true
  }

  export type ReadReceiptCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastReadMessageId?: true
    updatedAt?: true
    _all?: true
  }

  export type ReadReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadReceipt to aggregate.
     */
    where?: ReadReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadReceipts to fetch.
     */
    orderBy?: ReadReceiptOrderByWithRelationInput | ReadReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReadReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReadReceipts
    **/
    _count?: true | ReadReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReadReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReadReceiptMaxAggregateInputType
  }

  export type GetReadReceiptAggregateType<T extends ReadReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateReadReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReadReceipt[P]>
      : GetScalarType<T[P], AggregateReadReceipt[P]>
  }




  export type ReadReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReadReceiptWhereInput
    orderBy?: ReadReceiptOrderByWithAggregationInput | ReadReceiptOrderByWithAggregationInput[]
    by: ReadReceiptScalarFieldEnum[] | ReadReceiptScalarFieldEnum
    having?: ReadReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReadReceiptCountAggregateInputType | true
    _min?: ReadReceiptMinAggregateInputType
    _max?: ReadReceiptMaxAggregateInputType
  }

  export type ReadReceiptGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    lastReadMessageId: string
    updatedAt: Date
    _count: ReadReceiptCountAggregateOutputType | null
    _min: ReadReceiptMinAggregateOutputType | null
    _max: ReadReceiptMaxAggregateOutputType | null
  }

  type GetReadReceiptGroupByPayload<T extends ReadReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReadReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReadReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReadReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], ReadReceiptGroupByOutputType[P]>
        }
      >
    >


  export type ReadReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastReadMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["readReceipt"]>

  export type ReadReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastReadMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["readReceipt"]>

  export type ReadReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastReadMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["readReceipt"]>

  export type ReadReceiptSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastReadMessageId?: boolean
    updatedAt?: boolean
  }

  export type ReadReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "lastReadMessageId" | "updatedAt", ExtArgs["result"]["readReceipt"]>

  export type $ReadReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReadReceipt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      lastReadMessageId: string
      updatedAt: Date
    }, ExtArgs["result"]["readReceipt"]>
    composites: {}
  }

  type ReadReceiptGetPayload<S extends boolean | null | undefined | ReadReceiptDefaultArgs> = $Result.GetResult<Prisma.$ReadReceiptPayload, S>

  type ReadReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReadReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReadReceiptCountAggregateInputType | true
    }

  export interface ReadReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReadReceipt'], meta: { name: 'ReadReceipt' } }
    /**
     * Find zero or one ReadReceipt that matches the filter.
     * @param {ReadReceiptFindUniqueArgs} args - Arguments to find a ReadReceipt
     * @example
     * // Get one ReadReceipt
     * const readReceipt = await prisma.readReceipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReadReceiptFindUniqueArgs>(args: SelectSubset<T, ReadReceiptFindUniqueArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReadReceipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReadReceiptFindUniqueOrThrowArgs} args - Arguments to find a ReadReceipt
     * @example
     * // Get one ReadReceipt
     * const readReceipt = await prisma.readReceipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReadReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReadReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadReceipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptFindFirstArgs} args - Arguments to find a ReadReceipt
     * @example
     * // Get one ReadReceipt
     * const readReceipt = await prisma.readReceipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReadReceiptFindFirstArgs>(args?: SelectSubset<T, ReadReceiptFindFirstArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReadReceipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptFindFirstOrThrowArgs} args - Arguments to find a ReadReceipt
     * @example
     * // Get one ReadReceipt
     * const readReceipt = await prisma.readReceipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReadReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReadReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReadReceipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReadReceipts
     * const readReceipts = await prisma.readReceipt.findMany()
     * 
     * // Get first 10 ReadReceipts
     * const readReceipts = await prisma.readReceipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const readReceiptWithIdOnly = await prisma.readReceipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReadReceiptFindManyArgs>(args?: SelectSubset<T, ReadReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReadReceipt.
     * @param {ReadReceiptCreateArgs} args - Arguments to create a ReadReceipt.
     * @example
     * // Create one ReadReceipt
     * const ReadReceipt = await prisma.readReceipt.create({
     *   data: {
     *     // ... data to create a ReadReceipt
     *   }
     * })
     * 
     */
    create<T extends ReadReceiptCreateArgs>(args: SelectSubset<T, ReadReceiptCreateArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReadReceipts.
     * @param {ReadReceiptCreateManyArgs} args - Arguments to create many ReadReceipts.
     * @example
     * // Create many ReadReceipts
     * const readReceipt = await prisma.readReceipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReadReceiptCreateManyArgs>(args?: SelectSubset<T, ReadReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReadReceipts and returns the data saved in the database.
     * @param {ReadReceiptCreateManyAndReturnArgs} args - Arguments to create many ReadReceipts.
     * @example
     * // Create many ReadReceipts
     * const readReceipt = await prisma.readReceipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReadReceipts and only return the `id`
     * const readReceiptWithIdOnly = await prisma.readReceipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReadReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReadReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReadReceipt.
     * @param {ReadReceiptDeleteArgs} args - Arguments to delete one ReadReceipt.
     * @example
     * // Delete one ReadReceipt
     * const ReadReceipt = await prisma.readReceipt.delete({
     *   where: {
     *     // ... filter to delete one ReadReceipt
     *   }
     * })
     * 
     */
    delete<T extends ReadReceiptDeleteArgs>(args: SelectSubset<T, ReadReceiptDeleteArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReadReceipt.
     * @param {ReadReceiptUpdateArgs} args - Arguments to update one ReadReceipt.
     * @example
     * // Update one ReadReceipt
     * const readReceipt = await prisma.readReceipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReadReceiptUpdateArgs>(args: SelectSubset<T, ReadReceiptUpdateArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReadReceipts.
     * @param {ReadReceiptDeleteManyArgs} args - Arguments to filter ReadReceipts to delete.
     * @example
     * // Delete a few ReadReceipts
     * const { count } = await prisma.readReceipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReadReceiptDeleteManyArgs>(args?: SelectSubset<T, ReadReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReadReceipts
     * const readReceipt = await prisma.readReceipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReadReceiptUpdateManyArgs>(args: SelectSubset<T, ReadReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReadReceipts and returns the data updated in the database.
     * @param {ReadReceiptUpdateManyAndReturnArgs} args - Arguments to update many ReadReceipts.
     * @example
     * // Update many ReadReceipts
     * const readReceipt = await prisma.readReceipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReadReceipts and only return the `id`
     * const readReceiptWithIdOnly = await prisma.readReceipt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReadReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReadReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReadReceipt.
     * @param {ReadReceiptUpsertArgs} args - Arguments to update or create a ReadReceipt.
     * @example
     * // Update or create a ReadReceipt
     * const readReceipt = await prisma.readReceipt.upsert({
     *   create: {
     *     // ... data to create a ReadReceipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReadReceipt we want to update
     *   }
     * })
     */
    upsert<T extends ReadReceiptUpsertArgs>(args: SelectSubset<T, ReadReceiptUpsertArgs<ExtArgs>>): Prisma__ReadReceiptClient<$Result.GetResult<Prisma.$ReadReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReadReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptCountArgs} args - Arguments to filter ReadReceipts to count.
     * @example
     * // Count the number of ReadReceipts
     * const count = await prisma.readReceipt.count({
     *   where: {
     *     // ... the filter for the ReadReceipts we want to count
     *   }
     * })
    **/
    count<T extends ReadReceiptCountArgs>(
      args?: Subset<T, ReadReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReadReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReadReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReadReceiptAggregateArgs>(args: Subset<T, ReadReceiptAggregateArgs>): Prisma.PrismaPromise<GetReadReceiptAggregateType<T>>

    /**
     * Group by ReadReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReadReceiptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReadReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReadReceiptGroupByArgs['orderBy'] }
        : { orderBy?: ReadReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReadReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReadReceipt model
   */
  readonly fields: ReadReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReadReceipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReadReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReadReceipt model
   */
  interface ReadReceiptFieldRefs {
    readonly id: FieldRef<"ReadReceipt", 'String'>
    readonly chatId: FieldRef<"ReadReceipt", 'String'>
    readonly userId: FieldRef<"ReadReceipt", 'String'>
    readonly lastReadMessageId: FieldRef<"ReadReceipt", 'String'>
    readonly updatedAt: FieldRef<"ReadReceipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReadReceipt findUnique
   */
  export type ReadReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter, which ReadReceipt to fetch.
     */
    where: ReadReceiptWhereUniqueInput
  }

  /**
   * ReadReceipt findUniqueOrThrow
   */
  export type ReadReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter, which ReadReceipt to fetch.
     */
    where: ReadReceiptWhereUniqueInput
  }

  /**
   * ReadReceipt findFirst
   */
  export type ReadReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter, which ReadReceipt to fetch.
     */
    where?: ReadReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadReceipts to fetch.
     */
    orderBy?: ReadReceiptOrderByWithRelationInput | ReadReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadReceipts.
     */
    cursor?: ReadReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadReceipts.
     */
    distinct?: ReadReceiptScalarFieldEnum | ReadReceiptScalarFieldEnum[]
  }

  /**
   * ReadReceipt findFirstOrThrow
   */
  export type ReadReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter, which ReadReceipt to fetch.
     */
    where?: ReadReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadReceipts to fetch.
     */
    orderBy?: ReadReceiptOrderByWithRelationInput | ReadReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReadReceipts.
     */
    cursor?: ReadReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReadReceipts.
     */
    distinct?: ReadReceiptScalarFieldEnum | ReadReceiptScalarFieldEnum[]
  }

  /**
   * ReadReceipt findMany
   */
  export type ReadReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter, which ReadReceipts to fetch.
     */
    where?: ReadReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReadReceipts to fetch.
     */
    orderBy?: ReadReceiptOrderByWithRelationInput | ReadReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReadReceipts.
     */
    cursor?: ReadReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReadReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReadReceipts.
     */
    skip?: number
    distinct?: ReadReceiptScalarFieldEnum | ReadReceiptScalarFieldEnum[]
  }

  /**
   * ReadReceipt create
   */
  export type ReadReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * The data needed to create a ReadReceipt.
     */
    data: XOR<ReadReceiptCreateInput, ReadReceiptUncheckedCreateInput>
  }

  /**
   * ReadReceipt createMany
   */
  export type ReadReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReadReceipts.
     */
    data: ReadReceiptCreateManyInput | ReadReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadReceipt createManyAndReturn
   */
  export type ReadReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many ReadReceipts.
     */
    data: ReadReceiptCreateManyInput | ReadReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReadReceipt update
   */
  export type ReadReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * The data needed to update a ReadReceipt.
     */
    data: XOR<ReadReceiptUpdateInput, ReadReceiptUncheckedUpdateInput>
    /**
     * Choose, which ReadReceipt to update.
     */
    where: ReadReceiptWhereUniqueInput
  }

  /**
   * ReadReceipt updateMany
   */
  export type ReadReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReadReceipts.
     */
    data: XOR<ReadReceiptUpdateManyMutationInput, ReadReceiptUncheckedUpdateManyInput>
    /**
     * Filter which ReadReceipts to update
     */
    where?: ReadReceiptWhereInput
    /**
     * Limit how many ReadReceipts to update.
     */
    limit?: number
  }

  /**
   * ReadReceipt updateManyAndReturn
   */
  export type ReadReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * The data used to update ReadReceipts.
     */
    data: XOR<ReadReceiptUpdateManyMutationInput, ReadReceiptUncheckedUpdateManyInput>
    /**
     * Filter which ReadReceipts to update
     */
    where?: ReadReceiptWhereInput
    /**
     * Limit how many ReadReceipts to update.
     */
    limit?: number
  }

  /**
   * ReadReceipt upsert
   */
  export type ReadReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * The filter to search for the ReadReceipt to update in case it exists.
     */
    where: ReadReceiptWhereUniqueInput
    /**
     * In case the ReadReceipt found by the `where` argument doesn't exist, create a new ReadReceipt with this data.
     */
    create: XOR<ReadReceiptCreateInput, ReadReceiptUncheckedCreateInput>
    /**
     * In case the ReadReceipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReadReceiptUpdateInput, ReadReceiptUncheckedUpdateInput>
  }

  /**
   * ReadReceipt delete
   */
  export type ReadReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
    /**
     * Filter which ReadReceipt to delete.
     */
    where: ReadReceiptWhereUniqueInput
  }

  /**
   * ReadReceipt deleteMany
   */
  export type ReadReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReadReceipts to delete
     */
    where?: ReadReceiptWhereInput
    /**
     * Limit how many ReadReceipts to delete.
     */
    limit?: number
  }

  /**
   * ReadReceipt without action
   */
  export type ReadReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReadReceipt
     */
    select?: ReadReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReadReceipt
     */
    omit?: ReadReceiptOmit<ExtArgs> | null
  }


  /**
   * Model DeliveryReceipt
   */

  export type AggregateDeliveryReceipt = {
    _count: DeliveryReceiptCountAggregateOutputType | null
    _min: DeliveryReceiptMinAggregateOutputType | null
    _max: DeliveryReceiptMaxAggregateOutputType | null
  }

  export type DeliveryReceiptMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    lastDeliveredMessageId: string | null
    updatedAt: Date | null
  }

  export type DeliveryReceiptMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    lastDeliveredMessageId: string | null
    updatedAt: Date | null
  }

  export type DeliveryReceiptCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    lastDeliveredMessageId: number
    updatedAt: number
    _all: number
  }


  export type DeliveryReceiptMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastDeliveredMessageId?: true
    updatedAt?: true
  }

  export type DeliveryReceiptMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastDeliveredMessageId?: true
    updatedAt?: true
  }

  export type DeliveryReceiptCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    lastDeliveredMessageId?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryReceipt to aggregate.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryReceipts
    **/
    _count?: true | DeliveryReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryReceiptMaxAggregateInputType
  }

  export type GetDeliveryReceiptAggregateType<T extends DeliveryReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryReceipt[P]>
      : GetScalarType<T[P], AggregateDeliveryReceipt[P]>
  }




  export type DeliveryReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryReceiptWhereInput
    orderBy?: DeliveryReceiptOrderByWithAggregationInput | DeliveryReceiptOrderByWithAggregationInput[]
    by: DeliveryReceiptScalarFieldEnum[] | DeliveryReceiptScalarFieldEnum
    having?: DeliveryReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryReceiptCountAggregateInputType | true
    _min?: DeliveryReceiptMinAggregateInputType
    _max?: DeliveryReceiptMaxAggregateInputType
  }

  export type DeliveryReceiptGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    lastDeliveredMessageId: string
    updatedAt: Date
    _count: DeliveryReceiptCountAggregateOutputType | null
    _min: DeliveryReceiptMinAggregateOutputType | null
    _max: DeliveryReceiptMaxAggregateOutputType | null
  }

  type GetDeliveryReceiptGroupByPayload<T extends DeliveryReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryReceiptGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastDeliveredMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastDeliveredMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastDeliveredMessageId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryReceipt"]>

  export type DeliveryReceiptSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    lastDeliveredMessageId?: boolean
    updatedAt?: boolean
  }

  export type DeliveryReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "lastDeliveredMessageId" | "updatedAt", ExtArgs["result"]["deliveryReceipt"]>

  export type $DeliveryReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryReceipt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      lastDeliveredMessageId: string
      updatedAt: Date
    }, ExtArgs["result"]["deliveryReceipt"]>
    composites: {}
  }

  type DeliveryReceiptGetPayload<S extends boolean | null | undefined | DeliveryReceiptDefaultArgs> = $Result.GetResult<Prisma.$DeliveryReceiptPayload, S>

  type DeliveryReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryReceiptCountAggregateInputType | true
    }

  export interface DeliveryReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryReceipt'], meta: { name: 'DeliveryReceipt' } }
    /**
     * Find zero or one DeliveryReceipt that matches the filter.
     * @param {DeliveryReceiptFindUniqueArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryReceiptFindUniqueArgs>(args: SelectSubset<T, DeliveryReceiptFindUniqueArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryReceipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryReceiptFindUniqueOrThrowArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryReceipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindFirstArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryReceiptFindFirstArgs>(args?: SelectSubset<T, DeliveryReceiptFindFirstArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryReceipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindFirstOrThrowArgs} args - Arguments to find a DeliveryReceipt
     * @example
     * // Get one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryReceipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryReceipts
     * const deliveryReceipts = await prisma.deliveryReceipt.findMany()
     * 
     * // Get first 10 DeliveryReceipts
     * const deliveryReceipts = await prisma.deliveryReceipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryReceiptFindManyArgs>(args?: SelectSubset<T, DeliveryReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryReceipt.
     * @param {DeliveryReceiptCreateArgs} args - Arguments to create a DeliveryReceipt.
     * @example
     * // Create one DeliveryReceipt
     * const DeliveryReceipt = await prisma.deliveryReceipt.create({
     *   data: {
     *     // ... data to create a DeliveryReceipt
     *   }
     * })
     * 
     */
    create<T extends DeliveryReceiptCreateArgs>(args: SelectSubset<T, DeliveryReceiptCreateArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryReceipts.
     * @param {DeliveryReceiptCreateManyArgs} args - Arguments to create many DeliveryReceipts.
     * @example
     * // Create many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryReceiptCreateManyArgs>(args?: SelectSubset<T, DeliveryReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryReceipts and returns the data saved in the database.
     * @param {DeliveryReceiptCreateManyAndReturnArgs} args - Arguments to create many DeliveryReceipts.
     * @example
     * // Create many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryReceipts and only return the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryReceipt.
     * @param {DeliveryReceiptDeleteArgs} args - Arguments to delete one DeliveryReceipt.
     * @example
     * // Delete one DeliveryReceipt
     * const DeliveryReceipt = await prisma.deliveryReceipt.delete({
     *   where: {
     *     // ... filter to delete one DeliveryReceipt
     *   }
     * })
     * 
     */
    delete<T extends DeliveryReceiptDeleteArgs>(args: SelectSubset<T, DeliveryReceiptDeleteArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryReceipt.
     * @param {DeliveryReceiptUpdateArgs} args - Arguments to update one DeliveryReceipt.
     * @example
     * // Update one DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryReceiptUpdateArgs>(args: SelectSubset<T, DeliveryReceiptUpdateArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryReceipts.
     * @param {DeliveryReceiptDeleteManyArgs} args - Arguments to filter DeliveryReceipts to delete.
     * @example
     * // Delete a few DeliveryReceipts
     * const { count } = await prisma.deliveryReceipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryReceiptDeleteManyArgs>(args?: SelectSubset<T, DeliveryReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryReceiptUpdateManyArgs>(args: SelectSubset<T, DeliveryReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryReceipts and returns the data updated in the database.
     * @param {DeliveryReceiptUpdateManyAndReturnArgs} args - Arguments to update many DeliveryReceipts.
     * @example
     * // Update many DeliveryReceipts
     * const deliveryReceipt = await prisma.deliveryReceipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryReceipts and only return the `id`
     * const deliveryReceiptWithIdOnly = await prisma.deliveryReceipt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryReceipt.
     * @param {DeliveryReceiptUpsertArgs} args - Arguments to update or create a DeliveryReceipt.
     * @example
     * // Update or create a DeliveryReceipt
     * const deliveryReceipt = await prisma.deliveryReceipt.upsert({
     *   create: {
     *     // ... data to create a DeliveryReceipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryReceipt we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryReceiptUpsertArgs>(args: SelectSubset<T, DeliveryReceiptUpsertArgs<ExtArgs>>): Prisma__DeliveryReceiptClient<$Result.GetResult<Prisma.$DeliveryReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryReceipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptCountArgs} args - Arguments to filter DeliveryReceipts to count.
     * @example
     * // Count the number of DeliveryReceipts
     * const count = await prisma.deliveryReceipt.count({
     *   where: {
     *     // ... the filter for the DeliveryReceipts we want to count
     *   }
     * })
    **/
    count<T extends DeliveryReceiptCountArgs>(
      args?: Subset<T, DeliveryReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryReceiptAggregateArgs>(args: Subset<T, DeliveryReceiptAggregateArgs>): Prisma.PrismaPromise<GetDeliveryReceiptAggregateType<T>>

    /**
     * Group by DeliveryReceipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryReceiptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryReceiptGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryReceipt model
   */
  readonly fields: DeliveryReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryReceipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeliveryReceipt model
   */
  interface DeliveryReceiptFieldRefs {
    readonly id: FieldRef<"DeliveryReceipt", 'String'>
    readonly chatId: FieldRef<"DeliveryReceipt", 'String'>
    readonly userId: FieldRef<"DeliveryReceipt", 'String'>
    readonly lastDeliveredMessageId: FieldRef<"DeliveryReceipt", 'String'>
    readonly updatedAt: FieldRef<"DeliveryReceipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryReceipt findUnique
   */
  export type DeliveryReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt findUniqueOrThrow
   */
  export type DeliveryReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt findFirst
   */
  export type DeliveryReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryReceipts.
     */
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt findFirstOrThrow
   */
  export type DeliveryReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipt to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryReceipts.
     */
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt findMany
   */
  export type DeliveryReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryReceipts to fetch.
     */
    where?: DeliveryReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryReceipts to fetch.
     */
    orderBy?: DeliveryReceiptOrderByWithRelationInput | DeliveryReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryReceipts.
     */
    cursor?: DeliveryReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryReceipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryReceipts.
     */
    skip?: number
    distinct?: DeliveryReceiptScalarFieldEnum | DeliveryReceiptScalarFieldEnum[]
  }

  /**
   * DeliveryReceipt create
   */
  export type DeliveryReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data needed to create a DeliveryReceipt.
     */
    data: XOR<DeliveryReceiptCreateInput, DeliveryReceiptUncheckedCreateInput>
  }

  /**
   * DeliveryReceipt createMany
   */
  export type DeliveryReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryReceipts.
     */
    data: DeliveryReceiptCreateManyInput | DeliveryReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryReceipt createManyAndReturn
   */
  export type DeliveryReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryReceipts.
     */
    data: DeliveryReceiptCreateManyInput | DeliveryReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryReceipt update
   */
  export type DeliveryReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data needed to update a DeliveryReceipt.
     */
    data: XOR<DeliveryReceiptUpdateInput, DeliveryReceiptUncheckedUpdateInput>
    /**
     * Choose, which DeliveryReceipt to update.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt updateMany
   */
  export type DeliveryReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryReceipts.
     */
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryReceipts to update
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to update.
     */
    limit?: number
  }

  /**
   * DeliveryReceipt updateManyAndReturn
   */
  export type DeliveryReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryReceipts.
     */
    data: XOR<DeliveryReceiptUpdateManyMutationInput, DeliveryReceiptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryReceipts to update
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to update.
     */
    limit?: number
  }

  /**
   * DeliveryReceipt upsert
   */
  export type DeliveryReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * The filter to search for the DeliveryReceipt to update in case it exists.
     */
    where: DeliveryReceiptWhereUniqueInput
    /**
     * In case the DeliveryReceipt found by the `where` argument doesn't exist, create a new DeliveryReceipt with this data.
     */
    create: XOR<DeliveryReceiptCreateInput, DeliveryReceiptUncheckedCreateInput>
    /**
     * In case the DeliveryReceipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryReceiptUpdateInput, DeliveryReceiptUncheckedUpdateInput>
  }

  /**
   * DeliveryReceipt delete
   */
  export type DeliveryReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
    /**
     * Filter which DeliveryReceipt to delete.
     */
    where: DeliveryReceiptWhereUniqueInput
  }

  /**
   * DeliveryReceipt deleteMany
   */
  export type DeliveryReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryReceipts to delete
     */
    where?: DeliveryReceiptWhereInput
    /**
     * Limit how many DeliveryReceipts to delete.
     */
    limit?: number
  }

  /**
   * DeliveryReceipt without action
   */
  export type DeliveryReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryReceipt
     */
    select?: DeliveryReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryReceipt
     */
    omit?: DeliveryReceiptOmit<ExtArgs> | null
  }


  /**
   * Model ChatMessageCounter
   */

  export type AggregateChatMessageCounter = {
    _count: ChatMessageCounterCountAggregateOutputType | null
    _avg: ChatMessageCounterAvgAggregateOutputType | null
    _sum: ChatMessageCounterSumAggregateOutputType | null
    _min: ChatMessageCounterMinAggregateOutputType | null
    _max: ChatMessageCounterMaxAggregateOutputType | null
  }

  export type ChatMessageCounterAvgAggregateOutputType = {
    unreadCount: number | null
  }

  export type ChatMessageCounterSumAggregateOutputType = {
    unreadCount: number | null
  }

  export type ChatMessageCounterMinAggregateOutputType = {
    chatId: string | null
    userId: string | null
    lastMessageId: string | null
    unreadCount: number | null
    updatedAt: Date | null
  }

  export type ChatMessageCounterMaxAggregateOutputType = {
    chatId: string | null
    userId: string | null
    lastMessageId: string | null
    unreadCount: number | null
    updatedAt: Date | null
  }

  export type ChatMessageCounterCountAggregateOutputType = {
    chatId: number
    userId: number
    lastMessageId: number
    unreadCount: number
    updatedAt: number
    _all: number
  }


  export type ChatMessageCounterAvgAggregateInputType = {
    unreadCount?: true
  }

  export type ChatMessageCounterSumAggregateInputType = {
    unreadCount?: true
  }

  export type ChatMessageCounterMinAggregateInputType = {
    chatId?: true
    userId?: true
    lastMessageId?: true
    unreadCount?: true
    updatedAt?: true
  }

  export type ChatMessageCounterMaxAggregateInputType = {
    chatId?: true
    userId?: true
    lastMessageId?: true
    unreadCount?: true
    updatedAt?: true
  }

  export type ChatMessageCounterCountAggregateInputType = {
    chatId?: true
    userId?: true
    lastMessageId?: true
    unreadCount?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMessageCounterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessageCounter to aggregate.
     */
    where?: ChatMessageCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessageCounters to fetch.
     */
    orderBy?: ChatMessageCounterOrderByWithRelationInput | ChatMessageCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessageCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessageCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessageCounters
    **/
    _count?: true | ChatMessageCounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatMessageCounterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatMessageCounterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageCounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageCounterMaxAggregateInputType
  }

  export type GetChatMessageCounterAggregateType<T extends ChatMessageCounterAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessageCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessageCounter[P]>
      : GetScalarType<T[P], AggregateChatMessageCounter[P]>
  }




  export type ChatMessageCounterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageCounterWhereInput
    orderBy?: ChatMessageCounterOrderByWithAggregationInput | ChatMessageCounterOrderByWithAggregationInput[]
    by: ChatMessageCounterScalarFieldEnum[] | ChatMessageCounterScalarFieldEnum
    having?: ChatMessageCounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCounterCountAggregateInputType | true
    _avg?: ChatMessageCounterAvgAggregateInputType
    _sum?: ChatMessageCounterSumAggregateInputType
    _min?: ChatMessageCounterMinAggregateInputType
    _max?: ChatMessageCounterMaxAggregateInputType
  }

  export type ChatMessageCounterGroupByOutputType = {
    chatId: string
    userId: string
    lastMessageId: string | null
    unreadCount: number
    updatedAt: Date
    _count: ChatMessageCounterCountAggregateOutputType | null
    _avg: ChatMessageCounterAvgAggregateOutputType | null
    _sum: ChatMessageCounterSumAggregateOutputType | null
    _min: ChatMessageCounterMinAggregateOutputType | null
    _max: ChatMessageCounterMaxAggregateOutputType | null
  }

  type GetChatMessageCounterGroupByPayload<T extends ChatMessageCounterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageCounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageCounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageCounterGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageCounterGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageCounterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    lastMessageId?: boolean
    unreadCount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessageCounter"]>

  export type ChatMessageCounterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    lastMessageId?: boolean
    unreadCount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessageCounter"]>

  export type ChatMessageCounterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    lastMessageId?: boolean
    unreadCount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessageCounter"]>

  export type ChatMessageCounterSelectScalar = {
    chatId?: boolean
    userId?: boolean
    lastMessageId?: boolean
    unreadCount?: boolean
    updatedAt?: boolean
  }

  export type ChatMessageCounterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "userId" | "lastMessageId" | "unreadCount" | "updatedAt", ExtArgs["result"]["chatMessageCounter"]>

  export type $ChatMessageCounterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessageCounter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      chatId: string
      userId: string
      lastMessageId: string | null
      unreadCount: number
      updatedAt: Date
    }, ExtArgs["result"]["chatMessageCounter"]>
    composites: {}
  }

  type ChatMessageCounterGetPayload<S extends boolean | null | undefined | ChatMessageCounterDefaultArgs> = $Result.GetResult<Prisma.$ChatMessageCounterPayload, S>

  type ChatMessageCounterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCounterCountAggregateInputType | true
    }

  export interface ChatMessageCounterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessageCounter'], meta: { name: 'ChatMessageCounter' } }
    /**
     * Find zero or one ChatMessageCounter that matches the filter.
     * @param {ChatMessageCounterFindUniqueArgs} args - Arguments to find a ChatMessageCounter
     * @example
     * // Get one ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageCounterFindUniqueArgs>(args: SelectSubset<T, ChatMessageCounterFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessageCounter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageCounterFindUniqueOrThrowArgs} args - Arguments to find a ChatMessageCounter
     * @example
     * // Get one ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageCounterFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessageCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterFindFirstArgs} args - Arguments to find a ChatMessageCounter
     * @example
     * // Get one ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageCounterFindFirstArgs>(args?: SelectSubset<T, ChatMessageCounterFindFirstArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessageCounter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterFindFirstOrThrowArgs} args - Arguments to find a ChatMessageCounter
     * @example
     * // Get one ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageCounterFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessageCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessageCounters
     * const chatMessageCounters = await prisma.chatMessageCounter.findMany()
     * 
     * // Get first 10 ChatMessageCounters
     * const chatMessageCounters = await prisma.chatMessageCounter.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const chatMessageCounterWithChatIdOnly = await prisma.chatMessageCounter.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends ChatMessageCounterFindManyArgs>(args?: SelectSubset<T, ChatMessageCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessageCounter.
     * @param {ChatMessageCounterCreateArgs} args - Arguments to create a ChatMessageCounter.
     * @example
     * // Create one ChatMessageCounter
     * const ChatMessageCounter = await prisma.chatMessageCounter.create({
     *   data: {
     *     // ... data to create a ChatMessageCounter
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCounterCreateArgs>(args: SelectSubset<T, ChatMessageCounterCreateArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessageCounters.
     * @param {ChatMessageCounterCreateManyArgs} args - Arguments to create many ChatMessageCounters.
     * @example
     * // Create many ChatMessageCounters
     * const chatMessageCounter = await prisma.chatMessageCounter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCounterCreateManyArgs>(args?: SelectSubset<T, ChatMessageCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMessageCounters and returns the data saved in the database.
     * @param {ChatMessageCounterCreateManyAndReturnArgs} args - Arguments to create many ChatMessageCounters.
     * @example
     * // Create many ChatMessageCounters
     * const chatMessageCounter = await prisma.chatMessageCounter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMessageCounters and only return the `chatId`
     * const chatMessageCounterWithChatIdOnly = await prisma.chatMessageCounter.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMessageCounterCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMessageCounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMessageCounter.
     * @param {ChatMessageCounterDeleteArgs} args - Arguments to delete one ChatMessageCounter.
     * @example
     * // Delete one ChatMessageCounter
     * const ChatMessageCounter = await prisma.chatMessageCounter.delete({
     *   where: {
     *     // ... filter to delete one ChatMessageCounter
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageCounterDeleteArgs>(args: SelectSubset<T, ChatMessageCounterDeleteArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessageCounter.
     * @param {ChatMessageCounterUpdateArgs} args - Arguments to update one ChatMessageCounter.
     * @example
     * // Update one ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageCounterUpdateArgs>(args: SelectSubset<T, ChatMessageCounterUpdateArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessageCounters.
     * @param {ChatMessageCounterDeleteManyArgs} args - Arguments to filter ChatMessageCounters to delete.
     * @example
     * // Delete a few ChatMessageCounters
     * const { count } = await prisma.chatMessageCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageCounterDeleteManyArgs>(args?: SelectSubset<T, ChatMessageCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessageCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessageCounters
     * const chatMessageCounter = await prisma.chatMessageCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageCounterUpdateManyArgs>(args: SelectSubset<T, ChatMessageCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessageCounters and returns the data updated in the database.
     * @param {ChatMessageCounterUpdateManyAndReturnArgs} args - Arguments to update many ChatMessageCounters.
     * @example
     * // Update many ChatMessageCounters
     * const chatMessageCounter = await prisma.chatMessageCounter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMessageCounters and only return the `chatId`
     * const chatMessageCounterWithChatIdOnly = await prisma.chatMessageCounter.updateManyAndReturn({
     *   select: { chatId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatMessageCounterUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMessageCounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMessageCounter.
     * @param {ChatMessageCounterUpsertArgs} args - Arguments to update or create a ChatMessageCounter.
     * @example
     * // Update or create a ChatMessageCounter
     * const chatMessageCounter = await prisma.chatMessageCounter.upsert({
     *   create: {
     *     // ... data to create a ChatMessageCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessageCounter we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageCounterUpsertArgs>(args: SelectSubset<T, ChatMessageCounterUpsertArgs<ExtArgs>>): Prisma__ChatMessageCounterClient<$Result.GetResult<Prisma.$ChatMessageCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMessageCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterCountArgs} args - Arguments to filter ChatMessageCounters to count.
     * @example
     * // Count the number of ChatMessageCounters
     * const count = await prisma.chatMessageCounter.count({
     *   where: {
     *     // ... the filter for the ChatMessageCounters we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCounterCountArgs>(
      args?: Subset<T, ChatMessageCounterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessageCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMessageCounterAggregateArgs>(args: Subset<T, ChatMessageCounterAggregateArgs>): Prisma.PrismaPromise<GetChatMessageCounterAggregateType<T>>

    /**
     * Group by ChatMessageCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMessageCounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageCounterGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageCounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMessageCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessageCounter model
   */
  readonly fields: ChatMessageCounterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessageCounter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageCounterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatMessageCounter model
   */
  interface ChatMessageCounterFieldRefs {
    readonly chatId: FieldRef<"ChatMessageCounter", 'String'>
    readonly userId: FieldRef<"ChatMessageCounter", 'String'>
    readonly lastMessageId: FieldRef<"ChatMessageCounter", 'String'>
    readonly unreadCount: FieldRef<"ChatMessageCounter", 'Int'>
    readonly updatedAt: FieldRef<"ChatMessageCounter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessageCounter findUnique
   */
  export type ChatMessageCounterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessageCounter to fetch.
     */
    where: ChatMessageCounterWhereUniqueInput
  }

  /**
   * ChatMessageCounter findUniqueOrThrow
   */
  export type ChatMessageCounterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessageCounter to fetch.
     */
    where: ChatMessageCounterWhereUniqueInput
  }

  /**
   * ChatMessageCounter findFirst
   */
  export type ChatMessageCounterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessageCounter to fetch.
     */
    where?: ChatMessageCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessageCounters to fetch.
     */
    orderBy?: ChatMessageCounterOrderByWithRelationInput | ChatMessageCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessageCounters.
     */
    cursor?: ChatMessageCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessageCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessageCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessageCounters.
     */
    distinct?: ChatMessageCounterScalarFieldEnum | ChatMessageCounterScalarFieldEnum[]
  }

  /**
   * ChatMessageCounter findFirstOrThrow
   */
  export type ChatMessageCounterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessageCounter to fetch.
     */
    where?: ChatMessageCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessageCounters to fetch.
     */
    orderBy?: ChatMessageCounterOrderByWithRelationInput | ChatMessageCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessageCounters.
     */
    cursor?: ChatMessageCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessageCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessageCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessageCounters.
     */
    distinct?: ChatMessageCounterScalarFieldEnum | ChatMessageCounterScalarFieldEnum[]
  }

  /**
   * ChatMessageCounter findMany
   */
  export type ChatMessageCounterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessageCounters to fetch.
     */
    where?: ChatMessageCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessageCounters to fetch.
     */
    orderBy?: ChatMessageCounterOrderByWithRelationInput | ChatMessageCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessageCounters.
     */
    cursor?: ChatMessageCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessageCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessageCounters.
     */
    skip?: number
    distinct?: ChatMessageCounterScalarFieldEnum | ChatMessageCounterScalarFieldEnum[]
  }

  /**
   * ChatMessageCounter create
   */
  export type ChatMessageCounterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMessageCounter.
     */
    data: XOR<ChatMessageCounterCreateInput, ChatMessageCounterUncheckedCreateInput>
  }

  /**
   * ChatMessageCounter createMany
   */
  export type ChatMessageCounterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessageCounters.
     */
    data: ChatMessageCounterCreateManyInput | ChatMessageCounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMessageCounter createManyAndReturn
   */
  export type ChatMessageCounterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMessageCounters.
     */
    data: ChatMessageCounterCreateManyInput | ChatMessageCounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMessageCounter update
   */
  export type ChatMessageCounterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMessageCounter.
     */
    data: XOR<ChatMessageCounterUpdateInput, ChatMessageCounterUncheckedUpdateInput>
    /**
     * Choose, which ChatMessageCounter to update.
     */
    where: ChatMessageCounterWhereUniqueInput
  }

  /**
   * ChatMessageCounter updateMany
   */
  export type ChatMessageCounterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessageCounters.
     */
    data: XOR<ChatMessageCounterUpdateManyMutationInput, ChatMessageCounterUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessageCounters to update
     */
    where?: ChatMessageCounterWhereInput
    /**
     * Limit how many ChatMessageCounters to update.
     */
    limit?: number
  }

  /**
   * ChatMessageCounter updateManyAndReturn
   */
  export type ChatMessageCounterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * The data used to update ChatMessageCounters.
     */
    data: XOR<ChatMessageCounterUpdateManyMutationInput, ChatMessageCounterUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessageCounters to update
     */
    where?: ChatMessageCounterWhereInput
    /**
     * Limit how many ChatMessageCounters to update.
     */
    limit?: number
  }

  /**
   * ChatMessageCounter upsert
   */
  export type ChatMessageCounterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMessageCounter to update in case it exists.
     */
    where: ChatMessageCounterWhereUniqueInput
    /**
     * In case the ChatMessageCounter found by the `where` argument doesn't exist, create a new ChatMessageCounter with this data.
     */
    create: XOR<ChatMessageCounterCreateInput, ChatMessageCounterUncheckedCreateInput>
    /**
     * In case the ChatMessageCounter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageCounterUpdateInput, ChatMessageCounterUncheckedUpdateInput>
  }

  /**
   * ChatMessageCounter delete
   */
  export type ChatMessageCounterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
    /**
     * Filter which ChatMessageCounter to delete.
     */
    where: ChatMessageCounterWhereUniqueInput
  }

  /**
   * ChatMessageCounter deleteMany
   */
  export type ChatMessageCounterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessageCounters to delete
     */
    where?: ChatMessageCounterWhereInput
    /**
     * Limit how many ChatMessageCounters to delete.
     */
    limit?: number
  }

  /**
   * ChatMessageCounter without action
   */
  export type ChatMessageCounterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageCounter
     */
    select?: ChatMessageCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessageCounter
     */
    omit?: ChatMessageCounterOmit<ExtArgs> | null
  }


  /**
   * Model ChatSummaryProjection
   */

  export type AggregateChatSummaryProjection = {
    _count: ChatSummaryProjectionCountAggregateOutputType | null
    _min: ChatSummaryProjectionMinAggregateOutputType | null
    _max: ChatSummaryProjectionMaxAggregateOutputType | null
  }

  export type ChatSummaryProjectionMinAggregateOutputType = {
    chatId: string | null
    lastMessageId: string | null
    lastMessagePreview: string | null
    lastActivityAt: Date | null
    lastSenderUserId: string | null
    updatedAt: Date | null
  }

  export type ChatSummaryProjectionMaxAggregateOutputType = {
    chatId: string | null
    lastMessageId: string | null
    lastMessagePreview: string | null
    lastActivityAt: Date | null
    lastSenderUserId: string | null
    updatedAt: Date | null
  }

  export type ChatSummaryProjectionCountAggregateOutputType = {
    chatId: number
    lastMessageId: number
    lastMessagePreview: number
    lastActivityAt: number
    lastSenderUserId: number
    updatedAt: number
    _all: number
  }


  export type ChatSummaryProjectionMinAggregateInputType = {
    chatId?: true
    lastMessageId?: true
    lastMessagePreview?: true
    lastActivityAt?: true
    lastSenderUserId?: true
    updatedAt?: true
  }

  export type ChatSummaryProjectionMaxAggregateInputType = {
    chatId?: true
    lastMessageId?: true
    lastMessagePreview?: true
    lastActivityAt?: true
    lastSenderUserId?: true
    updatedAt?: true
  }

  export type ChatSummaryProjectionCountAggregateInputType = {
    chatId?: true
    lastMessageId?: true
    lastMessagePreview?: true
    lastActivityAt?: true
    lastSenderUserId?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatSummaryProjectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjection to aggregate.
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjections to fetch.
     */
    orderBy?: ChatSummaryProjectionOrderByWithRelationInput | ChatSummaryProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatSummaryProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatSummaryProjections
    **/
    _count?: true | ChatSummaryProjectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatSummaryProjectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatSummaryProjectionMaxAggregateInputType
  }

  export type GetChatSummaryProjectionAggregateType<T extends ChatSummaryProjectionAggregateArgs> = {
        [P in keyof T & keyof AggregateChatSummaryProjection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatSummaryProjection[P]>
      : GetScalarType<T[P], AggregateChatSummaryProjection[P]>
  }




  export type ChatSummaryProjectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatSummaryProjectionWhereInput
    orderBy?: ChatSummaryProjectionOrderByWithAggregationInput | ChatSummaryProjectionOrderByWithAggregationInput[]
    by: ChatSummaryProjectionScalarFieldEnum[] | ChatSummaryProjectionScalarFieldEnum
    having?: ChatSummaryProjectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatSummaryProjectionCountAggregateInputType | true
    _min?: ChatSummaryProjectionMinAggregateInputType
    _max?: ChatSummaryProjectionMaxAggregateInputType
  }

  export type ChatSummaryProjectionGroupByOutputType = {
    chatId: string
    lastMessageId: string | null
    lastMessagePreview: string | null
    lastActivityAt: Date | null
    lastSenderUserId: string | null
    updatedAt: Date
    _count: ChatSummaryProjectionCountAggregateOutputType | null
    _min: ChatSummaryProjectionMinAggregateOutputType | null
    _max: ChatSummaryProjectionMaxAggregateOutputType | null
  }

  type GetChatSummaryProjectionGroupByPayload<T extends ChatSummaryProjectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatSummaryProjectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatSummaryProjectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatSummaryProjectionGroupByOutputType[P]>
            : GetScalarType<T[P], ChatSummaryProjectionGroupByOutputType[P]>
        }
      >
    >


  export type ChatSummaryProjectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    lastMessageId?: boolean
    lastMessagePreview?: boolean
    lastActivityAt?: boolean
    lastSenderUserId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjection"]>

  export type ChatSummaryProjectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    lastMessageId?: boolean
    lastMessagePreview?: boolean
    lastActivityAt?: boolean
    lastSenderUserId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjection"]>

  export type ChatSummaryProjectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    lastMessageId?: boolean
    lastMessagePreview?: boolean
    lastActivityAt?: boolean
    lastSenderUserId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjection"]>

  export type ChatSummaryProjectionSelectScalar = {
    chatId?: boolean
    lastMessageId?: boolean
    lastMessagePreview?: boolean
    lastActivityAt?: boolean
    lastSenderUserId?: boolean
    updatedAt?: boolean
  }

  export type ChatSummaryProjectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "lastMessageId" | "lastMessagePreview" | "lastActivityAt" | "lastSenderUserId" | "updatedAt", ExtArgs["result"]["chatSummaryProjection"]>

  export type $ChatSummaryProjectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatSummaryProjection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      chatId: string
      lastMessageId: string | null
      lastMessagePreview: string | null
      lastActivityAt: Date | null
      lastSenderUserId: string | null
      updatedAt: Date
    }, ExtArgs["result"]["chatSummaryProjection"]>
    composites: {}
  }

  type ChatSummaryProjectionGetPayload<S extends boolean | null | undefined | ChatSummaryProjectionDefaultArgs> = $Result.GetResult<Prisma.$ChatSummaryProjectionPayload, S>

  type ChatSummaryProjectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatSummaryProjectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatSummaryProjectionCountAggregateInputType | true
    }

  export interface ChatSummaryProjectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatSummaryProjection'], meta: { name: 'ChatSummaryProjection' } }
    /**
     * Find zero or one ChatSummaryProjection that matches the filter.
     * @param {ChatSummaryProjectionFindUniqueArgs} args - Arguments to find a ChatSummaryProjection
     * @example
     * // Get one ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatSummaryProjectionFindUniqueArgs>(args: SelectSubset<T, ChatSummaryProjectionFindUniqueArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatSummaryProjection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatSummaryProjectionFindUniqueOrThrowArgs} args - Arguments to find a ChatSummaryProjection
     * @example
     * // Get one ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatSummaryProjectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatSummaryProjectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionFindFirstArgs} args - Arguments to find a ChatSummaryProjection
     * @example
     * // Get one ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatSummaryProjectionFindFirstArgs>(args?: SelectSubset<T, ChatSummaryProjectionFindFirstArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionFindFirstOrThrowArgs} args - Arguments to find a ChatSummaryProjection
     * @example
     * // Get one ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatSummaryProjectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatSummaryProjectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatSummaryProjections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatSummaryProjections
     * const chatSummaryProjections = await prisma.chatSummaryProjection.findMany()
     * 
     * // Get first 10 ChatSummaryProjections
     * const chatSummaryProjections = await prisma.chatSummaryProjection.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const chatSummaryProjectionWithChatIdOnly = await prisma.chatSummaryProjection.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends ChatSummaryProjectionFindManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatSummaryProjection.
     * @param {ChatSummaryProjectionCreateArgs} args - Arguments to create a ChatSummaryProjection.
     * @example
     * // Create one ChatSummaryProjection
     * const ChatSummaryProjection = await prisma.chatSummaryProjection.create({
     *   data: {
     *     // ... data to create a ChatSummaryProjection
     *   }
     * })
     * 
     */
    create<T extends ChatSummaryProjectionCreateArgs>(args: SelectSubset<T, ChatSummaryProjectionCreateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatSummaryProjections.
     * @param {ChatSummaryProjectionCreateManyArgs} args - Arguments to create many ChatSummaryProjections.
     * @example
     * // Create many ChatSummaryProjections
     * const chatSummaryProjection = await prisma.chatSummaryProjection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatSummaryProjectionCreateManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatSummaryProjections and returns the data saved in the database.
     * @param {ChatSummaryProjectionCreateManyAndReturnArgs} args - Arguments to create many ChatSummaryProjections.
     * @example
     * // Create many ChatSummaryProjections
     * const chatSummaryProjection = await prisma.chatSummaryProjection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatSummaryProjections and only return the `chatId`
     * const chatSummaryProjectionWithChatIdOnly = await prisma.chatSummaryProjection.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatSummaryProjectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatSummaryProjectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatSummaryProjection.
     * @param {ChatSummaryProjectionDeleteArgs} args - Arguments to delete one ChatSummaryProjection.
     * @example
     * // Delete one ChatSummaryProjection
     * const ChatSummaryProjection = await prisma.chatSummaryProjection.delete({
     *   where: {
     *     // ... filter to delete one ChatSummaryProjection
     *   }
     * })
     * 
     */
    delete<T extends ChatSummaryProjectionDeleteArgs>(args: SelectSubset<T, ChatSummaryProjectionDeleteArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatSummaryProjection.
     * @param {ChatSummaryProjectionUpdateArgs} args - Arguments to update one ChatSummaryProjection.
     * @example
     * // Update one ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatSummaryProjectionUpdateArgs>(args: SelectSubset<T, ChatSummaryProjectionUpdateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatSummaryProjections.
     * @param {ChatSummaryProjectionDeleteManyArgs} args - Arguments to filter ChatSummaryProjections to delete.
     * @example
     * // Delete a few ChatSummaryProjections
     * const { count } = await prisma.chatSummaryProjection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatSummaryProjectionDeleteManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatSummaryProjections
     * const chatSummaryProjection = await prisma.chatSummaryProjection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatSummaryProjectionUpdateManyArgs>(args: SelectSubset<T, ChatSummaryProjectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjections and returns the data updated in the database.
     * @param {ChatSummaryProjectionUpdateManyAndReturnArgs} args - Arguments to update many ChatSummaryProjections.
     * @example
     * // Update many ChatSummaryProjections
     * const chatSummaryProjection = await prisma.chatSummaryProjection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatSummaryProjections and only return the `chatId`
     * const chatSummaryProjectionWithChatIdOnly = await prisma.chatSummaryProjection.updateManyAndReturn({
     *   select: { chatId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatSummaryProjectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatSummaryProjectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatSummaryProjection.
     * @param {ChatSummaryProjectionUpsertArgs} args - Arguments to update or create a ChatSummaryProjection.
     * @example
     * // Update or create a ChatSummaryProjection
     * const chatSummaryProjection = await prisma.chatSummaryProjection.upsert({
     *   create: {
     *     // ... data to create a ChatSummaryProjection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatSummaryProjection we want to update
     *   }
     * })
     */
    upsert<T extends ChatSummaryProjectionUpsertArgs>(args: SelectSubset<T, ChatSummaryProjectionUpsertArgs<ExtArgs>>): Prisma__ChatSummaryProjectionClient<$Result.GetResult<Prisma.$ChatSummaryProjectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatSummaryProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionCountArgs} args - Arguments to filter ChatSummaryProjections to count.
     * @example
     * // Count the number of ChatSummaryProjections
     * const count = await prisma.chatSummaryProjection.count({
     *   where: {
     *     // ... the filter for the ChatSummaryProjections we want to count
     *   }
     * })
    **/
    count<T extends ChatSummaryProjectionCountArgs>(
      args?: Subset<T, ChatSummaryProjectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatSummaryProjectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatSummaryProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatSummaryProjectionAggregateArgs>(args: Subset<T, ChatSummaryProjectionAggregateArgs>): Prisma.PrismaPromise<GetChatSummaryProjectionAggregateType<T>>

    /**
     * Group by ChatSummaryProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatSummaryProjectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatSummaryProjectionGroupByArgs['orderBy'] }
        : { orderBy?: ChatSummaryProjectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatSummaryProjectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatSummaryProjectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatSummaryProjection model
   */
  readonly fields: ChatSummaryProjectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatSummaryProjection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatSummaryProjectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatSummaryProjection model
   */
  interface ChatSummaryProjectionFieldRefs {
    readonly chatId: FieldRef<"ChatSummaryProjection", 'String'>
    readonly lastMessageId: FieldRef<"ChatSummaryProjection", 'String'>
    readonly lastMessagePreview: FieldRef<"ChatSummaryProjection", 'String'>
    readonly lastActivityAt: FieldRef<"ChatSummaryProjection", 'DateTime'>
    readonly lastSenderUserId: FieldRef<"ChatSummaryProjection", 'String'>
    readonly updatedAt: FieldRef<"ChatSummaryProjection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatSummaryProjection findUnique
   */
  export type ChatSummaryProjectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjection to fetch.
     */
    where: ChatSummaryProjectionWhereUniqueInput
  }

  /**
   * ChatSummaryProjection findUniqueOrThrow
   */
  export type ChatSummaryProjectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjection to fetch.
     */
    where: ChatSummaryProjectionWhereUniqueInput
  }

  /**
   * ChatSummaryProjection findFirst
   */
  export type ChatSummaryProjectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjection to fetch.
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjections to fetch.
     */
    orderBy?: ChatSummaryProjectionOrderByWithRelationInput | ChatSummaryProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjections.
     */
    cursor?: ChatSummaryProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjections.
     */
    distinct?: ChatSummaryProjectionScalarFieldEnum | ChatSummaryProjectionScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjection findFirstOrThrow
   */
  export type ChatSummaryProjectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjection to fetch.
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjections to fetch.
     */
    orderBy?: ChatSummaryProjectionOrderByWithRelationInput | ChatSummaryProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjections.
     */
    cursor?: ChatSummaryProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjections.
     */
    distinct?: ChatSummaryProjectionScalarFieldEnum | ChatSummaryProjectionScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjection findMany
   */
  export type ChatSummaryProjectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjections to fetch.
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjections to fetch.
     */
    orderBy?: ChatSummaryProjectionOrderByWithRelationInput | ChatSummaryProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatSummaryProjections.
     */
    cursor?: ChatSummaryProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjections.
     */
    skip?: number
    distinct?: ChatSummaryProjectionScalarFieldEnum | ChatSummaryProjectionScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjection create
   */
  export type ChatSummaryProjectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatSummaryProjection.
     */
    data: XOR<ChatSummaryProjectionCreateInput, ChatSummaryProjectionUncheckedCreateInput>
  }

  /**
   * ChatSummaryProjection createMany
   */
  export type ChatSummaryProjectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatSummaryProjections.
     */
    data: ChatSummaryProjectionCreateManyInput | ChatSummaryProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjection createManyAndReturn
   */
  export type ChatSummaryProjectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * The data used to create many ChatSummaryProjections.
     */
    data: ChatSummaryProjectionCreateManyInput | ChatSummaryProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjection update
   */
  export type ChatSummaryProjectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatSummaryProjection.
     */
    data: XOR<ChatSummaryProjectionUpdateInput, ChatSummaryProjectionUncheckedUpdateInput>
    /**
     * Choose, which ChatSummaryProjection to update.
     */
    where: ChatSummaryProjectionWhereUniqueInput
  }

  /**
   * ChatSummaryProjection updateMany
   */
  export type ChatSummaryProjectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatSummaryProjections.
     */
    data: XOR<ChatSummaryProjectionUpdateManyMutationInput, ChatSummaryProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjections to update
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * Limit how many ChatSummaryProjections to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjection updateManyAndReturn
   */
  export type ChatSummaryProjectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * The data used to update ChatSummaryProjections.
     */
    data: XOR<ChatSummaryProjectionUpdateManyMutationInput, ChatSummaryProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjections to update
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * Limit how many ChatSummaryProjections to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjection upsert
   */
  export type ChatSummaryProjectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatSummaryProjection to update in case it exists.
     */
    where: ChatSummaryProjectionWhereUniqueInput
    /**
     * In case the ChatSummaryProjection found by the `where` argument doesn't exist, create a new ChatSummaryProjection with this data.
     */
    create: XOR<ChatSummaryProjectionCreateInput, ChatSummaryProjectionUncheckedCreateInput>
    /**
     * In case the ChatSummaryProjection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatSummaryProjectionUpdateInput, ChatSummaryProjectionUncheckedUpdateInput>
  }

  /**
   * ChatSummaryProjection delete
   */
  export type ChatSummaryProjectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
    /**
     * Filter which ChatSummaryProjection to delete.
     */
    where: ChatSummaryProjectionWhereUniqueInput
  }

  /**
   * ChatSummaryProjection deleteMany
   */
  export type ChatSummaryProjectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjections to delete
     */
    where?: ChatSummaryProjectionWhereInput
    /**
     * Limit how many ChatSummaryProjections to delete.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjection without action
   */
  export type ChatSummaryProjectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjection
     */
    select?: ChatSummaryProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjection
     */
    omit?: ChatSummaryProjectionOmit<ExtArgs> | null
  }


  /**
   * Model ChatSummaryProjectionEvent
   */

  export type AggregateChatSummaryProjectionEvent = {
    _count: ChatSummaryProjectionEventCountAggregateOutputType | null
    _min: ChatSummaryProjectionEventMinAggregateOutputType | null
    _max: ChatSummaryProjectionEventMaxAggregateOutputType | null
  }

  export type ChatSummaryProjectionEventMinAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    occurredAt: Date | null
    chatId: string | null
  }

  export type ChatSummaryProjectionEventMaxAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    occurredAt: Date | null
    chatId: string | null
  }

  export type ChatSummaryProjectionEventCountAggregateOutputType = {
    eventId: number
    eventType: number
    occurredAt: number
    chatId: number
    _all: number
  }


  export type ChatSummaryProjectionEventMinAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    chatId?: true
  }

  export type ChatSummaryProjectionEventMaxAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    chatId?: true
  }

  export type ChatSummaryProjectionEventCountAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    chatId?: true
    _all?: true
  }

  export type ChatSummaryProjectionEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjectionEvent to aggregate.
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionEvents to fetch.
     */
    orderBy?: ChatSummaryProjectionEventOrderByWithRelationInput | ChatSummaryProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatSummaryProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatSummaryProjectionEvents
    **/
    _count?: true | ChatSummaryProjectionEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatSummaryProjectionEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatSummaryProjectionEventMaxAggregateInputType
  }

  export type GetChatSummaryProjectionEventAggregateType<T extends ChatSummaryProjectionEventAggregateArgs> = {
        [P in keyof T & keyof AggregateChatSummaryProjectionEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatSummaryProjectionEvent[P]>
      : GetScalarType<T[P], AggregateChatSummaryProjectionEvent[P]>
  }




  export type ChatSummaryProjectionEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatSummaryProjectionEventWhereInput
    orderBy?: ChatSummaryProjectionEventOrderByWithAggregationInput | ChatSummaryProjectionEventOrderByWithAggregationInput[]
    by: ChatSummaryProjectionEventScalarFieldEnum[] | ChatSummaryProjectionEventScalarFieldEnum
    having?: ChatSummaryProjectionEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatSummaryProjectionEventCountAggregateInputType | true
    _min?: ChatSummaryProjectionEventMinAggregateInputType
    _max?: ChatSummaryProjectionEventMaxAggregateInputType
  }

  export type ChatSummaryProjectionEventGroupByOutputType = {
    eventId: string
    eventType: string
    occurredAt: Date
    chatId: string | null
    _count: ChatSummaryProjectionEventCountAggregateOutputType | null
    _min: ChatSummaryProjectionEventMinAggregateOutputType | null
    _max: ChatSummaryProjectionEventMaxAggregateOutputType | null
  }

  type GetChatSummaryProjectionEventGroupByPayload<T extends ChatSummaryProjectionEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatSummaryProjectionEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatSummaryProjectionEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatSummaryProjectionEventGroupByOutputType[P]>
            : GetScalarType<T[P], ChatSummaryProjectionEventGroupByOutputType[P]>
        }
      >
    >


  export type ChatSummaryProjectionEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    chatId?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionEvent"]>

  export type ChatSummaryProjectionEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    chatId?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionEvent"]>

  export type ChatSummaryProjectionEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    chatId?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionEvent"]>

  export type ChatSummaryProjectionEventSelectScalar = {
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    chatId?: boolean
  }

  export type ChatSummaryProjectionEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "eventType" | "occurredAt" | "chatId", ExtArgs["result"]["chatSummaryProjectionEvent"]>

  export type $ChatSummaryProjectionEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatSummaryProjectionEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      eventType: string
      occurredAt: Date
      chatId: string | null
    }, ExtArgs["result"]["chatSummaryProjectionEvent"]>
    composites: {}
  }

  type ChatSummaryProjectionEventGetPayload<S extends boolean | null | undefined | ChatSummaryProjectionEventDefaultArgs> = $Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload, S>

  type ChatSummaryProjectionEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatSummaryProjectionEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatSummaryProjectionEventCountAggregateInputType | true
    }

  export interface ChatSummaryProjectionEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatSummaryProjectionEvent'], meta: { name: 'ChatSummaryProjectionEvent' } }
    /**
     * Find zero or one ChatSummaryProjectionEvent that matches the filter.
     * @param {ChatSummaryProjectionEventFindUniqueArgs} args - Arguments to find a ChatSummaryProjectionEvent
     * @example
     * // Get one ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatSummaryProjectionEventFindUniqueArgs>(args: SelectSubset<T, ChatSummaryProjectionEventFindUniqueArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatSummaryProjectionEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatSummaryProjectionEventFindUniqueOrThrowArgs} args - Arguments to find a ChatSummaryProjectionEvent
     * @example
     * // Get one ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatSummaryProjectionEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatSummaryProjectionEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjectionEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventFindFirstArgs} args - Arguments to find a ChatSummaryProjectionEvent
     * @example
     * // Get one ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatSummaryProjectionEventFindFirstArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventFindFirstArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjectionEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventFindFirstOrThrowArgs} args - Arguments to find a ChatSummaryProjectionEvent
     * @example
     * // Get one ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatSummaryProjectionEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatSummaryProjectionEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvents = await prisma.chatSummaryProjectionEvent.findMany()
     * 
     * // Get first 10 ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvents = await prisma.chatSummaryProjectionEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const chatSummaryProjectionEventWithEventIdOnly = await prisma.chatSummaryProjectionEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends ChatSummaryProjectionEventFindManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatSummaryProjectionEvent.
     * @param {ChatSummaryProjectionEventCreateArgs} args - Arguments to create a ChatSummaryProjectionEvent.
     * @example
     * // Create one ChatSummaryProjectionEvent
     * const ChatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.create({
     *   data: {
     *     // ... data to create a ChatSummaryProjectionEvent
     *   }
     * })
     * 
     */
    create<T extends ChatSummaryProjectionEventCreateArgs>(args: SelectSubset<T, ChatSummaryProjectionEventCreateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatSummaryProjectionEvents.
     * @param {ChatSummaryProjectionEventCreateManyArgs} args - Arguments to create many ChatSummaryProjectionEvents.
     * @example
     * // Create many ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatSummaryProjectionEventCreateManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatSummaryProjectionEvents and returns the data saved in the database.
     * @param {ChatSummaryProjectionEventCreateManyAndReturnArgs} args - Arguments to create many ChatSummaryProjectionEvents.
     * @example
     * // Create many ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatSummaryProjectionEvents and only return the `eventId`
     * const chatSummaryProjectionEventWithEventIdOnly = await prisma.chatSummaryProjectionEvent.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatSummaryProjectionEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatSummaryProjectionEvent.
     * @param {ChatSummaryProjectionEventDeleteArgs} args - Arguments to delete one ChatSummaryProjectionEvent.
     * @example
     * // Delete one ChatSummaryProjectionEvent
     * const ChatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.delete({
     *   where: {
     *     // ... filter to delete one ChatSummaryProjectionEvent
     *   }
     * })
     * 
     */
    delete<T extends ChatSummaryProjectionEventDeleteArgs>(args: SelectSubset<T, ChatSummaryProjectionEventDeleteArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatSummaryProjectionEvent.
     * @param {ChatSummaryProjectionEventUpdateArgs} args - Arguments to update one ChatSummaryProjectionEvent.
     * @example
     * // Update one ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatSummaryProjectionEventUpdateArgs>(args: SelectSubset<T, ChatSummaryProjectionEventUpdateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatSummaryProjectionEvents.
     * @param {ChatSummaryProjectionEventDeleteManyArgs} args - Arguments to filter ChatSummaryProjectionEvents to delete.
     * @example
     * // Delete a few ChatSummaryProjectionEvents
     * const { count } = await prisma.chatSummaryProjectionEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatSummaryProjectionEventDeleteManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjectionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatSummaryProjectionEventUpdateManyArgs>(args: SelectSubset<T, ChatSummaryProjectionEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjectionEvents and returns the data updated in the database.
     * @param {ChatSummaryProjectionEventUpdateManyAndReturnArgs} args - Arguments to update many ChatSummaryProjectionEvents.
     * @example
     * // Update many ChatSummaryProjectionEvents
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatSummaryProjectionEvents and only return the `eventId`
     * const chatSummaryProjectionEventWithEventIdOnly = await prisma.chatSummaryProjectionEvent.updateManyAndReturn({
     *   select: { eventId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatSummaryProjectionEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatSummaryProjectionEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatSummaryProjectionEvent.
     * @param {ChatSummaryProjectionEventUpsertArgs} args - Arguments to update or create a ChatSummaryProjectionEvent.
     * @example
     * // Update or create a ChatSummaryProjectionEvent
     * const chatSummaryProjectionEvent = await prisma.chatSummaryProjectionEvent.upsert({
     *   create: {
     *     // ... data to create a ChatSummaryProjectionEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatSummaryProjectionEvent we want to update
     *   }
     * })
     */
    upsert<T extends ChatSummaryProjectionEventUpsertArgs>(args: SelectSubset<T, ChatSummaryProjectionEventUpsertArgs<ExtArgs>>): Prisma__ChatSummaryProjectionEventClient<$Result.GetResult<Prisma.$ChatSummaryProjectionEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatSummaryProjectionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventCountArgs} args - Arguments to filter ChatSummaryProjectionEvents to count.
     * @example
     * // Count the number of ChatSummaryProjectionEvents
     * const count = await prisma.chatSummaryProjectionEvent.count({
     *   where: {
     *     // ... the filter for the ChatSummaryProjectionEvents we want to count
     *   }
     * })
    **/
    count<T extends ChatSummaryProjectionEventCountArgs>(
      args?: Subset<T, ChatSummaryProjectionEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatSummaryProjectionEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatSummaryProjectionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatSummaryProjectionEventAggregateArgs>(args: Subset<T, ChatSummaryProjectionEventAggregateArgs>): Prisma.PrismaPromise<GetChatSummaryProjectionEventAggregateType<T>>

    /**
     * Group by ChatSummaryProjectionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatSummaryProjectionEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatSummaryProjectionEventGroupByArgs['orderBy'] }
        : { orderBy?: ChatSummaryProjectionEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatSummaryProjectionEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatSummaryProjectionEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatSummaryProjectionEvent model
   */
  readonly fields: ChatSummaryProjectionEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatSummaryProjectionEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatSummaryProjectionEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatSummaryProjectionEvent model
   */
  interface ChatSummaryProjectionEventFieldRefs {
    readonly eventId: FieldRef<"ChatSummaryProjectionEvent", 'String'>
    readonly eventType: FieldRef<"ChatSummaryProjectionEvent", 'String'>
    readonly occurredAt: FieldRef<"ChatSummaryProjectionEvent", 'DateTime'>
    readonly chatId: FieldRef<"ChatSummaryProjectionEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChatSummaryProjectionEvent findUnique
   */
  export type ChatSummaryProjectionEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionEvent to fetch.
     */
    where: ChatSummaryProjectionEventWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionEvent findUniqueOrThrow
   */
  export type ChatSummaryProjectionEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionEvent to fetch.
     */
    where: ChatSummaryProjectionEventWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionEvent findFirst
   */
  export type ChatSummaryProjectionEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionEvent to fetch.
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionEvents to fetch.
     */
    orderBy?: ChatSummaryProjectionEventOrderByWithRelationInput | ChatSummaryProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjectionEvents.
     */
    cursor?: ChatSummaryProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjectionEvents.
     */
    distinct?: ChatSummaryProjectionEventScalarFieldEnum | ChatSummaryProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionEvent findFirstOrThrow
   */
  export type ChatSummaryProjectionEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionEvent to fetch.
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionEvents to fetch.
     */
    orderBy?: ChatSummaryProjectionEventOrderByWithRelationInput | ChatSummaryProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjectionEvents.
     */
    cursor?: ChatSummaryProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjectionEvents.
     */
    distinct?: ChatSummaryProjectionEventScalarFieldEnum | ChatSummaryProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionEvent findMany
   */
  export type ChatSummaryProjectionEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionEvents to fetch.
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionEvents to fetch.
     */
    orderBy?: ChatSummaryProjectionEventOrderByWithRelationInput | ChatSummaryProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatSummaryProjectionEvents.
     */
    cursor?: ChatSummaryProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionEvents.
     */
    skip?: number
    distinct?: ChatSummaryProjectionEventScalarFieldEnum | ChatSummaryProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionEvent create
   */
  export type ChatSummaryProjectionEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatSummaryProjectionEvent.
     */
    data: XOR<ChatSummaryProjectionEventCreateInput, ChatSummaryProjectionEventUncheckedCreateInput>
  }

  /**
   * ChatSummaryProjectionEvent createMany
   */
  export type ChatSummaryProjectionEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatSummaryProjectionEvents.
     */
    data: ChatSummaryProjectionEventCreateManyInput | ChatSummaryProjectionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjectionEvent createManyAndReturn
   */
  export type ChatSummaryProjectionEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * The data used to create many ChatSummaryProjectionEvents.
     */
    data: ChatSummaryProjectionEventCreateManyInput | ChatSummaryProjectionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjectionEvent update
   */
  export type ChatSummaryProjectionEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatSummaryProjectionEvent.
     */
    data: XOR<ChatSummaryProjectionEventUpdateInput, ChatSummaryProjectionEventUncheckedUpdateInput>
    /**
     * Choose, which ChatSummaryProjectionEvent to update.
     */
    where: ChatSummaryProjectionEventWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionEvent updateMany
   */
  export type ChatSummaryProjectionEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatSummaryProjectionEvents.
     */
    data: XOR<ChatSummaryProjectionEventUpdateManyMutationInput, ChatSummaryProjectionEventUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjectionEvents to update
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * Limit how many ChatSummaryProjectionEvents to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionEvent updateManyAndReturn
   */
  export type ChatSummaryProjectionEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * The data used to update ChatSummaryProjectionEvents.
     */
    data: XOR<ChatSummaryProjectionEventUpdateManyMutationInput, ChatSummaryProjectionEventUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjectionEvents to update
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * Limit how many ChatSummaryProjectionEvents to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionEvent upsert
   */
  export type ChatSummaryProjectionEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatSummaryProjectionEvent to update in case it exists.
     */
    where: ChatSummaryProjectionEventWhereUniqueInput
    /**
     * In case the ChatSummaryProjectionEvent found by the `where` argument doesn't exist, create a new ChatSummaryProjectionEvent with this data.
     */
    create: XOR<ChatSummaryProjectionEventCreateInput, ChatSummaryProjectionEventUncheckedCreateInput>
    /**
     * In case the ChatSummaryProjectionEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatSummaryProjectionEventUpdateInput, ChatSummaryProjectionEventUncheckedUpdateInput>
  }

  /**
   * ChatSummaryProjectionEvent delete
   */
  export type ChatSummaryProjectionEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
    /**
     * Filter which ChatSummaryProjectionEvent to delete.
     */
    where: ChatSummaryProjectionEventWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionEvent deleteMany
   */
  export type ChatSummaryProjectionEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjectionEvents to delete
     */
    where?: ChatSummaryProjectionEventWhereInput
    /**
     * Limit how many ChatSummaryProjectionEvents to delete.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionEvent without action
   */
  export type ChatSummaryProjectionEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionEvent
     */
    select?: ChatSummaryProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionEvent
     */
    omit?: ChatSummaryProjectionEventOmit<ExtArgs> | null
  }


  /**
   * Model ChatSummaryProjectionOffset
   */

  export type AggregateChatSummaryProjectionOffset = {
    _count: ChatSummaryProjectionOffsetCountAggregateOutputType | null
    _min: ChatSummaryProjectionOffsetMinAggregateOutputType | null
    _max: ChatSummaryProjectionOffsetMaxAggregateOutputType | null
  }

  export type ChatSummaryProjectionOffsetMinAggregateOutputType = {
    consumer: string | null
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date | null
  }

  export type ChatSummaryProjectionOffsetMaxAggregateOutputType = {
    consumer: string | null
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date | null
  }

  export type ChatSummaryProjectionOffsetCountAggregateOutputType = {
    consumer: number
    lastEventId: number
    lastOccurredAt: number
    updatedAt: number
    _all: number
  }


  export type ChatSummaryProjectionOffsetMinAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
  }

  export type ChatSummaryProjectionOffsetMaxAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
  }

  export type ChatSummaryProjectionOffsetCountAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatSummaryProjectionOffsetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjectionOffset to aggregate.
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionOffsets to fetch.
     */
    orderBy?: ChatSummaryProjectionOffsetOrderByWithRelationInput | ChatSummaryProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatSummaryProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatSummaryProjectionOffsets
    **/
    _count?: true | ChatSummaryProjectionOffsetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatSummaryProjectionOffsetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatSummaryProjectionOffsetMaxAggregateInputType
  }

  export type GetChatSummaryProjectionOffsetAggregateType<T extends ChatSummaryProjectionOffsetAggregateArgs> = {
        [P in keyof T & keyof AggregateChatSummaryProjectionOffset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatSummaryProjectionOffset[P]>
      : GetScalarType<T[P], AggregateChatSummaryProjectionOffset[P]>
  }




  export type ChatSummaryProjectionOffsetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatSummaryProjectionOffsetWhereInput
    orderBy?: ChatSummaryProjectionOffsetOrderByWithAggregationInput | ChatSummaryProjectionOffsetOrderByWithAggregationInput[]
    by: ChatSummaryProjectionOffsetScalarFieldEnum[] | ChatSummaryProjectionOffsetScalarFieldEnum
    having?: ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatSummaryProjectionOffsetCountAggregateInputType | true
    _min?: ChatSummaryProjectionOffsetMinAggregateInputType
    _max?: ChatSummaryProjectionOffsetMaxAggregateInputType
  }

  export type ChatSummaryProjectionOffsetGroupByOutputType = {
    consumer: string
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date
    _count: ChatSummaryProjectionOffsetCountAggregateOutputType | null
    _min: ChatSummaryProjectionOffsetMinAggregateOutputType | null
    _max: ChatSummaryProjectionOffsetMaxAggregateOutputType | null
  }

  type GetChatSummaryProjectionOffsetGroupByPayload<T extends ChatSummaryProjectionOffsetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatSummaryProjectionOffsetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatSummaryProjectionOffsetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatSummaryProjectionOffsetGroupByOutputType[P]>
            : GetScalarType<T[P], ChatSummaryProjectionOffsetGroupByOutputType[P]>
        }
      >
    >


  export type ChatSummaryProjectionOffsetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionOffset"]>

  export type ChatSummaryProjectionOffsetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionOffset"]>

  export type ChatSummaryProjectionOffsetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatSummaryProjectionOffset"]>

  export type ChatSummaryProjectionOffsetSelectScalar = {
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }

  export type ChatSummaryProjectionOffsetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"consumer" | "lastEventId" | "lastOccurredAt" | "updatedAt", ExtArgs["result"]["chatSummaryProjectionOffset"]>

  export type $ChatSummaryProjectionOffsetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatSummaryProjectionOffset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      consumer: string
      lastEventId: string | null
      lastOccurredAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["chatSummaryProjectionOffset"]>
    composites: {}
  }

  type ChatSummaryProjectionOffsetGetPayload<S extends boolean | null | undefined | ChatSummaryProjectionOffsetDefaultArgs> = $Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload, S>

  type ChatSummaryProjectionOffsetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatSummaryProjectionOffsetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatSummaryProjectionOffsetCountAggregateInputType | true
    }

  export interface ChatSummaryProjectionOffsetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatSummaryProjectionOffset'], meta: { name: 'ChatSummaryProjectionOffset' } }
    /**
     * Find zero or one ChatSummaryProjectionOffset that matches the filter.
     * @param {ChatSummaryProjectionOffsetFindUniqueArgs} args - Arguments to find a ChatSummaryProjectionOffset
     * @example
     * // Get one ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatSummaryProjectionOffsetFindUniqueArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetFindUniqueArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatSummaryProjectionOffset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatSummaryProjectionOffsetFindUniqueOrThrowArgs} args - Arguments to find a ChatSummaryProjectionOffset
     * @example
     * // Get one ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatSummaryProjectionOffsetFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjectionOffset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetFindFirstArgs} args - Arguments to find a ChatSummaryProjectionOffset
     * @example
     * // Get one ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatSummaryProjectionOffsetFindFirstArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetFindFirstArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatSummaryProjectionOffset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetFindFirstOrThrowArgs} args - Arguments to find a ChatSummaryProjectionOffset
     * @example
     * // Get one ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatSummaryProjectionOffsetFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatSummaryProjectionOffsets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffsets = await prisma.chatSummaryProjectionOffset.findMany()
     * 
     * // Get first 10 ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffsets = await prisma.chatSummaryProjectionOffset.findMany({ take: 10 })
     * 
     * // Only select the `consumer`
     * const chatSummaryProjectionOffsetWithConsumerOnly = await prisma.chatSummaryProjectionOffset.findMany({ select: { consumer: true } })
     * 
     */
    findMany<T extends ChatSummaryProjectionOffsetFindManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatSummaryProjectionOffset.
     * @param {ChatSummaryProjectionOffsetCreateArgs} args - Arguments to create a ChatSummaryProjectionOffset.
     * @example
     * // Create one ChatSummaryProjectionOffset
     * const ChatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.create({
     *   data: {
     *     // ... data to create a ChatSummaryProjectionOffset
     *   }
     * })
     * 
     */
    create<T extends ChatSummaryProjectionOffsetCreateArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetCreateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatSummaryProjectionOffsets.
     * @param {ChatSummaryProjectionOffsetCreateManyArgs} args - Arguments to create many ChatSummaryProjectionOffsets.
     * @example
     * // Create many ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatSummaryProjectionOffsetCreateManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatSummaryProjectionOffsets and returns the data saved in the database.
     * @param {ChatSummaryProjectionOffsetCreateManyAndReturnArgs} args - Arguments to create many ChatSummaryProjectionOffsets.
     * @example
     * // Create many ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatSummaryProjectionOffsets and only return the `consumer`
     * const chatSummaryProjectionOffsetWithConsumerOnly = await prisma.chatSummaryProjectionOffset.createManyAndReturn({
     *   select: { consumer: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatSummaryProjectionOffsetCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatSummaryProjectionOffset.
     * @param {ChatSummaryProjectionOffsetDeleteArgs} args - Arguments to delete one ChatSummaryProjectionOffset.
     * @example
     * // Delete one ChatSummaryProjectionOffset
     * const ChatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.delete({
     *   where: {
     *     // ... filter to delete one ChatSummaryProjectionOffset
     *   }
     * })
     * 
     */
    delete<T extends ChatSummaryProjectionOffsetDeleteArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetDeleteArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatSummaryProjectionOffset.
     * @param {ChatSummaryProjectionOffsetUpdateArgs} args - Arguments to update one ChatSummaryProjectionOffset.
     * @example
     * // Update one ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatSummaryProjectionOffsetUpdateArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetUpdateArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatSummaryProjectionOffsets.
     * @param {ChatSummaryProjectionOffsetDeleteManyArgs} args - Arguments to filter ChatSummaryProjectionOffsets to delete.
     * @example
     * // Delete a few ChatSummaryProjectionOffsets
     * const { count } = await prisma.chatSummaryProjectionOffset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatSummaryProjectionOffsetDeleteManyArgs>(args?: SelectSubset<T, ChatSummaryProjectionOffsetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjectionOffsets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatSummaryProjectionOffsetUpdateManyArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSummaryProjectionOffsets and returns the data updated in the database.
     * @param {ChatSummaryProjectionOffsetUpdateManyAndReturnArgs} args - Arguments to update many ChatSummaryProjectionOffsets.
     * @example
     * // Update many ChatSummaryProjectionOffsets
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatSummaryProjectionOffsets and only return the `consumer`
     * const chatSummaryProjectionOffsetWithConsumerOnly = await prisma.chatSummaryProjectionOffset.updateManyAndReturn({
     *   select: { consumer: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatSummaryProjectionOffsetUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatSummaryProjectionOffset.
     * @param {ChatSummaryProjectionOffsetUpsertArgs} args - Arguments to update or create a ChatSummaryProjectionOffset.
     * @example
     * // Update or create a ChatSummaryProjectionOffset
     * const chatSummaryProjectionOffset = await prisma.chatSummaryProjectionOffset.upsert({
     *   create: {
     *     // ... data to create a ChatSummaryProjectionOffset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatSummaryProjectionOffset we want to update
     *   }
     * })
     */
    upsert<T extends ChatSummaryProjectionOffsetUpsertArgs>(args: SelectSubset<T, ChatSummaryProjectionOffsetUpsertArgs<ExtArgs>>): Prisma__ChatSummaryProjectionOffsetClient<$Result.GetResult<Prisma.$ChatSummaryProjectionOffsetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatSummaryProjectionOffsets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetCountArgs} args - Arguments to filter ChatSummaryProjectionOffsets to count.
     * @example
     * // Count the number of ChatSummaryProjectionOffsets
     * const count = await prisma.chatSummaryProjectionOffset.count({
     *   where: {
     *     // ... the filter for the ChatSummaryProjectionOffsets we want to count
     *   }
     * })
    **/
    count<T extends ChatSummaryProjectionOffsetCountArgs>(
      args?: Subset<T, ChatSummaryProjectionOffsetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatSummaryProjectionOffsetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatSummaryProjectionOffset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatSummaryProjectionOffsetAggregateArgs>(args: Subset<T, ChatSummaryProjectionOffsetAggregateArgs>): Prisma.PrismaPromise<GetChatSummaryProjectionOffsetAggregateType<T>>

    /**
     * Group by ChatSummaryProjectionOffset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSummaryProjectionOffsetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatSummaryProjectionOffsetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatSummaryProjectionOffsetGroupByArgs['orderBy'] }
        : { orderBy?: ChatSummaryProjectionOffsetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatSummaryProjectionOffsetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatSummaryProjectionOffsetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatSummaryProjectionOffset model
   */
  readonly fields: ChatSummaryProjectionOffsetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatSummaryProjectionOffset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatSummaryProjectionOffsetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatSummaryProjectionOffset model
   */
  interface ChatSummaryProjectionOffsetFieldRefs {
    readonly consumer: FieldRef<"ChatSummaryProjectionOffset", 'String'>
    readonly lastEventId: FieldRef<"ChatSummaryProjectionOffset", 'String'>
    readonly lastOccurredAt: FieldRef<"ChatSummaryProjectionOffset", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatSummaryProjectionOffset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatSummaryProjectionOffset findUnique
   */
  export type ChatSummaryProjectionOffsetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionOffset to fetch.
     */
    where: ChatSummaryProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionOffset findUniqueOrThrow
   */
  export type ChatSummaryProjectionOffsetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionOffset to fetch.
     */
    where: ChatSummaryProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionOffset findFirst
   */
  export type ChatSummaryProjectionOffsetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionOffset to fetch.
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionOffsets to fetch.
     */
    orderBy?: ChatSummaryProjectionOffsetOrderByWithRelationInput | ChatSummaryProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjectionOffsets.
     */
    cursor?: ChatSummaryProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjectionOffsets.
     */
    distinct?: ChatSummaryProjectionOffsetScalarFieldEnum | ChatSummaryProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionOffset findFirstOrThrow
   */
  export type ChatSummaryProjectionOffsetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionOffset to fetch.
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionOffsets to fetch.
     */
    orderBy?: ChatSummaryProjectionOffsetOrderByWithRelationInput | ChatSummaryProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSummaryProjectionOffsets.
     */
    cursor?: ChatSummaryProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSummaryProjectionOffsets.
     */
    distinct?: ChatSummaryProjectionOffsetScalarFieldEnum | ChatSummaryProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionOffset findMany
   */
  export type ChatSummaryProjectionOffsetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatSummaryProjectionOffsets to fetch.
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSummaryProjectionOffsets to fetch.
     */
    orderBy?: ChatSummaryProjectionOffsetOrderByWithRelationInput | ChatSummaryProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatSummaryProjectionOffsets.
     */
    cursor?: ChatSummaryProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSummaryProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSummaryProjectionOffsets.
     */
    skip?: number
    distinct?: ChatSummaryProjectionOffsetScalarFieldEnum | ChatSummaryProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatSummaryProjectionOffset create
   */
  export type ChatSummaryProjectionOffsetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatSummaryProjectionOffset.
     */
    data: XOR<ChatSummaryProjectionOffsetCreateInput, ChatSummaryProjectionOffsetUncheckedCreateInput>
  }

  /**
   * ChatSummaryProjectionOffset createMany
   */
  export type ChatSummaryProjectionOffsetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatSummaryProjectionOffsets.
     */
    data: ChatSummaryProjectionOffsetCreateManyInput | ChatSummaryProjectionOffsetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjectionOffset createManyAndReturn
   */
  export type ChatSummaryProjectionOffsetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data used to create many ChatSummaryProjectionOffsets.
     */
    data: ChatSummaryProjectionOffsetCreateManyInput | ChatSummaryProjectionOffsetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatSummaryProjectionOffset update
   */
  export type ChatSummaryProjectionOffsetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatSummaryProjectionOffset.
     */
    data: XOR<ChatSummaryProjectionOffsetUpdateInput, ChatSummaryProjectionOffsetUncheckedUpdateInput>
    /**
     * Choose, which ChatSummaryProjectionOffset to update.
     */
    where: ChatSummaryProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionOffset updateMany
   */
  export type ChatSummaryProjectionOffsetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatSummaryProjectionOffsets.
     */
    data: XOR<ChatSummaryProjectionOffsetUpdateManyMutationInput, ChatSummaryProjectionOffsetUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjectionOffsets to update
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * Limit how many ChatSummaryProjectionOffsets to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionOffset updateManyAndReturn
   */
  export type ChatSummaryProjectionOffsetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data used to update ChatSummaryProjectionOffsets.
     */
    data: XOR<ChatSummaryProjectionOffsetUpdateManyMutationInput, ChatSummaryProjectionOffsetUncheckedUpdateManyInput>
    /**
     * Filter which ChatSummaryProjectionOffsets to update
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * Limit how many ChatSummaryProjectionOffsets to update.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionOffset upsert
   */
  export type ChatSummaryProjectionOffsetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatSummaryProjectionOffset to update in case it exists.
     */
    where: ChatSummaryProjectionOffsetWhereUniqueInput
    /**
     * In case the ChatSummaryProjectionOffset found by the `where` argument doesn't exist, create a new ChatSummaryProjectionOffset with this data.
     */
    create: XOR<ChatSummaryProjectionOffsetCreateInput, ChatSummaryProjectionOffsetUncheckedCreateInput>
    /**
     * In case the ChatSummaryProjectionOffset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatSummaryProjectionOffsetUpdateInput, ChatSummaryProjectionOffsetUncheckedUpdateInput>
  }

  /**
   * ChatSummaryProjectionOffset delete
   */
  export type ChatSummaryProjectionOffsetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter which ChatSummaryProjectionOffset to delete.
     */
    where: ChatSummaryProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatSummaryProjectionOffset deleteMany
   */
  export type ChatSummaryProjectionOffsetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSummaryProjectionOffsets to delete
     */
    where?: ChatSummaryProjectionOffsetWhereInput
    /**
     * Limit how many ChatSummaryProjectionOffsets to delete.
     */
    limit?: number
  }

  /**
   * ChatSummaryProjectionOffset without action
   */
  export type ChatSummaryProjectionOffsetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSummaryProjectionOffset
     */
    select?: ChatSummaryProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatSummaryProjectionOffset
     */
    omit?: ChatSummaryProjectionOffsetOmit<ExtArgs> | null
  }


  /**
   * Model OutboxEvent
   */

  export type AggregateOutboxEvent = {
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  export type OutboxEventAvgAggregateOutputType = {
    eventVersion: number | null
    attemptCount: number | null
  }

  export type OutboxEventSumAggregateOutputType = {
    eventVersion: number | null
    attemptCount: number | null
  }

  export type OutboxEventMinAggregateOutputType = {
    id: string | null
    eventType: string | null
    eventVersion: number | null
    aggregateId: string | null
    partitionKey: string | null
    occurredAt: Date | null
    publishedAt: Date | null
    status: $Enums.OutboxEventStatus | null
    attemptCount: number | null
    lastError: string | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    eventType: string | null
    eventVersion: number | null
    aggregateId: string | null
    partitionKey: string | null
    occurredAt: Date | null
    publishedAt: Date | null
    status: $Enums.OutboxEventStatus | null
    attemptCount: number | null
    lastError: string | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    eventType: number
    eventVersion: number
    aggregateId: number
    partitionKey: number
    payloadJson: number
    occurredAt: number
    publishedAt: number
    status: number
    attemptCount: number
    lastError: number
    lockedAt: number
    lockedBy: number
    _all: number
  }


  export type OutboxEventAvgAggregateInputType = {
    eventVersion?: true
    attemptCount?: true
  }

  export type OutboxEventSumAggregateInputType = {
    eventVersion?: true
    attemptCount?: true
  }

  export type OutboxEventMinAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateId?: true
    partitionKey?: true
    occurredAt?: true
    publishedAt?: true
    status?: true
    attemptCount?: true
    lastError?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateId?: true
    partitionKey?: true
    occurredAt?: true
    publishedAt?: true
    status?: true
    attemptCount?: true
    lastError?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateId?: true
    partitionKey?: true
    payloadJson?: true
    occurredAt?: true
    publishedAt?: true
    status?: true
    attemptCount?: true
    lastError?: true
    lockedAt?: true
    lockedBy?: true
    _all?: true
  }

  export type OutboxEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvent to aggregate.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboxEvents
    **/
    _count?: true | OutboxEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutboxEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutboxEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxEventMaxAggregateInputType
  }

  export type GetOutboxEventAggregateType<T extends OutboxEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboxEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxEvent[P]>
      : GetScalarType<T[P], AggregateOutboxEvent[P]>
  }




  export type OutboxEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxEventWhereInput
    orderBy?: OutboxEventOrderByWithAggregationInput | OutboxEventOrderByWithAggregationInput[]
    by: OutboxEventScalarFieldEnum[] | OutboxEventScalarFieldEnum
    having?: OutboxEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxEventCountAggregateInputType | true
    _avg?: OutboxEventAvgAggregateInputType
    _sum?: OutboxEventSumAggregateInputType
    _min?: OutboxEventMinAggregateInputType
    _max?: OutboxEventMaxAggregateInputType
  }

  export type OutboxEventGroupByOutputType = {
    id: string
    eventType: string
    eventVersion: number
    aggregateId: string
    partitionKey: string
    payloadJson: JsonValue
    occurredAt: Date
    publishedAt: Date | null
    status: $Enums.OutboxEventStatus
    attemptCount: number
    lastError: string | null
    lockedAt: Date | null
    lockedBy: string | null
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  type GetOutboxEventGroupByPayload<T extends OutboxEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
        }
      >
    >


  export type OutboxEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateId?: boolean
    partitionKey?: boolean
    payloadJson?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    status?: boolean
    attemptCount?: boolean
    lastError?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateId?: boolean
    partitionKey?: boolean
    payloadJson?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    status?: boolean
    attemptCount?: boolean
    lastError?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateId?: boolean
    partitionKey?: boolean
    payloadJson?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    status?: boolean
    attemptCount?: boolean
    lastError?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateId?: boolean
    partitionKey?: boolean
    payloadJson?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    status?: boolean
    attemptCount?: boolean
    lastError?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }

  export type OutboxEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventType" | "eventVersion" | "aggregateId" | "partitionKey" | "payloadJson" | "occurredAt" | "publishedAt" | "status" | "attemptCount" | "lastError" | "lockedAt" | "lockedBy", ExtArgs["result"]["outboxEvent"]>

  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventType: string
      eventVersion: number
      aggregateId: string
      partitionKey: string
      payloadJson: Prisma.JsonValue
      occurredAt: Date
      publishedAt: Date | null
      status: $Enums.OutboxEventStatus
      attemptCount: number
      lastError: string | null
      lockedAt: Date | null
      lockedBy: string | null
    }, ExtArgs["result"]["outboxEvent"]>
    composites: {}
  }

  type OutboxEventGetPayload<S extends boolean | null | undefined | OutboxEventDefaultArgs> = $Result.GetResult<Prisma.$OutboxEventPayload, S>

  type OutboxEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboxEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutboxEventCountAggregateInputType | true
    }

  export interface OutboxEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboxEvent'], meta: { name: 'OutboxEvent' } }
    /**
     * Find zero or one OutboxEvent that matches the filter.
     * @param {OutboxEventFindUniqueArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxEventFindUniqueArgs>(args: SelectSubset<T, OutboxEventFindUniqueArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutboxEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboxEventFindUniqueOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxEventFindFirstArgs>(args?: SelectSubset<T, OutboxEventFindFirstArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutboxEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany()
     * 
     * // Get first 10 OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxEventFindManyArgs>(args?: SelectSubset<T, OutboxEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutboxEvent.
     * @param {OutboxEventCreateArgs} args - Arguments to create a OutboxEvent.
     * @example
     * // Create one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.create({
     *   data: {
     *     // ... data to create a OutboxEvent
     *   }
     * })
     * 
     */
    create<T extends OutboxEventCreateArgs>(args: SelectSubset<T, OutboxEventCreateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutboxEvents.
     * @param {OutboxEventCreateManyArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxEventCreateManyArgs>(args?: SelectSubset<T, OutboxEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboxEvents and returns the data saved in the database.
     * @param {OutboxEventCreateManyAndReturnArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutboxEvent.
     * @param {OutboxEventDeleteArgs} args - Arguments to delete one OutboxEvent.
     * @example
     * // Delete one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.delete({
     *   where: {
     *     // ... filter to delete one OutboxEvent
     *   }
     * })
     * 
     */
    delete<T extends OutboxEventDeleteArgs>(args: SelectSubset<T, OutboxEventDeleteArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutboxEvent.
     * @param {OutboxEventUpdateArgs} args - Arguments to update one OutboxEvent.
     * @example
     * // Update one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxEventUpdateArgs>(args: SelectSubset<T, OutboxEventUpdateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutboxEvents.
     * @param {OutboxEventDeleteManyArgs} args - Arguments to filter OutboxEvents to delete.
     * @example
     * // Delete a few OutboxEvents
     * const { count } = await prisma.outboxEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxEventDeleteManyArgs>(args?: SelectSubset<T, OutboxEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxEventUpdateManyArgs>(args: SelectSubset<T, OutboxEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents and returns the data updated in the database.
     * @param {OutboxEventUpdateManyAndReturnArgs} args - Arguments to update many OutboxEvents.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutboxEventUpdateManyAndReturnArgs>(args: SelectSubset<T, OutboxEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutboxEvent.
     * @param {OutboxEventUpsertArgs} args - Arguments to update or create a OutboxEvent.
     * @example
     * // Update or create a OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.upsert({
     *   create: {
     *     // ... data to create a OutboxEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxEvent we want to update
     *   }
     * })
     */
    upsert<T extends OutboxEventUpsertArgs>(args: SelectSubset<T, OutboxEventUpsertArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventCountArgs} args - Arguments to filter OutboxEvents to count.
     * @example
     * // Count the number of OutboxEvents
     * const count = await prisma.outboxEvent.count({
     *   where: {
     *     // ... the filter for the OutboxEvents we want to count
     *   }
     * })
    **/
    count<T extends OutboxEventCountArgs>(
      args?: Subset<T, OutboxEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboxEventAggregateArgs>(args: Subset<T, OutboxEventAggregateArgs>): Prisma.PrismaPromise<GetOutboxEventAggregateType<T>>

    /**
     * Group by OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboxEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxEventGroupByArgs['orderBy'] }
        : { orderBy?: OutboxEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboxEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboxEvent model
   */
  readonly fields: OutboxEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutboxEvent model
   */
  interface OutboxEventFieldRefs {
    readonly id: FieldRef<"OutboxEvent", 'String'>
    readonly eventType: FieldRef<"OutboxEvent", 'String'>
    readonly eventVersion: FieldRef<"OutboxEvent", 'Int'>
    readonly aggregateId: FieldRef<"OutboxEvent", 'String'>
    readonly partitionKey: FieldRef<"OutboxEvent", 'String'>
    readonly payloadJson: FieldRef<"OutboxEvent", 'Json'>
    readonly occurredAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly publishedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly status: FieldRef<"OutboxEvent", 'OutboxEventStatus'>
    readonly attemptCount: FieldRef<"OutboxEvent", 'Int'>
    readonly lastError: FieldRef<"OutboxEvent", 'String'>
    readonly lockedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly lockedBy: FieldRef<"OutboxEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OutboxEvent findUnique
   */
  export type OutboxEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findUniqueOrThrow
   */
  export type OutboxEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findFirst
   */
  export type OutboxEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findFirstOrThrow
   */
  export type OutboxEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findMany
   */
  export type OutboxEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvents to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent create
   */
  export type OutboxEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to create a OutboxEvent.
     */
    data: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
  }

  /**
   * OutboxEvent createMany
   */
  export type OutboxEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent createManyAndReturn
   */
  export type OutboxEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent update
   */
  export type OutboxEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to update a OutboxEvent.
     */
    data: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
    /**
     * Choose, which OutboxEvent to update.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent updateMany
   */
  export type OutboxEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent updateManyAndReturn
   */
  export type OutboxEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent upsert
   */
  export type OutboxEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The filter to search for the OutboxEvent to update in case it exists.
     */
    where: OutboxEventWhereUniqueInput
    /**
     * In case the OutboxEvent found by the `where` argument doesn't exist, create a new OutboxEvent with this data.
     */
    create: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
    /**
     * In case the OutboxEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
  }

  /**
   * OutboxEvent delete
   */
  export type OutboxEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter which OutboxEvent to delete.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent deleteMany
   */
  export type OutboxEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvents to delete
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to delete.
     */
    limit?: number
  }

  /**
   * OutboxEvent without action
   */
  export type OutboxEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MessageScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    senderUserId: 'senderUserId',
    clientMessageId: 'clientMessageId',
    type: 'type',
    text: 'text',
    replyToMessageId: 'replyToMessageId',
    forwardedFromMessageId: 'forwardedFromMessageId',
    createdAt: 'createdAt',
    editedAt: 'editedAt',
    deletedAt: 'deletedAt',
    status: 'status'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MessageAttachmentScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    mediaId: 'mediaId',
    attachmentType: 'attachmentType',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt'
  };

  export type MessageAttachmentScalarFieldEnum = (typeof MessageAttachmentScalarFieldEnum)[keyof typeof MessageAttachmentScalarFieldEnum]


  export const MessageReactionScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    userId: 'userId',
    emoji: 'emoji',
    createdAt: 'createdAt'
  };

  export type MessageReactionScalarFieldEnum = (typeof MessageReactionScalarFieldEnum)[keyof typeof MessageReactionScalarFieldEnum]


  export const MessageRevisionScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    previousText: 'previousText',
    editedByUserId: 'editedByUserId',
    editedAt: 'editedAt'
  };

  export type MessageRevisionScalarFieldEnum = (typeof MessageRevisionScalarFieldEnum)[keyof typeof MessageRevisionScalarFieldEnum]


  export const ReadReceiptScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    lastReadMessageId: 'lastReadMessageId',
    updatedAt: 'updatedAt'
  };

  export type ReadReceiptScalarFieldEnum = (typeof ReadReceiptScalarFieldEnum)[keyof typeof ReadReceiptScalarFieldEnum]


  export const DeliveryReceiptScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    lastDeliveredMessageId: 'lastDeliveredMessageId',
    updatedAt: 'updatedAt'
  };

  export type DeliveryReceiptScalarFieldEnum = (typeof DeliveryReceiptScalarFieldEnum)[keyof typeof DeliveryReceiptScalarFieldEnum]


  export const ChatMessageCounterScalarFieldEnum: {
    chatId: 'chatId',
    userId: 'userId',
    lastMessageId: 'lastMessageId',
    unreadCount: 'unreadCount',
    updatedAt: 'updatedAt'
  };

  export type ChatMessageCounterScalarFieldEnum = (typeof ChatMessageCounterScalarFieldEnum)[keyof typeof ChatMessageCounterScalarFieldEnum]


  export const ChatSummaryProjectionScalarFieldEnum: {
    chatId: 'chatId',
    lastMessageId: 'lastMessageId',
    lastMessagePreview: 'lastMessagePreview',
    lastActivityAt: 'lastActivityAt',
    lastSenderUserId: 'lastSenderUserId',
    updatedAt: 'updatedAt'
  };

  export type ChatSummaryProjectionScalarFieldEnum = (typeof ChatSummaryProjectionScalarFieldEnum)[keyof typeof ChatSummaryProjectionScalarFieldEnum]


  export const ChatSummaryProjectionEventScalarFieldEnum: {
    eventId: 'eventId',
    eventType: 'eventType',
    occurredAt: 'occurredAt',
    chatId: 'chatId'
  };

  export type ChatSummaryProjectionEventScalarFieldEnum = (typeof ChatSummaryProjectionEventScalarFieldEnum)[keyof typeof ChatSummaryProjectionEventScalarFieldEnum]


  export const ChatSummaryProjectionOffsetScalarFieldEnum: {
    consumer: 'consumer',
    lastEventId: 'lastEventId',
    lastOccurredAt: 'lastOccurredAt',
    updatedAt: 'updatedAt'
  };

  export type ChatSummaryProjectionOffsetScalarFieldEnum = (typeof ChatSummaryProjectionOffsetScalarFieldEnum)[keyof typeof ChatSummaryProjectionOffsetScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    eventVersion: 'eventVersion',
    aggregateId: 'aggregateId',
    partitionKey: 'partitionKey',
    payloadJson: 'payloadJson',
    occurredAt: 'occurredAt',
    publishedAt: 'publishedAt',
    status: 'status',
    attemptCount: 'attemptCount',
    lastError: 'lastError',
    lockedAt: 'lockedAt',
    lockedBy: 'lockedBy'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>
    


  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MessageStatus'
   */
  export type EnumMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStatus'>
    


  /**
   * Reference to a field of type 'MessageStatus[]'
   */
  export type ListEnumMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'OutboxEventStatus'
   */
  export type EnumOutboxEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxEventStatus'>
    


  /**
   * Reference to a field of type 'OutboxEventStatus[]'
   */
  export type ListEnumOutboxEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxEventStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    chatId?: StringFilter<"Message"> | string
    senderUserId?: StringFilter<"Message"> | string
    clientMessageId?: StringFilter<"Message"> | string
    type?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType
    text?: StringNullableFilter<"Message"> | string | null
    replyToMessageId?: StringNullableFilter<"Message"> | string | null
    forwardedFromMessageId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus
    attachments?: MessageAttachmentListRelationFilter
    reactions?: MessageReactionListRelationFilter
    revisions?: MessageRevisionListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    senderUserId?: SortOrder
    clientMessageId?: SortOrder
    type?: SortOrder
    text?: SortOrderInput | SortOrder
    replyToMessageId?: SortOrderInput | SortOrder
    forwardedFromMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    attachments?: MessageAttachmentOrderByRelationAggregateInput
    reactions?: MessageReactionOrderByRelationAggregateInput
    revisions?: MessageRevisionOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_clientMessageId?: MessageChatIdClientMessageIdCompoundUniqueInput
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    chatId?: StringFilter<"Message"> | string
    senderUserId?: StringFilter<"Message"> | string
    clientMessageId?: StringFilter<"Message"> | string
    type?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType
    text?: StringNullableFilter<"Message"> | string | null
    replyToMessageId?: StringNullableFilter<"Message"> | string | null
    forwardedFromMessageId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus
    attachments?: MessageAttachmentListRelationFilter
    reactions?: MessageReactionListRelationFilter
    revisions?: MessageRevisionListRelationFilter
  }, "id" | "chatId_clientMessageId">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    senderUserId?: SortOrder
    clientMessageId?: SortOrder
    type?: SortOrder
    text?: SortOrderInput | SortOrder
    replyToMessageId?: SortOrderInput | SortOrder
    forwardedFromMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    chatId?: StringWithAggregatesFilter<"Message"> | string
    senderUserId?: StringWithAggregatesFilter<"Message"> | string
    clientMessageId?: StringWithAggregatesFilter<"Message"> | string
    type?: EnumMessageTypeWithAggregatesFilter<"Message"> | $Enums.MessageType
    text?: StringNullableWithAggregatesFilter<"Message"> | string | null
    replyToMessageId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    forwardedFromMessageId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    editedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    status?: EnumMessageStatusWithAggregatesFilter<"Message"> | $Enums.MessageStatus
  }

  export type MessageAttachmentWhereInput = {
    AND?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    OR?: MessageAttachmentWhereInput[]
    NOT?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    id?: StringFilter<"MessageAttachment"> | string
    messageId?: StringFilter<"MessageAttachment"> | string
    mediaId?: StringFilter<"MessageAttachment"> | string
    attachmentType?: StringFilter<"MessageAttachment"> | string
    sortOrder?: IntFilter<"MessageAttachment"> | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    mediaId?: SortOrder
    attachmentType?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    OR?: MessageAttachmentWhereInput[]
    NOT?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    messageId?: StringFilter<"MessageAttachment"> | string
    mediaId?: StringFilter<"MessageAttachment"> | string
    attachmentType?: StringFilter<"MessageAttachment"> | string
    sortOrder?: IntFilter<"MessageAttachment"> | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id">

  export type MessageAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    mediaId?: SortOrder
    attachmentType?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: MessageAttachmentCountOrderByAggregateInput
    _avg?: MessageAttachmentAvgOrderByAggregateInput
    _max?: MessageAttachmentMaxOrderByAggregateInput
    _min?: MessageAttachmentMinOrderByAggregateInput
    _sum?: MessageAttachmentSumOrderByAggregateInput
  }

  export type MessageAttachmentScalarWhereWithAggregatesInput = {
    AND?: MessageAttachmentScalarWhereWithAggregatesInput | MessageAttachmentScalarWhereWithAggregatesInput[]
    OR?: MessageAttachmentScalarWhereWithAggregatesInput[]
    NOT?: MessageAttachmentScalarWhereWithAggregatesInput | MessageAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageAttachment"> | string
    messageId?: StringWithAggregatesFilter<"MessageAttachment"> | string
    mediaId?: StringWithAggregatesFilter<"MessageAttachment"> | string
    attachmentType?: StringWithAggregatesFilter<"MessageAttachment"> | string
    sortOrder?: IntWithAggregatesFilter<"MessageAttachment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MessageAttachment"> | Date | string
  }

  export type MessageReactionWhereInput = {
    AND?: MessageReactionWhereInput | MessageReactionWhereInput[]
    OR?: MessageReactionWhereInput[]
    NOT?: MessageReactionWhereInput | MessageReactionWhereInput[]
    id?: StringFilter<"MessageReaction"> | string
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageReactionOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    messageId_userId_emoji?: MessageReactionMessageIdUserIdEmojiCompoundUniqueInput
    AND?: MessageReactionWhereInput | MessageReactionWhereInput[]
    OR?: MessageReactionWhereInput[]
    NOT?: MessageReactionWhereInput | MessageReactionWhereInput[]
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id" | "messageId_userId_emoji">

  export type MessageReactionOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
    _count?: MessageReactionCountOrderByAggregateInput
    _max?: MessageReactionMaxOrderByAggregateInput
    _min?: MessageReactionMinOrderByAggregateInput
  }

  export type MessageReactionScalarWhereWithAggregatesInput = {
    AND?: MessageReactionScalarWhereWithAggregatesInput | MessageReactionScalarWhereWithAggregatesInput[]
    OR?: MessageReactionScalarWhereWithAggregatesInput[]
    NOT?: MessageReactionScalarWhereWithAggregatesInput | MessageReactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageReaction"> | string
    messageId?: StringWithAggregatesFilter<"MessageReaction"> | string
    userId?: StringWithAggregatesFilter<"MessageReaction"> | string
    emoji?: StringWithAggregatesFilter<"MessageReaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MessageReaction"> | Date | string
  }

  export type MessageRevisionWhereInput = {
    AND?: MessageRevisionWhereInput | MessageRevisionWhereInput[]
    OR?: MessageRevisionWhereInput[]
    NOT?: MessageRevisionWhereInput | MessageRevisionWhereInput[]
    id?: StringFilter<"MessageRevision"> | string
    messageId?: StringFilter<"MessageRevision"> | string
    previousText?: StringNullableFilter<"MessageRevision"> | string | null
    editedByUserId?: StringFilter<"MessageRevision"> | string
    editedAt?: DateTimeFilter<"MessageRevision"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }

  export type MessageRevisionOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    previousText?: SortOrderInput | SortOrder
    editedByUserId?: SortOrder
    editedAt?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageRevisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageRevisionWhereInput | MessageRevisionWhereInput[]
    OR?: MessageRevisionWhereInput[]
    NOT?: MessageRevisionWhereInput | MessageRevisionWhereInput[]
    messageId?: StringFilter<"MessageRevision"> | string
    previousText?: StringNullableFilter<"MessageRevision"> | string | null
    editedByUserId?: StringFilter<"MessageRevision"> | string
    editedAt?: DateTimeFilter<"MessageRevision"> | Date | string
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
  }, "id">

  export type MessageRevisionOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    previousText?: SortOrderInput | SortOrder
    editedByUserId?: SortOrder
    editedAt?: SortOrder
    _count?: MessageRevisionCountOrderByAggregateInput
    _max?: MessageRevisionMaxOrderByAggregateInput
    _min?: MessageRevisionMinOrderByAggregateInput
  }

  export type MessageRevisionScalarWhereWithAggregatesInput = {
    AND?: MessageRevisionScalarWhereWithAggregatesInput | MessageRevisionScalarWhereWithAggregatesInput[]
    OR?: MessageRevisionScalarWhereWithAggregatesInput[]
    NOT?: MessageRevisionScalarWhereWithAggregatesInput | MessageRevisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageRevision"> | string
    messageId?: StringWithAggregatesFilter<"MessageRevision"> | string
    previousText?: StringNullableWithAggregatesFilter<"MessageRevision"> | string | null
    editedByUserId?: StringWithAggregatesFilter<"MessageRevision"> | string
    editedAt?: DateTimeWithAggregatesFilter<"MessageRevision"> | Date | string
  }

  export type ReadReceiptWhereInput = {
    AND?: ReadReceiptWhereInput | ReadReceiptWhereInput[]
    OR?: ReadReceiptWhereInput[]
    NOT?: ReadReceiptWhereInput | ReadReceiptWhereInput[]
    id?: StringFilter<"ReadReceipt"> | string
    chatId?: StringFilter<"ReadReceipt"> | string
    userId?: StringFilter<"ReadReceipt"> | string
    lastReadMessageId?: StringFilter<"ReadReceipt"> | string
    updatedAt?: DateTimeFilter<"ReadReceipt"> | Date | string
  }

  export type ReadReceiptOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastReadMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_userId?: ReadReceiptChatIdUserIdCompoundUniqueInput
    AND?: ReadReceiptWhereInput | ReadReceiptWhereInput[]
    OR?: ReadReceiptWhereInput[]
    NOT?: ReadReceiptWhereInput | ReadReceiptWhereInput[]
    chatId?: StringFilter<"ReadReceipt"> | string
    userId?: StringFilter<"ReadReceipt"> | string
    lastReadMessageId?: StringFilter<"ReadReceipt"> | string
    updatedAt?: DateTimeFilter<"ReadReceipt"> | Date | string
  }, "id" | "chatId_userId">

  export type ReadReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastReadMessageId?: SortOrder
    updatedAt?: SortOrder
    _count?: ReadReceiptCountOrderByAggregateInput
    _max?: ReadReceiptMaxOrderByAggregateInput
    _min?: ReadReceiptMinOrderByAggregateInput
  }

  export type ReadReceiptScalarWhereWithAggregatesInput = {
    AND?: ReadReceiptScalarWhereWithAggregatesInput | ReadReceiptScalarWhereWithAggregatesInput[]
    OR?: ReadReceiptScalarWhereWithAggregatesInput[]
    NOT?: ReadReceiptScalarWhereWithAggregatesInput | ReadReceiptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReadReceipt"> | string
    chatId?: StringWithAggregatesFilter<"ReadReceipt"> | string
    userId?: StringWithAggregatesFilter<"ReadReceipt"> | string
    lastReadMessageId?: StringWithAggregatesFilter<"ReadReceipt"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReadReceipt"> | Date | string
  }

  export type DeliveryReceiptWhereInput = {
    AND?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    OR?: DeliveryReceiptWhereInput[]
    NOT?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    id?: StringFilter<"DeliveryReceipt"> | string
    chatId?: StringFilter<"DeliveryReceipt"> | string
    userId?: StringFilter<"DeliveryReceipt"> | string
    lastDeliveredMessageId?: StringFilter<"DeliveryReceipt"> | string
    updatedAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
  }

  export type DeliveryReceiptOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastDeliveredMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_userId?: DeliveryReceiptChatIdUserIdCompoundUniqueInput
    AND?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    OR?: DeliveryReceiptWhereInput[]
    NOT?: DeliveryReceiptWhereInput | DeliveryReceiptWhereInput[]
    chatId?: StringFilter<"DeliveryReceipt"> | string
    userId?: StringFilter<"DeliveryReceipt"> | string
    lastDeliveredMessageId?: StringFilter<"DeliveryReceipt"> | string
    updatedAt?: DateTimeFilter<"DeliveryReceipt"> | Date | string
  }, "id" | "chatId_userId">

  export type DeliveryReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastDeliveredMessageId?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryReceiptCountOrderByAggregateInput
    _max?: DeliveryReceiptMaxOrderByAggregateInput
    _min?: DeliveryReceiptMinOrderByAggregateInput
  }

  export type DeliveryReceiptScalarWhereWithAggregatesInput = {
    AND?: DeliveryReceiptScalarWhereWithAggregatesInput | DeliveryReceiptScalarWhereWithAggregatesInput[]
    OR?: DeliveryReceiptScalarWhereWithAggregatesInput[]
    NOT?: DeliveryReceiptScalarWhereWithAggregatesInput | DeliveryReceiptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    chatId?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    userId?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    lastDeliveredMessageId?: StringWithAggregatesFilter<"DeliveryReceipt"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeliveryReceipt"> | Date | string
  }

  export type ChatMessageCounterWhereInput = {
    AND?: ChatMessageCounterWhereInput | ChatMessageCounterWhereInput[]
    OR?: ChatMessageCounterWhereInput[]
    NOT?: ChatMessageCounterWhereInput | ChatMessageCounterWhereInput[]
    chatId?: StringFilter<"ChatMessageCounter"> | string
    userId?: StringFilter<"ChatMessageCounter"> | string
    lastMessageId?: StringNullableFilter<"ChatMessageCounter"> | string | null
    unreadCount?: IntFilter<"ChatMessageCounter"> | number
    updatedAt?: DateTimeFilter<"ChatMessageCounter"> | Date | string
  }

  export type ChatMessageCounterOrderByWithRelationInput = {
    chatId?: SortOrder
    userId?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    unreadCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageCounterWhereUniqueInput = Prisma.AtLeast<{
    chatId_userId?: ChatMessageCounterChatIdUserIdCompoundUniqueInput
    AND?: ChatMessageCounterWhereInput | ChatMessageCounterWhereInput[]
    OR?: ChatMessageCounterWhereInput[]
    NOT?: ChatMessageCounterWhereInput | ChatMessageCounterWhereInput[]
    chatId?: StringFilter<"ChatMessageCounter"> | string
    userId?: StringFilter<"ChatMessageCounter"> | string
    lastMessageId?: StringNullableFilter<"ChatMessageCounter"> | string | null
    unreadCount?: IntFilter<"ChatMessageCounter"> | number
    updatedAt?: DateTimeFilter<"ChatMessageCounter"> | Date | string
  }, "chatId_userId">

  export type ChatMessageCounterOrderByWithAggregationInput = {
    chatId?: SortOrder
    userId?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    unreadCount?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatMessageCounterCountOrderByAggregateInput
    _avg?: ChatMessageCounterAvgOrderByAggregateInput
    _max?: ChatMessageCounterMaxOrderByAggregateInput
    _min?: ChatMessageCounterMinOrderByAggregateInput
    _sum?: ChatMessageCounterSumOrderByAggregateInput
  }

  export type ChatMessageCounterScalarWhereWithAggregatesInput = {
    AND?: ChatMessageCounterScalarWhereWithAggregatesInput | ChatMessageCounterScalarWhereWithAggregatesInput[]
    OR?: ChatMessageCounterScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageCounterScalarWhereWithAggregatesInput | ChatMessageCounterScalarWhereWithAggregatesInput[]
    chatId?: StringWithAggregatesFilter<"ChatMessageCounter"> | string
    userId?: StringWithAggregatesFilter<"ChatMessageCounter"> | string
    lastMessageId?: StringNullableWithAggregatesFilter<"ChatMessageCounter"> | string | null
    unreadCount?: IntWithAggregatesFilter<"ChatMessageCounter"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMessageCounter"> | Date | string
  }

  export type ChatSummaryProjectionWhereInput = {
    AND?: ChatSummaryProjectionWhereInput | ChatSummaryProjectionWhereInput[]
    OR?: ChatSummaryProjectionWhereInput[]
    NOT?: ChatSummaryProjectionWhereInput | ChatSummaryProjectionWhereInput[]
    chatId?: StringFilter<"ChatSummaryProjection"> | string
    lastMessageId?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    lastMessagePreview?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    lastActivityAt?: DateTimeNullableFilter<"ChatSummaryProjection"> | Date | string | null
    lastSenderUserId?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    updatedAt?: DateTimeFilter<"ChatSummaryProjection"> | Date | string
  }

  export type ChatSummaryProjectionOrderByWithRelationInput = {
    chatId?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    lastMessagePreview?: SortOrderInput | SortOrder
    lastActivityAt?: SortOrderInput | SortOrder
    lastSenderUserId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionWhereUniqueInput = Prisma.AtLeast<{
    chatId?: string
    AND?: ChatSummaryProjectionWhereInput | ChatSummaryProjectionWhereInput[]
    OR?: ChatSummaryProjectionWhereInput[]
    NOT?: ChatSummaryProjectionWhereInput | ChatSummaryProjectionWhereInput[]
    lastMessageId?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    lastMessagePreview?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    lastActivityAt?: DateTimeNullableFilter<"ChatSummaryProjection"> | Date | string | null
    lastSenderUserId?: StringNullableFilter<"ChatSummaryProjection"> | string | null
    updatedAt?: DateTimeFilter<"ChatSummaryProjection"> | Date | string
  }, "chatId">

  export type ChatSummaryProjectionOrderByWithAggregationInput = {
    chatId?: SortOrder
    lastMessageId?: SortOrderInput | SortOrder
    lastMessagePreview?: SortOrderInput | SortOrder
    lastActivityAt?: SortOrderInput | SortOrder
    lastSenderUserId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ChatSummaryProjectionCountOrderByAggregateInput
    _max?: ChatSummaryProjectionMaxOrderByAggregateInput
    _min?: ChatSummaryProjectionMinOrderByAggregateInput
  }

  export type ChatSummaryProjectionScalarWhereWithAggregatesInput = {
    AND?: ChatSummaryProjectionScalarWhereWithAggregatesInput | ChatSummaryProjectionScalarWhereWithAggregatesInput[]
    OR?: ChatSummaryProjectionScalarWhereWithAggregatesInput[]
    NOT?: ChatSummaryProjectionScalarWhereWithAggregatesInput | ChatSummaryProjectionScalarWhereWithAggregatesInput[]
    chatId?: StringWithAggregatesFilter<"ChatSummaryProjection"> | string
    lastMessageId?: StringNullableWithAggregatesFilter<"ChatSummaryProjection"> | string | null
    lastMessagePreview?: StringNullableWithAggregatesFilter<"ChatSummaryProjection"> | string | null
    lastActivityAt?: DateTimeNullableWithAggregatesFilter<"ChatSummaryProjection"> | Date | string | null
    lastSenderUserId?: StringNullableWithAggregatesFilter<"ChatSummaryProjection"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ChatSummaryProjection"> | Date | string
  }

  export type ChatSummaryProjectionEventWhereInput = {
    AND?: ChatSummaryProjectionEventWhereInput | ChatSummaryProjectionEventWhereInput[]
    OR?: ChatSummaryProjectionEventWhereInput[]
    NOT?: ChatSummaryProjectionEventWhereInput | ChatSummaryProjectionEventWhereInput[]
    eventId?: StringFilter<"ChatSummaryProjectionEvent"> | string
    eventType?: StringFilter<"ChatSummaryProjectionEvent"> | string
    occurredAt?: DateTimeFilter<"ChatSummaryProjectionEvent"> | Date | string
    chatId?: StringNullableFilter<"ChatSummaryProjectionEvent"> | string | null
  }

  export type ChatSummaryProjectionEventOrderByWithRelationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    chatId?: SortOrderInput | SortOrder
  }

  export type ChatSummaryProjectionEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ChatSummaryProjectionEventWhereInput | ChatSummaryProjectionEventWhereInput[]
    OR?: ChatSummaryProjectionEventWhereInput[]
    NOT?: ChatSummaryProjectionEventWhereInput | ChatSummaryProjectionEventWhereInput[]
    eventType?: StringFilter<"ChatSummaryProjectionEvent"> | string
    occurredAt?: DateTimeFilter<"ChatSummaryProjectionEvent"> | Date | string
    chatId?: StringNullableFilter<"ChatSummaryProjectionEvent"> | string | null
  }, "eventId">

  export type ChatSummaryProjectionEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    chatId?: SortOrderInput | SortOrder
    _count?: ChatSummaryProjectionEventCountOrderByAggregateInput
    _max?: ChatSummaryProjectionEventMaxOrderByAggregateInput
    _min?: ChatSummaryProjectionEventMinOrderByAggregateInput
  }

  export type ChatSummaryProjectionEventScalarWhereWithAggregatesInput = {
    AND?: ChatSummaryProjectionEventScalarWhereWithAggregatesInput | ChatSummaryProjectionEventScalarWhereWithAggregatesInput[]
    OR?: ChatSummaryProjectionEventScalarWhereWithAggregatesInput[]
    NOT?: ChatSummaryProjectionEventScalarWhereWithAggregatesInput | ChatSummaryProjectionEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ChatSummaryProjectionEvent"> | string
    eventType?: StringWithAggregatesFilter<"ChatSummaryProjectionEvent"> | string
    occurredAt?: DateTimeWithAggregatesFilter<"ChatSummaryProjectionEvent"> | Date | string
    chatId?: StringNullableWithAggregatesFilter<"ChatSummaryProjectionEvent"> | string | null
  }

  export type ChatSummaryProjectionOffsetWhereInput = {
    AND?: ChatSummaryProjectionOffsetWhereInput | ChatSummaryProjectionOffsetWhereInput[]
    OR?: ChatSummaryProjectionOffsetWhereInput[]
    NOT?: ChatSummaryProjectionOffsetWhereInput | ChatSummaryProjectionOffsetWhereInput[]
    consumer?: StringFilter<"ChatSummaryProjectionOffset"> | string
    lastEventId?: StringNullableFilter<"ChatSummaryProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableFilter<"ChatSummaryProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeFilter<"ChatSummaryProjectionOffset"> | Date | string
  }

  export type ChatSummaryProjectionOffsetOrderByWithRelationInput = {
    consumer?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastOccurredAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionOffsetWhereUniqueInput = Prisma.AtLeast<{
    consumer?: string
    AND?: ChatSummaryProjectionOffsetWhereInput | ChatSummaryProjectionOffsetWhereInput[]
    OR?: ChatSummaryProjectionOffsetWhereInput[]
    NOT?: ChatSummaryProjectionOffsetWhereInput | ChatSummaryProjectionOffsetWhereInput[]
    lastEventId?: StringNullableFilter<"ChatSummaryProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableFilter<"ChatSummaryProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeFilter<"ChatSummaryProjectionOffset"> | Date | string
  }, "consumer">

  export type ChatSummaryProjectionOffsetOrderByWithAggregationInput = {
    consumer?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastOccurredAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ChatSummaryProjectionOffsetCountOrderByAggregateInput
    _max?: ChatSummaryProjectionOffsetMaxOrderByAggregateInput
    _min?: ChatSummaryProjectionOffsetMinOrderByAggregateInput
  }

  export type ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput = {
    AND?: ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput | ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput[]
    OR?: ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput[]
    NOT?: ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput | ChatSummaryProjectionOffsetScalarWhereWithAggregatesInput[]
    consumer?: StringWithAggregatesFilter<"ChatSummaryProjectionOffset"> | string
    lastEventId?: StringNullableWithAggregatesFilter<"ChatSummaryProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableWithAggregatesFilter<"ChatSummaryProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ChatSummaryProjectionOffset"> | Date | string
  }

  export type OutboxEventWhereInput = {
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    id?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    eventVersion?: IntFilter<"OutboxEvent"> | number
    aggregateId?: StringFilter<"OutboxEvent"> | string
    partitionKey?: StringFilter<"OutboxEvent"> | string
    payloadJson?: JsonFilter<"OutboxEvent">
    occurredAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    status?: EnumOutboxEventStatusFilter<"OutboxEvent"> | $Enums.OutboxEventStatus
    attemptCount?: IntFilter<"OutboxEvent"> | number
    lastError?: StringNullableFilter<"OutboxEvent"> | string | null
    lockedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    lockedBy?: StringNullableFilter<"OutboxEvent"> | string | null
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateId?: SortOrder
    partitionKey?: SortOrder
    payloadJson?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
  }

  export type OutboxEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    eventType?: StringFilter<"OutboxEvent"> | string
    eventVersion?: IntFilter<"OutboxEvent"> | number
    aggregateId?: StringFilter<"OutboxEvent"> | string
    partitionKey?: StringFilter<"OutboxEvent"> | string
    payloadJson?: JsonFilter<"OutboxEvent">
    occurredAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    status?: EnumOutboxEventStatusFilter<"OutboxEvent"> | $Enums.OutboxEventStatus
    attemptCount?: IntFilter<"OutboxEvent"> | number
    lastError?: StringNullableFilter<"OutboxEvent"> | string | null
    lockedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    lockedBy?: StringNullableFilter<"OutboxEvent"> | string | null
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateId?: SortOrder
    partitionKey?: SortOrder
    payloadJson?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    lastError?: SortOrderInput | SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
    _count?: OutboxEventCountOrderByAggregateInput
    _avg?: OutboxEventAvgOrderByAggregateInput
    _max?: OutboxEventMaxOrderByAggregateInput
    _min?: OutboxEventMinOrderByAggregateInput
    _sum?: OutboxEventSumOrderByAggregateInput
  }

  export type OutboxEventScalarWhereWithAggregatesInput = {
    AND?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    OR?: OutboxEventScalarWhereWithAggregatesInput[]
    NOT?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventVersion?: IntWithAggregatesFilter<"OutboxEvent"> | number
    aggregateId?: StringWithAggregatesFilter<"OutboxEvent"> | string
    partitionKey?: StringWithAggregatesFilter<"OutboxEvent"> | string
    payloadJson?: JsonWithAggregatesFilter<"OutboxEvent">
    occurredAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    status?: EnumOutboxEventStatusWithAggregatesFilter<"OutboxEvent"> | $Enums.OutboxEventStatus
    attemptCount?: IntWithAggregatesFilter<"OutboxEvent"> | number
    lastError?: StringNullableWithAggregatesFilter<"OutboxEvent"> | string | null
    lockedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    lockedBy?: StringNullableWithAggregatesFilter<"OutboxEvent"> | string | null
  }

  export type MessageCreateInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageAttachmentCreateInput = {
    id: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
    message: MessageCreateNestedOneWithoutAttachmentsInput
  }

  export type MessageAttachmentUncheckedCreateInput = {
    id: string
    messageId: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type MessageAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type MessageAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentCreateManyInput = {
    id: string
    messageId: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type MessageAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionCreateInput = {
    id: string
    userId: string
    emoji: string
    createdAt?: Date | string
    message: MessageCreateNestedOneWithoutReactionsInput
  }

  export type MessageReactionUncheckedCreateInput = {
    id: string
    messageId: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type MessageReactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionCreateManyInput = {
    id: string
    messageId: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionCreateInput = {
    id: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
    message: MessageCreateNestedOneWithoutRevisionsInput
  }

  export type MessageRevisionUncheckedCreateInput = {
    id: string
    messageId: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
  }

  export type MessageRevisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutRevisionsNestedInput
  }

  export type MessageRevisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionCreateManyInput = {
    id: string
    messageId: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
  }

  export type MessageRevisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadReceiptCreateInput = {
    id: string
    chatId: string
    userId: string
    lastReadMessageId: string
    updatedAt?: Date | string
  }

  export type ReadReceiptUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    lastReadMessageId: string
    updatedAt?: Date | string
  }

  export type ReadReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastReadMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastReadMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadReceiptCreateManyInput = {
    id: string
    chatId: string
    userId: string
    lastReadMessageId: string
    updatedAt?: Date | string
  }

  export type ReadReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastReadMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReadReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastReadMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptCreateInput = {
    id: string
    chatId: string
    userId: string
    lastDeliveredMessageId: string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    lastDeliveredMessageId: string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastDeliveredMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastDeliveredMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptCreateManyInput = {
    id: string
    chatId: string
    userId: string
    lastDeliveredMessageId: string
    updatedAt?: Date | string
  }

  export type DeliveryReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastDeliveredMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastDeliveredMessageId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCounterCreateInput = {
    chatId: string
    userId: string
    lastMessageId?: string | null
    unreadCount?: number
    updatedAt?: Date | string
  }

  export type ChatMessageCounterUncheckedCreateInput = {
    chatId: string
    userId: string
    lastMessageId?: string | null
    unreadCount?: number
    updatedAt?: Date | string
  }

  export type ChatMessageCounterUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    unreadCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCounterUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    unreadCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCounterCreateManyInput = {
    chatId: string
    userId: string
    lastMessageId?: string | null
    unreadCount?: number
    updatedAt?: Date | string
  }

  export type ChatMessageCounterUpdateManyMutationInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    unreadCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCounterUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    unreadCount?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionCreateInput = {
    chatId: string
    lastMessageId?: string | null
    lastMessagePreview?: string | null
    lastActivityAt?: Date | string | null
    lastSenderUserId?: string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionUncheckedCreateInput = {
    chatId: string
    lastMessageId?: string | null
    lastMessagePreview?: string | null
    lastActivityAt?: Date | string | null
    lastSenderUserId?: string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessagePreview?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivityAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSenderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessagePreview?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivityAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSenderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionCreateManyInput = {
    chatId: string
    lastMessageId?: string | null
    lastMessagePreview?: string | null
    lastActivityAt?: Date | string | null
    lastSenderUserId?: string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionUpdateManyMutationInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessagePreview?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivityAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSenderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    lastMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessagePreview?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivityAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSenderUserId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionEventCreateInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    chatId?: string | null
  }

  export type ChatSummaryProjectionEventUncheckedCreateInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    chatId?: string | null
  }

  export type ChatSummaryProjectionEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatSummaryProjectionEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatSummaryProjectionEventCreateManyInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    chatId?: string | null
  }

  export type ChatSummaryProjectionEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatSummaryProjectionEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatSummaryProjectionOffsetCreateInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionOffsetUncheckedCreateInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionOffsetUpdateInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionOffsetUncheckedUpdateInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionOffsetCreateManyInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatSummaryProjectionOffsetUpdateManyMutationInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSummaryProjectionOffsetUncheckedUpdateManyInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id: string
    eventType: string
    eventVersion: number
    aggregateId: string
    partitionKey: string
    payloadJson: JsonNullValueInput | InputJsonValue
    occurredAt: Date | string
    publishedAt?: Date | string | null
    status: $Enums.OutboxEventStatus
    attemptCount?: number
    lastError?: string | null
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type OutboxEventUncheckedCreateInput = {
    id: string
    eventType: string
    eventVersion: number
    aggregateId: string
    partitionKey: string
    payloadJson: JsonNullValueInput | InputJsonValue
    occurredAt: Date | string
    publishedAt?: Date | string | null
    status: $Enums.OutboxEventStatus
    attemptCount?: number
    lastError?: string | null
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    payloadJson?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumOutboxEventStatusFieldUpdateOperationsInput | $Enums.OutboxEventStatus
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    payloadJson?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumOutboxEventStatusFieldUpdateOperationsInput | $Enums.OutboxEventStatus
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventCreateManyInput = {
    id: string
    eventType: string
    eventVersion: number
    aggregateId: string
    partitionKey: string
    payloadJson: JsonNullValueInput | InputJsonValue
    occurredAt: Date | string
    publishedAt?: Date | string | null
    status: $Enums.OutboxEventStatus
    attemptCount?: number
    lastError?: string | null
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    payloadJson?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumOutboxEventStatusFieldUpdateOperationsInput | $Enums.OutboxEventStatus
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    payloadJson?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumOutboxEventStatusFieldUpdateOperationsInput | $Enums.OutboxEventStatus
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus
  }

  export type MessageAttachmentListRelationFilter = {
    every?: MessageAttachmentWhereInput
    some?: MessageAttachmentWhereInput
    none?: MessageAttachmentWhereInput
  }

  export type MessageReactionListRelationFilter = {
    every?: MessageReactionWhereInput
    some?: MessageReactionWhereInput
    none?: MessageReactionWhereInput
  }

  export type MessageRevisionListRelationFilter = {
    every?: MessageRevisionWhereInput
    some?: MessageRevisionWhereInput
    none?: MessageRevisionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageRevisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageChatIdClientMessageIdCompoundUniqueInput = {
    chatId: string
    clientMessageId: string
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    senderUserId?: SortOrder
    clientMessageId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    replyToMessageId?: SortOrder
    forwardedFromMessageId?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    deletedAt?: SortOrder
    status?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    senderUserId?: SortOrder
    clientMessageId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    replyToMessageId?: SortOrder
    forwardedFromMessageId?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    deletedAt?: SortOrder
    status?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    senderUserId?: SortOrder
    clientMessageId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    replyToMessageId?: SortOrder
    forwardedFromMessageId?: SortOrder
    createdAt?: SortOrder
    editedAt?: SortOrder
    deletedAt?: SortOrder
    status?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type MessageAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    mediaId?: SortOrder
    attachmentType?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type MessageAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    mediaId?: SortOrder
    attachmentType?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    mediaId?: SortOrder
    attachmentType?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MessageReactionMessageIdUserIdEmojiCompoundUniqueInput = {
    messageId: string
    userId: string
    emoji: string
  }

  export type MessageReactionCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageReactionMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageRevisionCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    previousText?: SortOrder
    editedByUserId?: SortOrder
    editedAt?: SortOrder
  }

  export type MessageRevisionMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    previousText?: SortOrder
    editedByUserId?: SortOrder
    editedAt?: SortOrder
  }

  export type MessageRevisionMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    previousText?: SortOrder
    editedByUserId?: SortOrder
    editedAt?: SortOrder
  }

  export type ReadReceiptChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ReadReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastReadMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastReadMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReadReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastReadMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type DeliveryReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastDeliveredMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastDeliveredMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    lastDeliveredMessageId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageCounterChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ChatMessageCounterCountOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    lastMessageId?: SortOrder
    unreadCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageCounterAvgOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type ChatMessageCounterMaxOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    lastMessageId?: SortOrder
    unreadCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageCounterMinOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    lastMessageId?: SortOrder
    unreadCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageCounterSumOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type ChatSummaryProjectionCountOrderByAggregateInput = {
    chatId?: SortOrder
    lastMessageId?: SortOrder
    lastMessagePreview?: SortOrder
    lastActivityAt?: SortOrder
    lastSenderUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionMaxOrderByAggregateInput = {
    chatId?: SortOrder
    lastMessageId?: SortOrder
    lastMessagePreview?: SortOrder
    lastActivityAt?: SortOrder
    lastSenderUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionMinOrderByAggregateInput = {
    chatId?: SortOrder
    lastMessageId?: SortOrder
    lastMessagePreview?: SortOrder
    lastActivityAt?: SortOrder
    lastSenderUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    chatId?: SortOrder
  }

  export type ChatSummaryProjectionEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    chatId?: SortOrder
  }

  export type ChatSummaryProjectionEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    chatId?: SortOrder
  }

  export type ChatSummaryProjectionOffsetCountOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionOffsetMaxOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSummaryProjectionOffsetMinOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumOutboxEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxEventStatus | EnumOutboxEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxEventStatusFilter<$PrismaModel> | $Enums.OutboxEventStatus
  }

  export type OutboxEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateId?: SortOrder
    partitionKey?: SortOrder
    payloadJson?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    lastError?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type OutboxEventAvgOrderByAggregateInput = {
    eventVersion?: SortOrder
    attemptCount?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateId?: SortOrder
    partitionKey?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    lastError?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateId?: SortOrder
    partitionKey?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    lastError?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type OutboxEventSumOrderByAggregateInput = {
    eventVersion?: SortOrder
    attemptCount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumOutboxEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxEventStatus | EnumOutboxEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOutboxEventStatusFilter<$PrismaModel>
    _max?: NestedEnumOutboxEventStatusFilter<$PrismaModel>
  }

  export type MessageAttachmentCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
  }

  export type MessageReactionCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
  }

  export type MessageRevisionCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput> | MessageRevisionCreateWithoutMessageInput[] | MessageRevisionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageRevisionCreateOrConnectWithoutMessageInput | MessageRevisionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageRevisionCreateManyMessageInputEnvelope
    connect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
  }

  export type MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
  }

  export type MessageReactionUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
  }

  export type MessageRevisionUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput> | MessageRevisionCreateWithoutMessageInput[] | MessageRevisionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageRevisionCreateOrConnectWithoutMessageInput | MessageRevisionCreateOrConnectWithoutMessageInput[]
    createMany?: MessageRevisionCreateManyMessageInputEnvelope
    connect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumMessageStatusFieldUpdateOperationsInput = {
    set?: $Enums.MessageStatus
  }

  export type MessageAttachmentUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    set?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    disconnect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    delete?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    update?: MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageAttachmentUpdateManyWithWhereWithoutMessageInput | MessageAttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
  }

  export type MessageReactionUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageReactionUpsertWithWhereUniqueWithoutMessageInput | MessageReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    set?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    disconnect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    delete?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    update?: MessageReactionUpdateWithWhereUniqueWithoutMessageInput | MessageReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageReactionUpdateManyWithWhereWithoutMessageInput | MessageReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
  }

  export type MessageRevisionUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput> | MessageRevisionCreateWithoutMessageInput[] | MessageRevisionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageRevisionCreateOrConnectWithoutMessageInput | MessageRevisionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageRevisionUpsertWithWhereUniqueWithoutMessageInput | MessageRevisionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageRevisionCreateManyMessageInputEnvelope
    set?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    disconnect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    delete?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    connect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    update?: MessageRevisionUpdateWithWhereUniqueWithoutMessageInput | MessageRevisionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageRevisionUpdateManyWithWhereWithoutMessageInput | MessageRevisionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageRevisionScalarWhereInput | MessageRevisionScalarWhereInput[]
  }

  export type MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    set?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    disconnect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    delete?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    update?: MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageAttachmentUpdateManyWithWhereWithoutMessageInput | MessageAttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
  }

  export type MessageReactionUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput> | MessageReactionCreateWithoutMessageInput[] | MessageReactionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageReactionCreateOrConnectWithoutMessageInput | MessageReactionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageReactionUpsertWithWhereUniqueWithoutMessageInput | MessageReactionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageReactionCreateManyMessageInputEnvelope
    set?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    disconnect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    delete?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    connect?: MessageReactionWhereUniqueInput | MessageReactionWhereUniqueInput[]
    update?: MessageReactionUpdateWithWhereUniqueWithoutMessageInput | MessageReactionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageReactionUpdateManyWithWhereWithoutMessageInput | MessageReactionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
  }

  export type MessageRevisionUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput> | MessageRevisionCreateWithoutMessageInput[] | MessageRevisionUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageRevisionCreateOrConnectWithoutMessageInput | MessageRevisionCreateOrConnectWithoutMessageInput[]
    upsert?: MessageRevisionUpsertWithWhereUniqueWithoutMessageInput | MessageRevisionUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageRevisionCreateManyMessageInputEnvelope
    set?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    disconnect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    delete?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    connect?: MessageRevisionWhereUniqueInput | MessageRevisionWhereUniqueInput[]
    update?: MessageRevisionUpdateWithWhereUniqueWithoutMessageInput | MessageRevisionUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageRevisionUpdateManyWithWhereWithoutMessageInput | MessageRevisionUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageRevisionScalarWhereInput | MessageRevisionScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MessageUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    upsert?: MessageUpsertWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutAttachmentsInput, MessageUpdateWithoutAttachmentsInput>, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type MessageCreateNestedOneWithoutReactionsInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutReactionsInput
    upsert?: MessageUpsertWithoutReactionsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutReactionsInput, MessageUpdateWithoutReactionsInput>, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type MessageCreateNestedOneWithoutRevisionsInput = {
    create?: XOR<MessageCreateWithoutRevisionsInput, MessageUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRevisionsInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUpdateOneRequiredWithoutRevisionsNestedInput = {
    create?: XOR<MessageCreateWithoutRevisionsInput, MessageUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutRevisionsInput
    upsert?: MessageUpsertWithoutRevisionsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutRevisionsInput, MessageUpdateWithoutRevisionsInput>, MessageUncheckedUpdateWithoutRevisionsInput>
  }

  export type EnumOutboxEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.OutboxEventStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageStatus[] | ListEnumMessageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumOutboxEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxEventStatus | EnumOutboxEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxEventStatusFilter<$PrismaModel> | $Enums.OutboxEventStatus
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumOutboxEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxEventStatus | EnumOutboxEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOutboxEventStatusFilter<$PrismaModel>
    _max?: NestedEnumOutboxEventStatusFilter<$PrismaModel>
  }

  export type MessageAttachmentCreateWithoutMessageInput = {
    id: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type MessageAttachmentUncheckedCreateWithoutMessageInput = {
    id: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type MessageAttachmentCreateOrConnectWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    create: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput>
  }

  export type MessageAttachmentCreateManyMessageInputEnvelope = {
    data: MessageAttachmentCreateManyMessageInput | MessageAttachmentCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type MessageReactionCreateWithoutMessageInput = {
    id: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionUncheckedCreateWithoutMessageInput = {
    id: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageReactionCreateOrConnectWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    create: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput>
  }

  export type MessageReactionCreateManyMessageInputEnvelope = {
    data: MessageReactionCreateManyMessageInput | MessageReactionCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type MessageRevisionCreateWithoutMessageInput = {
    id: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
  }

  export type MessageRevisionUncheckedCreateWithoutMessageInput = {
    id: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
  }

  export type MessageRevisionCreateOrConnectWithoutMessageInput = {
    where: MessageRevisionWhereUniqueInput
    create: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput>
  }

  export type MessageRevisionCreateManyMessageInputEnvelope = {
    data: MessageRevisionCreateManyMessageInput | MessageRevisionCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    update: XOR<MessageAttachmentUpdateWithoutMessageInput, MessageAttachmentUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput>
  }

  export type MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    data: XOR<MessageAttachmentUpdateWithoutMessageInput, MessageAttachmentUncheckedUpdateWithoutMessageInput>
  }

  export type MessageAttachmentUpdateManyWithWhereWithoutMessageInput = {
    where: MessageAttachmentScalarWhereInput
    data: XOR<MessageAttachmentUpdateManyMutationInput, MessageAttachmentUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageAttachmentScalarWhereInput = {
    AND?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
    OR?: MessageAttachmentScalarWhereInput[]
    NOT?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
    id?: StringFilter<"MessageAttachment"> | string
    messageId?: StringFilter<"MessageAttachment"> | string
    mediaId?: StringFilter<"MessageAttachment"> | string
    attachmentType?: StringFilter<"MessageAttachment"> | string
    sortOrder?: IntFilter<"MessageAttachment"> | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
  }

  export type MessageReactionUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    update: XOR<MessageReactionUpdateWithoutMessageInput, MessageReactionUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageReactionCreateWithoutMessageInput, MessageReactionUncheckedCreateWithoutMessageInput>
  }

  export type MessageReactionUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageReactionWhereUniqueInput
    data: XOR<MessageReactionUpdateWithoutMessageInput, MessageReactionUncheckedUpdateWithoutMessageInput>
  }

  export type MessageReactionUpdateManyWithWhereWithoutMessageInput = {
    where: MessageReactionScalarWhereInput
    data: XOR<MessageReactionUpdateManyMutationInput, MessageReactionUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageReactionScalarWhereInput = {
    AND?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
    OR?: MessageReactionScalarWhereInput[]
    NOT?: MessageReactionScalarWhereInput | MessageReactionScalarWhereInput[]
    id?: StringFilter<"MessageReaction"> | string
    messageId?: StringFilter<"MessageReaction"> | string
    userId?: StringFilter<"MessageReaction"> | string
    emoji?: StringFilter<"MessageReaction"> | string
    createdAt?: DateTimeFilter<"MessageReaction"> | Date | string
  }

  export type MessageRevisionUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageRevisionWhereUniqueInput
    update: XOR<MessageRevisionUpdateWithoutMessageInput, MessageRevisionUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageRevisionCreateWithoutMessageInput, MessageRevisionUncheckedCreateWithoutMessageInput>
  }

  export type MessageRevisionUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageRevisionWhereUniqueInput
    data: XOR<MessageRevisionUpdateWithoutMessageInput, MessageRevisionUncheckedUpdateWithoutMessageInput>
  }

  export type MessageRevisionUpdateManyWithWhereWithoutMessageInput = {
    where: MessageRevisionScalarWhereInput
    data: XOR<MessageRevisionUpdateManyMutationInput, MessageRevisionUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageRevisionScalarWhereInput = {
    AND?: MessageRevisionScalarWhereInput | MessageRevisionScalarWhereInput[]
    OR?: MessageRevisionScalarWhereInput[]
    NOT?: MessageRevisionScalarWhereInput | MessageRevisionScalarWhereInput[]
    id?: StringFilter<"MessageRevision"> | string
    messageId?: StringFilter<"MessageRevision"> | string
    previousText?: StringNullableFilter<"MessageRevision"> | string | null
    editedByUserId?: StringFilter<"MessageRevision"> | string
    editedAt?: DateTimeFilter<"MessageRevision"> | Date | string
  }

  export type MessageCreateWithoutAttachmentsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutAttachmentsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutAttachmentsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
  }

  export type MessageUpsertWithoutAttachmentsInput = {
    update: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type MessageUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateWithoutReactionsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutReactionsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
    revisions?: MessageRevisionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutReactionsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
  }

  export type MessageUpsertWithoutReactionsInput = {
    update: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
    create: XOR<MessageCreateWithoutReactionsInput, MessageUncheckedCreateWithoutReactionsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutReactionsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutReactionsInput, MessageUncheckedUpdateWithoutReactionsInput>
  }

  export type MessageUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
    revisions?: MessageRevisionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateWithoutRevisionsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
    reactions?: MessageReactionCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutRevisionsInput = {
    id: string
    chatId: string
    senderUserId: string
    clientMessageId: string
    type: $Enums.MessageType
    text?: string | null
    replyToMessageId?: string | null
    forwardedFromMessageId?: string | null
    createdAt?: Date | string
    editedAt?: Date | string | null
    deletedAt?: Date | string | null
    status?: $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
    reactions?: MessageReactionUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutRevisionsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRevisionsInput, MessageUncheckedCreateWithoutRevisionsInput>
  }

  export type MessageUpsertWithoutRevisionsInput = {
    update: XOR<MessageUpdateWithoutRevisionsInput, MessageUncheckedUpdateWithoutRevisionsInput>
    create: XOR<MessageCreateWithoutRevisionsInput, MessageUncheckedCreateWithoutRevisionsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutRevisionsInput, MessageUncheckedUpdateWithoutRevisionsInput>
  }

  export type MessageUpdateWithoutRevisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
    reactions?: MessageReactionUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutRevisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    senderUserId?: StringFieldUpdateOperationsInput | string
    clientMessageId?: StringFieldUpdateOperationsInput | string
    type?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    text?: NullableStringFieldUpdateOperationsInput | string | null
    replyToMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    forwardedFromMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    editedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
    reactions?: MessageReactionUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageAttachmentCreateManyMessageInput = {
    id: string
    mediaId: string
    attachmentType: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type MessageReactionCreateManyMessageInput = {
    id: string
    userId: string
    emoji: string
    createdAt?: Date | string
  }

  export type MessageRevisionCreateManyMessageInput = {
    id: string
    previousText?: string | null
    editedByUserId: string
    editedAt: Date | string
  }

  export type MessageAttachmentUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    attachmentType?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageReactionUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRevisionUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousText?: NullableStringFieldUpdateOperationsInput | string | null
    editedByUserId?: StringFieldUpdateOperationsInput | string
    editedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}