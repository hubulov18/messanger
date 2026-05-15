
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
 * Model MediaObject
 * 
 */
export type MediaObject = $Result.DefaultSelection<Prisma.$MediaObjectPayload>
/**
 * Model MediaVariant
 * 
 */
export type MediaVariant = $Result.DefaultSelection<Prisma.$MediaVariantPayload>
/**
 * Model UploadSession
 * 
 */
export type UploadSession = $Result.DefaultSelection<Prisma.$UploadSessionPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MediaType: {
  image: 'image',
  video: 'video',
  audio: 'audio',
  file: 'file',
  avatar: 'avatar'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const ProcessingStatus: {
  pending: 'pending',
  uploaded: 'uploaded',
  processing: 'processing',
  ready: 'ready',
  failed: 'failed',
  deleted: 'deleted'
};

export type ProcessingStatus = (typeof ProcessingStatus)[keyof typeof ProcessingStatus]


export const UploadSessionStatus: {
  pending: 'pending',
  uploaded: 'uploaded',
  expired: 'expired',
  cancelled: 'cancelled'
};

export type UploadSessionStatus = (typeof UploadSessionStatus)[keyof typeof UploadSessionStatus]


export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type ProcessingStatus = $Enums.ProcessingStatus

export const ProcessingStatus: typeof $Enums.ProcessingStatus

export type UploadSessionStatus = $Enums.UploadSessionStatus

export const UploadSessionStatus: typeof $Enums.UploadSessionStatus

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MediaObjects
 * const mediaObjects = await prisma.mediaObject.findMany()
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
   * // Fetch zero or more MediaObjects
   * const mediaObjects = await prisma.mediaObject.findMany()
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
   * `prisma.mediaObject`: Exposes CRUD operations for the **MediaObject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaObjects
    * const mediaObjects = await prisma.mediaObject.findMany()
    * ```
    */
  get mediaObject(): Prisma.MediaObjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaVariant`: Exposes CRUD operations for the **MediaVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaVariants
    * const mediaVariants = await prisma.mediaVariant.findMany()
    * ```
    */
  get mediaVariant(): Prisma.MediaVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadSession`: Exposes CRUD operations for the **UploadSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadSessions
    * const uploadSessions = await prisma.uploadSession.findMany()
    * ```
    */
  get uploadSession(): Prisma.UploadSessionDelegate<ExtArgs, ClientOptions>;

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
    MediaObject: 'MediaObject',
    MediaVariant: 'MediaVariant',
    UploadSession: 'UploadSession',
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
      modelProps: "mediaObject" | "mediaVariant" | "uploadSession" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MediaObject: {
        payload: Prisma.$MediaObjectPayload<ExtArgs>
        fields: Prisma.MediaObjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaObjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaObjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          findFirst: {
            args: Prisma.MediaObjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaObjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          findMany: {
            args: Prisma.MediaObjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>[]
          }
          create: {
            args: Prisma.MediaObjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          createMany: {
            args: Prisma.MediaObjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaObjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>[]
          }
          delete: {
            args: Prisma.MediaObjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          update: {
            args: Prisma.MediaObjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          deleteMany: {
            args: Prisma.MediaObjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaObjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaObjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>[]
          }
          upsert: {
            args: Prisma.MediaObjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaObjectPayload>
          }
          aggregate: {
            args: Prisma.MediaObjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaObject>
          }
          groupBy: {
            args: Prisma.MediaObjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaObjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaObjectCountArgs<ExtArgs>
            result: $Utils.Optional<MediaObjectCountAggregateOutputType> | number
          }
        }
      }
      MediaVariant: {
        payload: Prisma.$MediaVariantPayload<ExtArgs>
        fields: Prisma.MediaVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          findFirst: {
            args: Prisma.MediaVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          findMany: {
            args: Prisma.MediaVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>[]
          }
          create: {
            args: Prisma.MediaVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          createMany: {
            args: Prisma.MediaVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>[]
          }
          delete: {
            args: Prisma.MediaVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          update: {
            args: Prisma.MediaVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          deleteMany: {
            args: Prisma.MediaVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>[]
          }
          upsert: {
            args: Prisma.MediaVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaVariantPayload>
          }
          aggregate: {
            args: Prisma.MediaVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaVariant>
          }
          groupBy: {
            args: Prisma.MediaVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaVariantCountArgs<ExtArgs>
            result: $Utils.Optional<MediaVariantCountAggregateOutputType> | number
          }
        }
      }
      UploadSession: {
        payload: Prisma.$UploadSessionPayload<ExtArgs>
        fields: Prisma.UploadSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findFirst: {
            args: Prisma.UploadSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findMany: {
            args: Prisma.UploadSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          create: {
            args: Prisma.UploadSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          createMany: {
            args: Prisma.UploadSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          delete: {
            args: Prisma.UploadSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          update: {
            args: Prisma.UploadSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          deleteMany: {
            args: Prisma.UploadSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          upsert: {
            args: Prisma.UploadSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          aggregate: {
            args: Prisma.UploadSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadSession>
          }
          groupBy: {
            args: Prisma.UploadSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionCountAggregateOutputType> | number
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
    mediaObject?: MediaObjectOmit
    mediaVariant?: MediaVariantOmit
    uploadSession?: UploadSessionOmit
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
   * Count Type MediaObjectCountOutputType
   */

  export type MediaObjectCountOutputType = {
    variants: number
    uploadSessions: number
  }

  export type MediaObjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | MediaObjectCountOutputTypeCountVariantsArgs
    uploadSessions?: boolean | MediaObjectCountOutputTypeCountUploadSessionsArgs
  }

  // Custom InputTypes
  /**
   * MediaObjectCountOutputType without action
   */
  export type MediaObjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObjectCountOutputType
     */
    select?: MediaObjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaObjectCountOutputType without action
   */
  export type MediaObjectCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaVariantWhereInput
  }

  /**
   * MediaObjectCountOutputType without action
   */
  export type MediaObjectCountOutputTypeCountUploadSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MediaObject
   */

  export type AggregateMediaObject = {
    _count: MediaObjectCountAggregateOutputType | null
    _avg: MediaObjectAvgAggregateOutputType | null
    _sum: MediaObjectSumAggregateOutputType | null
    _min: MediaObjectMinAggregateOutputType | null
    _max: MediaObjectMaxAggregateOutputType | null
  }

  export type MediaObjectAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type MediaObjectSumAggregateOutputType = {
    sizeBytes: bigint | null
  }

  export type MediaObjectMinAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    storageKey: string | null
    mediaType: $Enums.MediaType | null
    mimeType: string | null
    sizeBytes: bigint | null
    checksum: string | null
    processingStatus: $Enums.ProcessingStatus | null
    createdAt: Date | null
    processedAt: Date | null
    deletedAt: Date | null
  }

  export type MediaObjectMaxAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    storageKey: string | null
    mediaType: $Enums.MediaType | null
    mimeType: string | null
    sizeBytes: bigint | null
    checksum: string | null
    processingStatus: $Enums.ProcessingStatus | null
    createdAt: Date | null
    processedAt: Date | null
    deletedAt: Date | null
  }

  export type MediaObjectCountAggregateOutputType = {
    id: number
    ownerUserId: number
    storageKey: number
    mediaType: number
    mimeType: number
    sizeBytes: number
    checksum: number
    processingStatus: number
    createdAt: number
    processedAt: number
    deletedAt: number
    _all: number
  }


  export type MediaObjectAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type MediaObjectSumAggregateInputType = {
    sizeBytes?: true
  }

  export type MediaObjectMinAggregateInputType = {
    id?: true
    ownerUserId?: true
    storageKey?: true
    mediaType?: true
    mimeType?: true
    sizeBytes?: true
    checksum?: true
    processingStatus?: true
    createdAt?: true
    processedAt?: true
    deletedAt?: true
  }

  export type MediaObjectMaxAggregateInputType = {
    id?: true
    ownerUserId?: true
    storageKey?: true
    mediaType?: true
    mimeType?: true
    sizeBytes?: true
    checksum?: true
    processingStatus?: true
    createdAt?: true
    processedAt?: true
    deletedAt?: true
  }

  export type MediaObjectCountAggregateInputType = {
    id?: true
    ownerUserId?: true
    storageKey?: true
    mediaType?: true
    mimeType?: true
    sizeBytes?: true
    checksum?: true
    processingStatus?: true
    createdAt?: true
    processedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type MediaObjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaObject to aggregate.
     */
    where?: MediaObjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaObjects to fetch.
     */
    orderBy?: MediaObjectOrderByWithRelationInput | MediaObjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaObjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaObjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaObjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaObjects
    **/
    _count?: true | MediaObjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaObjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaObjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaObjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaObjectMaxAggregateInputType
  }

  export type GetMediaObjectAggregateType<T extends MediaObjectAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaObject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaObject[P]>
      : GetScalarType<T[P], AggregateMediaObject[P]>
  }




  export type MediaObjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaObjectWhereInput
    orderBy?: MediaObjectOrderByWithAggregationInput | MediaObjectOrderByWithAggregationInput[]
    by: MediaObjectScalarFieldEnum[] | MediaObjectScalarFieldEnum
    having?: MediaObjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaObjectCountAggregateInputType | true
    _avg?: MediaObjectAvgAggregateInputType
    _sum?: MediaObjectSumAggregateInputType
    _min?: MediaObjectMinAggregateInputType
    _max?: MediaObjectMaxAggregateInputType
  }

  export type MediaObjectGroupByOutputType = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint
    checksum: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt: Date
    processedAt: Date | null
    deletedAt: Date | null
    _count: MediaObjectCountAggregateOutputType | null
    _avg: MediaObjectAvgAggregateOutputType | null
    _sum: MediaObjectSumAggregateOutputType | null
    _min: MediaObjectMinAggregateOutputType | null
    _max: MediaObjectMaxAggregateOutputType | null
  }

  type GetMediaObjectGroupByPayload<T extends MediaObjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaObjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaObjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaObjectGroupByOutputType[P]>
            : GetScalarType<T[P], MediaObjectGroupByOutputType[P]>
        }
      >
    >


  export type MediaObjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    storageKey?: boolean
    mediaType?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    checksum?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    processedAt?: boolean
    deletedAt?: boolean
    variants?: boolean | MediaObject$variantsArgs<ExtArgs>
    uploadSessions?: boolean | MediaObject$uploadSessionsArgs<ExtArgs>
    _count?: boolean | MediaObjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaObject"]>

  export type MediaObjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    storageKey?: boolean
    mediaType?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    checksum?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    processedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["mediaObject"]>

  export type MediaObjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    storageKey?: boolean
    mediaType?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    checksum?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    processedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["mediaObject"]>

  export type MediaObjectSelectScalar = {
    id?: boolean
    ownerUserId?: boolean
    storageKey?: boolean
    mediaType?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    checksum?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    processedAt?: boolean
    deletedAt?: boolean
  }

  export type MediaObjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerUserId" | "storageKey" | "mediaType" | "mimeType" | "sizeBytes" | "checksum" | "processingStatus" | "createdAt" | "processedAt" | "deletedAt", ExtArgs["result"]["mediaObject"]>
  export type MediaObjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | MediaObject$variantsArgs<ExtArgs>
    uploadSessions?: boolean | MediaObject$uploadSessionsArgs<ExtArgs>
    _count?: boolean | MediaObjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MediaObjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MediaObjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MediaObjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaObject"
    objects: {
      variants: Prisma.$MediaVariantPayload<ExtArgs>[]
      uploadSessions: Prisma.$UploadSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerUserId: string
      storageKey: string
      mediaType: $Enums.MediaType
      mimeType: string
      sizeBytes: bigint
      checksum: string | null
      processingStatus: $Enums.ProcessingStatus
      createdAt: Date
      processedAt: Date | null
      deletedAt: Date | null
    }, ExtArgs["result"]["mediaObject"]>
    composites: {}
  }

  type MediaObjectGetPayload<S extends boolean | null | undefined | MediaObjectDefaultArgs> = $Result.GetResult<Prisma.$MediaObjectPayload, S>

  type MediaObjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaObjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaObjectCountAggregateInputType | true
    }

  export interface MediaObjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaObject'], meta: { name: 'MediaObject' } }
    /**
     * Find zero or one MediaObject that matches the filter.
     * @param {MediaObjectFindUniqueArgs} args - Arguments to find a MediaObject
     * @example
     * // Get one MediaObject
     * const mediaObject = await prisma.mediaObject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaObjectFindUniqueArgs>(args: SelectSubset<T, MediaObjectFindUniqueArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaObject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaObjectFindUniqueOrThrowArgs} args - Arguments to find a MediaObject
     * @example
     * // Get one MediaObject
     * const mediaObject = await prisma.mediaObject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaObjectFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaObjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaObject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectFindFirstArgs} args - Arguments to find a MediaObject
     * @example
     * // Get one MediaObject
     * const mediaObject = await prisma.mediaObject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaObjectFindFirstArgs>(args?: SelectSubset<T, MediaObjectFindFirstArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaObject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectFindFirstOrThrowArgs} args - Arguments to find a MediaObject
     * @example
     * // Get one MediaObject
     * const mediaObject = await prisma.mediaObject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaObjectFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaObjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaObjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaObjects
     * const mediaObjects = await prisma.mediaObject.findMany()
     * 
     * // Get first 10 MediaObjects
     * const mediaObjects = await prisma.mediaObject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaObjectWithIdOnly = await prisma.mediaObject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaObjectFindManyArgs>(args?: SelectSubset<T, MediaObjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaObject.
     * @param {MediaObjectCreateArgs} args - Arguments to create a MediaObject.
     * @example
     * // Create one MediaObject
     * const MediaObject = await prisma.mediaObject.create({
     *   data: {
     *     // ... data to create a MediaObject
     *   }
     * })
     * 
     */
    create<T extends MediaObjectCreateArgs>(args: SelectSubset<T, MediaObjectCreateArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaObjects.
     * @param {MediaObjectCreateManyArgs} args - Arguments to create many MediaObjects.
     * @example
     * // Create many MediaObjects
     * const mediaObject = await prisma.mediaObject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaObjectCreateManyArgs>(args?: SelectSubset<T, MediaObjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaObjects and returns the data saved in the database.
     * @param {MediaObjectCreateManyAndReturnArgs} args - Arguments to create many MediaObjects.
     * @example
     * // Create many MediaObjects
     * const mediaObject = await prisma.mediaObject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaObjects and only return the `id`
     * const mediaObjectWithIdOnly = await prisma.mediaObject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaObjectCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaObjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaObject.
     * @param {MediaObjectDeleteArgs} args - Arguments to delete one MediaObject.
     * @example
     * // Delete one MediaObject
     * const MediaObject = await prisma.mediaObject.delete({
     *   where: {
     *     // ... filter to delete one MediaObject
     *   }
     * })
     * 
     */
    delete<T extends MediaObjectDeleteArgs>(args: SelectSubset<T, MediaObjectDeleteArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaObject.
     * @param {MediaObjectUpdateArgs} args - Arguments to update one MediaObject.
     * @example
     * // Update one MediaObject
     * const mediaObject = await prisma.mediaObject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaObjectUpdateArgs>(args: SelectSubset<T, MediaObjectUpdateArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaObjects.
     * @param {MediaObjectDeleteManyArgs} args - Arguments to filter MediaObjects to delete.
     * @example
     * // Delete a few MediaObjects
     * const { count } = await prisma.mediaObject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaObjectDeleteManyArgs>(args?: SelectSubset<T, MediaObjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaObjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaObjects
     * const mediaObject = await prisma.mediaObject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaObjectUpdateManyArgs>(args: SelectSubset<T, MediaObjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaObjects and returns the data updated in the database.
     * @param {MediaObjectUpdateManyAndReturnArgs} args - Arguments to update many MediaObjects.
     * @example
     * // Update many MediaObjects
     * const mediaObject = await prisma.mediaObject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaObjects and only return the `id`
     * const mediaObjectWithIdOnly = await prisma.mediaObject.updateManyAndReturn({
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
    updateManyAndReturn<T extends MediaObjectUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaObjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaObject.
     * @param {MediaObjectUpsertArgs} args - Arguments to update or create a MediaObject.
     * @example
     * // Update or create a MediaObject
     * const mediaObject = await prisma.mediaObject.upsert({
     *   create: {
     *     // ... data to create a MediaObject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaObject we want to update
     *   }
     * })
     */
    upsert<T extends MediaObjectUpsertArgs>(args: SelectSubset<T, MediaObjectUpsertArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaObjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectCountArgs} args - Arguments to filter MediaObjects to count.
     * @example
     * // Count the number of MediaObjects
     * const count = await prisma.mediaObject.count({
     *   where: {
     *     // ... the filter for the MediaObjects we want to count
     *   }
     * })
    **/
    count<T extends MediaObjectCountArgs>(
      args?: Subset<T, MediaObjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaObjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaObject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MediaObjectAggregateArgs>(args: Subset<T, MediaObjectAggregateArgs>): Prisma.PrismaPromise<GetMediaObjectAggregateType<T>>

    /**
     * Group by MediaObject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaObjectGroupByArgs} args - Group by arguments.
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
      T extends MediaObjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaObjectGroupByArgs['orderBy'] }
        : { orderBy?: MediaObjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MediaObjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaObjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaObject model
   */
  readonly fields: MediaObjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaObject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaObjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variants<T extends MediaObject$variantsArgs<ExtArgs> = {}>(args?: Subset<T, MediaObject$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadSessions<T extends MediaObject$uploadSessionsArgs<ExtArgs> = {}>(args?: Subset<T, MediaObject$uploadSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MediaObject model
   */
  interface MediaObjectFieldRefs {
    readonly id: FieldRef<"MediaObject", 'String'>
    readonly ownerUserId: FieldRef<"MediaObject", 'String'>
    readonly storageKey: FieldRef<"MediaObject", 'String'>
    readonly mediaType: FieldRef<"MediaObject", 'MediaType'>
    readonly mimeType: FieldRef<"MediaObject", 'String'>
    readonly sizeBytes: FieldRef<"MediaObject", 'BigInt'>
    readonly checksum: FieldRef<"MediaObject", 'String'>
    readonly processingStatus: FieldRef<"MediaObject", 'ProcessingStatus'>
    readonly createdAt: FieldRef<"MediaObject", 'DateTime'>
    readonly processedAt: FieldRef<"MediaObject", 'DateTime'>
    readonly deletedAt: FieldRef<"MediaObject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaObject findUnique
   */
  export type MediaObjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter, which MediaObject to fetch.
     */
    where: MediaObjectWhereUniqueInput
  }

  /**
   * MediaObject findUniqueOrThrow
   */
  export type MediaObjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter, which MediaObject to fetch.
     */
    where: MediaObjectWhereUniqueInput
  }

  /**
   * MediaObject findFirst
   */
  export type MediaObjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter, which MediaObject to fetch.
     */
    where?: MediaObjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaObjects to fetch.
     */
    orderBy?: MediaObjectOrderByWithRelationInput | MediaObjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaObjects.
     */
    cursor?: MediaObjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaObjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaObjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaObjects.
     */
    distinct?: MediaObjectScalarFieldEnum | MediaObjectScalarFieldEnum[]
  }

  /**
   * MediaObject findFirstOrThrow
   */
  export type MediaObjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter, which MediaObject to fetch.
     */
    where?: MediaObjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaObjects to fetch.
     */
    orderBy?: MediaObjectOrderByWithRelationInput | MediaObjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaObjects.
     */
    cursor?: MediaObjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaObjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaObjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaObjects.
     */
    distinct?: MediaObjectScalarFieldEnum | MediaObjectScalarFieldEnum[]
  }

  /**
   * MediaObject findMany
   */
  export type MediaObjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter, which MediaObjects to fetch.
     */
    where?: MediaObjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaObjects to fetch.
     */
    orderBy?: MediaObjectOrderByWithRelationInput | MediaObjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaObjects.
     */
    cursor?: MediaObjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaObjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaObjects.
     */
    skip?: number
    distinct?: MediaObjectScalarFieldEnum | MediaObjectScalarFieldEnum[]
  }

  /**
   * MediaObject create
   */
  export type MediaObjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaObject.
     */
    data: XOR<MediaObjectCreateInput, MediaObjectUncheckedCreateInput>
  }

  /**
   * MediaObject createMany
   */
  export type MediaObjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaObjects.
     */
    data: MediaObjectCreateManyInput | MediaObjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaObject createManyAndReturn
   */
  export type MediaObjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * The data used to create many MediaObjects.
     */
    data: MediaObjectCreateManyInput | MediaObjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaObject update
   */
  export type MediaObjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaObject.
     */
    data: XOR<MediaObjectUpdateInput, MediaObjectUncheckedUpdateInput>
    /**
     * Choose, which MediaObject to update.
     */
    where: MediaObjectWhereUniqueInput
  }

  /**
   * MediaObject updateMany
   */
  export type MediaObjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaObjects.
     */
    data: XOR<MediaObjectUpdateManyMutationInput, MediaObjectUncheckedUpdateManyInput>
    /**
     * Filter which MediaObjects to update
     */
    where?: MediaObjectWhereInput
    /**
     * Limit how many MediaObjects to update.
     */
    limit?: number
  }

  /**
   * MediaObject updateManyAndReturn
   */
  export type MediaObjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * The data used to update MediaObjects.
     */
    data: XOR<MediaObjectUpdateManyMutationInput, MediaObjectUncheckedUpdateManyInput>
    /**
     * Filter which MediaObjects to update
     */
    where?: MediaObjectWhereInput
    /**
     * Limit how many MediaObjects to update.
     */
    limit?: number
  }

  /**
   * MediaObject upsert
   */
  export type MediaObjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaObject to update in case it exists.
     */
    where: MediaObjectWhereUniqueInput
    /**
     * In case the MediaObject found by the `where` argument doesn't exist, create a new MediaObject with this data.
     */
    create: XOR<MediaObjectCreateInput, MediaObjectUncheckedCreateInput>
    /**
     * In case the MediaObject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaObjectUpdateInput, MediaObjectUncheckedUpdateInput>
  }

  /**
   * MediaObject delete
   */
  export type MediaObjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
    /**
     * Filter which MediaObject to delete.
     */
    where: MediaObjectWhereUniqueInput
  }

  /**
   * MediaObject deleteMany
   */
  export type MediaObjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaObjects to delete
     */
    where?: MediaObjectWhereInput
    /**
     * Limit how many MediaObjects to delete.
     */
    limit?: number
  }

  /**
   * MediaObject.variants
   */
  export type MediaObject$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    where?: MediaVariantWhereInput
    orderBy?: MediaVariantOrderByWithRelationInput | MediaVariantOrderByWithRelationInput[]
    cursor?: MediaVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaVariantScalarFieldEnum | MediaVariantScalarFieldEnum[]
  }

  /**
   * MediaObject.uploadSessions
   */
  export type MediaObject$uploadSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    where?: UploadSessionWhereInput
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    cursor?: UploadSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * MediaObject without action
   */
  export type MediaObjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaObject
     */
    select?: MediaObjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaObject
     */
    omit?: MediaObjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaObjectInclude<ExtArgs> | null
  }


  /**
   * Model MediaVariant
   */

  export type AggregateMediaVariant = {
    _count: MediaVariantCountAggregateOutputType | null
    _avg: MediaVariantAvgAggregateOutputType | null
    _sum: MediaVariantSumAggregateOutputType | null
    _min: MediaVariantMinAggregateOutputType | null
    _max: MediaVariantMaxAggregateOutputType | null
  }

  export type MediaVariantAvgAggregateOutputType = {
    width: number | null
    height: number | null
    durationMs: number | null
    sizeBytes: number | null
  }

  export type MediaVariantSumAggregateOutputType = {
    width: number | null
    height: number | null
    durationMs: number | null
    sizeBytes: bigint | null
  }

  export type MediaVariantMinAggregateOutputType = {
    id: string | null
    mediaId: string | null
    variantType: string | null
    storageKey: string | null
    width: number | null
    height: number | null
    durationMs: number | null
    sizeBytes: bigint | null
    createdAt: Date | null
  }

  export type MediaVariantMaxAggregateOutputType = {
    id: string | null
    mediaId: string | null
    variantType: string | null
    storageKey: string | null
    width: number | null
    height: number | null
    durationMs: number | null
    sizeBytes: bigint | null
    createdAt: Date | null
  }

  export type MediaVariantCountAggregateOutputType = {
    id: number
    mediaId: number
    variantType: number
    storageKey: number
    width: number
    height: number
    durationMs: number
    sizeBytes: number
    createdAt: number
    _all: number
  }


  export type MediaVariantAvgAggregateInputType = {
    width?: true
    height?: true
    durationMs?: true
    sizeBytes?: true
  }

  export type MediaVariantSumAggregateInputType = {
    width?: true
    height?: true
    durationMs?: true
    sizeBytes?: true
  }

  export type MediaVariantMinAggregateInputType = {
    id?: true
    mediaId?: true
    variantType?: true
    storageKey?: true
    width?: true
    height?: true
    durationMs?: true
    sizeBytes?: true
    createdAt?: true
  }

  export type MediaVariantMaxAggregateInputType = {
    id?: true
    mediaId?: true
    variantType?: true
    storageKey?: true
    width?: true
    height?: true
    durationMs?: true
    sizeBytes?: true
    createdAt?: true
  }

  export type MediaVariantCountAggregateInputType = {
    id?: true
    mediaId?: true
    variantType?: true
    storageKey?: true
    width?: true
    height?: true
    durationMs?: true
    sizeBytes?: true
    createdAt?: true
    _all?: true
  }

  export type MediaVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaVariant to aggregate.
     */
    where?: MediaVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaVariants to fetch.
     */
    orderBy?: MediaVariantOrderByWithRelationInput | MediaVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaVariants
    **/
    _count?: true | MediaVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaVariantMaxAggregateInputType
  }

  export type GetMediaVariantAggregateType<T extends MediaVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaVariant[P]>
      : GetScalarType<T[P], AggregateMediaVariant[P]>
  }




  export type MediaVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaVariantWhereInput
    orderBy?: MediaVariantOrderByWithAggregationInput | MediaVariantOrderByWithAggregationInput[]
    by: MediaVariantScalarFieldEnum[] | MediaVariantScalarFieldEnum
    having?: MediaVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaVariantCountAggregateInputType | true
    _avg?: MediaVariantAvgAggregateInputType
    _sum?: MediaVariantSumAggregateInputType
    _min?: MediaVariantMinAggregateInputType
    _max?: MediaVariantMaxAggregateInputType
  }

  export type MediaVariantGroupByOutputType = {
    id: string
    mediaId: string
    variantType: string
    storageKey: string
    width: number | null
    height: number | null
    durationMs: number | null
    sizeBytes: bigint | null
    createdAt: Date
    _count: MediaVariantCountAggregateOutputType | null
    _avg: MediaVariantAvgAggregateOutputType | null
    _sum: MediaVariantSumAggregateOutputType | null
    _min: MediaVariantMinAggregateOutputType | null
    _max: MediaVariantMaxAggregateOutputType | null
  }

  type GetMediaVariantGroupByPayload<T extends MediaVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaVariantGroupByOutputType[P]>
            : GetScalarType<T[P], MediaVariantGroupByOutputType[P]>
        }
      >
    >


  export type MediaVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    variantType?: boolean
    storageKey?: boolean
    width?: boolean
    height?: boolean
    durationMs?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaVariant"]>

  export type MediaVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    variantType?: boolean
    storageKey?: boolean
    width?: boolean
    height?: boolean
    durationMs?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaVariant"]>

  export type MediaVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    variantType?: boolean
    storageKey?: boolean
    width?: boolean
    height?: boolean
    durationMs?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaVariant"]>

  export type MediaVariantSelectScalar = {
    id?: boolean
    mediaId?: boolean
    variantType?: boolean
    storageKey?: boolean
    width?: boolean
    height?: boolean
    durationMs?: boolean
    sizeBytes?: boolean
    createdAt?: boolean
  }

  export type MediaVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mediaId" | "variantType" | "storageKey" | "width" | "height" | "durationMs" | "sizeBytes" | "createdAt", ExtArgs["result"]["mediaVariant"]>
  export type MediaVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }
  export type MediaVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }
  export type MediaVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }

  export type $MediaVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaVariant"
    objects: {
      media: Prisma.$MediaObjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mediaId: string
      variantType: string
      storageKey: string
      width: number | null
      height: number | null
      durationMs: number | null
      sizeBytes: bigint | null
      createdAt: Date
    }, ExtArgs["result"]["mediaVariant"]>
    composites: {}
  }

  type MediaVariantGetPayload<S extends boolean | null | undefined | MediaVariantDefaultArgs> = $Result.GetResult<Prisma.$MediaVariantPayload, S>

  type MediaVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaVariantCountAggregateInputType | true
    }

  export interface MediaVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaVariant'], meta: { name: 'MediaVariant' } }
    /**
     * Find zero or one MediaVariant that matches the filter.
     * @param {MediaVariantFindUniqueArgs} args - Arguments to find a MediaVariant
     * @example
     * // Get one MediaVariant
     * const mediaVariant = await prisma.mediaVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaVariantFindUniqueArgs>(args: SelectSubset<T, MediaVariantFindUniqueArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaVariantFindUniqueOrThrowArgs} args - Arguments to find a MediaVariant
     * @example
     * // Get one MediaVariant
     * const mediaVariant = await prisma.mediaVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantFindFirstArgs} args - Arguments to find a MediaVariant
     * @example
     * // Get one MediaVariant
     * const mediaVariant = await prisma.mediaVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaVariantFindFirstArgs>(args?: SelectSubset<T, MediaVariantFindFirstArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantFindFirstOrThrowArgs} args - Arguments to find a MediaVariant
     * @example
     * // Get one MediaVariant
     * const mediaVariant = await prisma.mediaVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaVariants
     * const mediaVariants = await prisma.mediaVariant.findMany()
     * 
     * // Get first 10 MediaVariants
     * const mediaVariants = await prisma.mediaVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaVariantWithIdOnly = await prisma.mediaVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaVariantFindManyArgs>(args?: SelectSubset<T, MediaVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaVariant.
     * @param {MediaVariantCreateArgs} args - Arguments to create a MediaVariant.
     * @example
     * // Create one MediaVariant
     * const MediaVariant = await prisma.mediaVariant.create({
     *   data: {
     *     // ... data to create a MediaVariant
     *   }
     * })
     * 
     */
    create<T extends MediaVariantCreateArgs>(args: SelectSubset<T, MediaVariantCreateArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaVariants.
     * @param {MediaVariantCreateManyArgs} args - Arguments to create many MediaVariants.
     * @example
     * // Create many MediaVariants
     * const mediaVariant = await prisma.mediaVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaVariantCreateManyArgs>(args?: SelectSubset<T, MediaVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaVariants and returns the data saved in the database.
     * @param {MediaVariantCreateManyAndReturnArgs} args - Arguments to create many MediaVariants.
     * @example
     * // Create many MediaVariants
     * const mediaVariant = await prisma.mediaVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaVariants and only return the `id`
     * const mediaVariantWithIdOnly = await prisma.mediaVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaVariant.
     * @param {MediaVariantDeleteArgs} args - Arguments to delete one MediaVariant.
     * @example
     * // Delete one MediaVariant
     * const MediaVariant = await prisma.mediaVariant.delete({
     *   where: {
     *     // ... filter to delete one MediaVariant
     *   }
     * })
     * 
     */
    delete<T extends MediaVariantDeleteArgs>(args: SelectSubset<T, MediaVariantDeleteArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaVariant.
     * @param {MediaVariantUpdateArgs} args - Arguments to update one MediaVariant.
     * @example
     * // Update one MediaVariant
     * const mediaVariant = await prisma.mediaVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaVariantUpdateArgs>(args: SelectSubset<T, MediaVariantUpdateArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaVariants.
     * @param {MediaVariantDeleteManyArgs} args - Arguments to filter MediaVariants to delete.
     * @example
     * // Delete a few MediaVariants
     * const { count } = await prisma.mediaVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaVariantDeleteManyArgs>(args?: SelectSubset<T, MediaVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaVariants
     * const mediaVariant = await prisma.mediaVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaVariantUpdateManyArgs>(args: SelectSubset<T, MediaVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaVariants and returns the data updated in the database.
     * @param {MediaVariantUpdateManyAndReturnArgs} args - Arguments to update many MediaVariants.
     * @example
     * // Update many MediaVariants
     * const mediaVariant = await prisma.mediaVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaVariants and only return the `id`
     * const mediaVariantWithIdOnly = await prisma.mediaVariant.updateManyAndReturn({
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
    updateManyAndReturn<T extends MediaVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaVariant.
     * @param {MediaVariantUpsertArgs} args - Arguments to update or create a MediaVariant.
     * @example
     * // Update or create a MediaVariant
     * const mediaVariant = await prisma.mediaVariant.upsert({
     *   create: {
     *     // ... data to create a MediaVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaVariant we want to update
     *   }
     * })
     */
    upsert<T extends MediaVariantUpsertArgs>(args: SelectSubset<T, MediaVariantUpsertArgs<ExtArgs>>): Prisma__MediaVariantClient<$Result.GetResult<Prisma.$MediaVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantCountArgs} args - Arguments to filter MediaVariants to count.
     * @example
     * // Count the number of MediaVariants
     * const count = await prisma.mediaVariant.count({
     *   where: {
     *     // ... the filter for the MediaVariants we want to count
     *   }
     * })
    **/
    count<T extends MediaVariantCountArgs>(
      args?: Subset<T, MediaVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MediaVariantAggregateArgs>(args: Subset<T, MediaVariantAggregateArgs>): Prisma.PrismaPromise<GetMediaVariantAggregateType<T>>

    /**
     * Group by MediaVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaVariantGroupByArgs} args - Group by arguments.
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
      T extends MediaVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaVariantGroupByArgs['orderBy'] }
        : { orderBy?: MediaVariantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MediaVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaVariant model
   */
  readonly fields: MediaVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends MediaObjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaObjectDefaultArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MediaVariant model
   */
  interface MediaVariantFieldRefs {
    readonly id: FieldRef<"MediaVariant", 'String'>
    readonly mediaId: FieldRef<"MediaVariant", 'String'>
    readonly variantType: FieldRef<"MediaVariant", 'String'>
    readonly storageKey: FieldRef<"MediaVariant", 'String'>
    readonly width: FieldRef<"MediaVariant", 'Int'>
    readonly height: FieldRef<"MediaVariant", 'Int'>
    readonly durationMs: FieldRef<"MediaVariant", 'Int'>
    readonly sizeBytes: FieldRef<"MediaVariant", 'BigInt'>
    readonly createdAt: FieldRef<"MediaVariant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaVariant findUnique
   */
  export type MediaVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter, which MediaVariant to fetch.
     */
    where: MediaVariantWhereUniqueInput
  }

  /**
   * MediaVariant findUniqueOrThrow
   */
  export type MediaVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter, which MediaVariant to fetch.
     */
    where: MediaVariantWhereUniqueInput
  }

  /**
   * MediaVariant findFirst
   */
  export type MediaVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter, which MediaVariant to fetch.
     */
    where?: MediaVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaVariants to fetch.
     */
    orderBy?: MediaVariantOrderByWithRelationInput | MediaVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaVariants.
     */
    cursor?: MediaVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaVariants.
     */
    distinct?: MediaVariantScalarFieldEnum | MediaVariantScalarFieldEnum[]
  }

  /**
   * MediaVariant findFirstOrThrow
   */
  export type MediaVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter, which MediaVariant to fetch.
     */
    where?: MediaVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaVariants to fetch.
     */
    orderBy?: MediaVariantOrderByWithRelationInput | MediaVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaVariants.
     */
    cursor?: MediaVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaVariants.
     */
    distinct?: MediaVariantScalarFieldEnum | MediaVariantScalarFieldEnum[]
  }

  /**
   * MediaVariant findMany
   */
  export type MediaVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter, which MediaVariants to fetch.
     */
    where?: MediaVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaVariants to fetch.
     */
    orderBy?: MediaVariantOrderByWithRelationInput | MediaVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaVariants.
     */
    cursor?: MediaVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaVariants.
     */
    skip?: number
    distinct?: MediaVariantScalarFieldEnum | MediaVariantScalarFieldEnum[]
  }

  /**
   * MediaVariant create
   */
  export type MediaVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaVariant.
     */
    data: XOR<MediaVariantCreateInput, MediaVariantUncheckedCreateInput>
  }

  /**
   * MediaVariant createMany
   */
  export type MediaVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaVariants.
     */
    data: MediaVariantCreateManyInput | MediaVariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaVariant createManyAndReturn
   */
  export type MediaVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * The data used to create many MediaVariants.
     */
    data: MediaVariantCreateManyInput | MediaVariantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaVariant update
   */
  export type MediaVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaVariant.
     */
    data: XOR<MediaVariantUpdateInput, MediaVariantUncheckedUpdateInput>
    /**
     * Choose, which MediaVariant to update.
     */
    where: MediaVariantWhereUniqueInput
  }

  /**
   * MediaVariant updateMany
   */
  export type MediaVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaVariants.
     */
    data: XOR<MediaVariantUpdateManyMutationInput, MediaVariantUncheckedUpdateManyInput>
    /**
     * Filter which MediaVariants to update
     */
    where?: MediaVariantWhereInput
    /**
     * Limit how many MediaVariants to update.
     */
    limit?: number
  }

  /**
   * MediaVariant updateManyAndReturn
   */
  export type MediaVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * The data used to update MediaVariants.
     */
    data: XOR<MediaVariantUpdateManyMutationInput, MediaVariantUncheckedUpdateManyInput>
    /**
     * Filter which MediaVariants to update
     */
    where?: MediaVariantWhereInput
    /**
     * Limit how many MediaVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaVariant upsert
   */
  export type MediaVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaVariant to update in case it exists.
     */
    where: MediaVariantWhereUniqueInput
    /**
     * In case the MediaVariant found by the `where` argument doesn't exist, create a new MediaVariant with this data.
     */
    create: XOR<MediaVariantCreateInput, MediaVariantUncheckedCreateInput>
    /**
     * In case the MediaVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaVariantUpdateInput, MediaVariantUncheckedUpdateInput>
  }

  /**
   * MediaVariant delete
   */
  export type MediaVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
    /**
     * Filter which MediaVariant to delete.
     */
    where: MediaVariantWhereUniqueInput
  }

  /**
   * MediaVariant deleteMany
   */
  export type MediaVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaVariants to delete
     */
    where?: MediaVariantWhereInput
    /**
     * Limit how many MediaVariants to delete.
     */
    limit?: number
  }

  /**
   * MediaVariant without action
   */
  export type MediaVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaVariant
     */
    select?: MediaVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaVariant
     */
    omit?: MediaVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaVariantInclude<ExtArgs> | null
  }


  /**
   * Model UploadSession
   */

  export type AggregateUploadSession = {
    _count: UploadSessionCountAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  export type UploadSessionMinAggregateOutputType = {
    id: string | null
    mediaId: string | null
    ownerUserId: string | null
    status: $Enums.UploadSessionStatus | null
    checksum: string | null
    expiresAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type UploadSessionMaxAggregateOutputType = {
    id: string | null
    mediaId: string | null
    ownerUserId: string | null
    status: $Enums.UploadSessionStatus | null
    checksum: string | null
    expiresAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type UploadSessionCountAggregateOutputType = {
    id: number
    mediaId: number
    ownerUserId: number
    status: number
    checksum: number
    expiresAt: number
    completedAt: number
    createdAt: number
    _all: number
  }


  export type UploadSessionMinAggregateInputType = {
    id?: true
    mediaId?: true
    ownerUserId?: true
    status?: true
    checksum?: true
    expiresAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type UploadSessionMaxAggregateInputType = {
    id?: true
    mediaId?: true
    ownerUserId?: true
    status?: true
    checksum?: true
    expiresAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type UploadSessionCountAggregateInputType = {
    id?: true
    mediaId?: true
    ownerUserId?: true
    status?: true
    checksum?: true
    expiresAt?: true
    completedAt?: true
    createdAt?: true
    _all?: true
  }

  export type UploadSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSession to aggregate.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadSessions
    **/
    _count?: true | UploadSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadSessionMaxAggregateInputType
  }

  export type GetUploadSessionAggregateType<T extends UploadSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadSession[P]>
      : GetScalarType<T[P], AggregateUploadSession[P]>
  }




  export type UploadSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadSessionWhereInput
    orderBy?: UploadSessionOrderByWithAggregationInput | UploadSessionOrderByWithAggregationInput[]
    by: UploadSessionScalarFieldEnum[] | UploadSessionScalarFieldEnum
    having?: UploadSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadSessionCountAggregateInputType | true
    _min?: UploadSessionMinAggregateInputType
    _max?: UploadSessionMaxAggregateInputType
  }

  export type UploadSessionGroupByOutputType = {
    id: string
    mediaId: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum: string | null
    expiresAt: Date
    completedAt: Date | null
    createdAt: Date
    _count: UploadSessionCountAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  type GetUploadSessionGroupByPayload<T extends UploadSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
        }
      >
    >


  export type UploadSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    ownerUserId?: boolean
    status?: boolean
    checksum?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    ownerUserId?: boolean
    status?: boolean
    checksum?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaId?: boolean
    ownerUserId?: boolean
    status?: boolean
    checksum?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectScalar = {
    id?: boolean
    mediaId?: boolean
    ownerUserId?: boolean
    status?: boolean
    checksum?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
  }

  export type UploadSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mediaId" | "ownerUserId" | "status" | "checksum" | "expiresAt" | "completedAt" | "createdAt", ExtArgs["result"]["uploadSession"]>
  export type UploadSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaObjectDefaultArgs<ExtArgs>
  }

  export type $UploadSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadSession"
    objects: {
      media: Prisma.$MediaObjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mediaId: string
      ownerUserId: string
      status: $Enums.UploadSessionStatus
      checksum: string | null
      expiresAt: Date
      completedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["uploadSession"]>
    composites: {}
  }

  type UploadSessionGetPayload<S extends boolean | null | undefined | UploadSessionDefaultArgs> = $Result.GetResult<Prisma.$UploadSessionPayload, S>

  type UploadSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadSessionCountAggregateInputType | true
    }

  export interface UploadSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadSession'], meta: { name: 'UploadSession' } }
    /**
     * Find zero or one UploadSession that matches the filter.
     * @param {UploadSessionFindUniqueArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadSessionFindUniqueArgs>(args: SelectSubset<T, UploadSessionFindUniqueArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadSessionFindUniqueOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadSessionFindFirstArgs>(args?: SelectSubset<T, UploadSessionFindFirstArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany()
     * 
     * // Get first 10 UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadSessionFindManyArgs>(args?: SelectSubset<T, UploadSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadSession.
     * @param {UploadSessionCreateArgs} args - Arguments to create a UploadSession.
     * @example
     * // Create one UploadSession
     * const UploadSession = await prisma.uploadSession.create({
     *   data: {
     *     // ... data to create a UploadSession
     *   }
     * })
     * 
     */
    create<T extends UploadSessionCreateArgs>(args: SelectSubset<T, UploadSessionCreateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadSessions.
     * @param {UploadSessionCreateManyArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadSessionCreateManyArgs>(args?: SelectSubset<T, UploadSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadSessions and returns the data saved in the database.
     * @param {UploadSessionCreateManyAndReturnArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadSession.
     * @param {UploadSessionDeleteArgs} args - Arguments to delete one UploadSession.
     * @example
     * // Delete one UploadSession
     * const UploadSession = await prisma.uploadSession.delete({
     *   where: {
     *     // ... filter to delete one UploadSession
     *   }
     * })
     * 
     */
    delete<T extends UploadSessionDeleteArgs>(args: SelectSubset<T, UploadSessionDeleteArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadSession.
     * @param {UploadSessionUpdateArgs} args - Arguments to update one UploadSession.
     * @example
     * // Update one UploadSession
     * const uploadSession = await prisma.uploadSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadSessionUpdateArgs>(args: SelectSubset<T, UploadSessionUpdateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadSessions.
     * @param {UploadSessionDeleteManyArgs} args - Arguments to filter UploadSessions to delete.
     * @example
     * // Delete a few UploadSessions
     * const { count } = await prisma.uploadSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadSessionDeleteManyArgs>(args?: SelectSubset<T, UploadSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadSessionUpdateManyArgs>(args: SelectSubset<T, UploadSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions and returns the data updated in the database.
     * @param {UploadSessionUpdateManyAndReturnArgs} args - Arguments to update many UploadSessions.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends UploadSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadSession.
     * @param {UploadSessionUpsertArgs} args - Arguments to update or create a UploadSession.
     * @example
     * // Update or create a UploadSession
     * const uploadSession = await prisma.uploadSession.upsert({
     *   create: {
     *     // ... data to create a UploadSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadSession we want to update
     *   }
     * })
     */
    upsert<T extends UploadSessionUpsertArgs>(args: SelectSubset<T, UploadSessionUpsertArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionCountArgs} args - Arguments to filter UploadSessions to count.
     * @example
     * // Count the number of UploadSessions
     * const count = await prisma.uploadSession.count({
     *   where: {
     *     // ... the filter for the UploadSessions we want to count
     *   }
     * })
    **/
    count<T extends UploadSessionCountArgs>(
      args?: Subset<T, UploadSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadSessionAggregateArgs>(args: Subset<T, UploadSessionAggregateArgs>): Prisma.PrismaPromise<GetUploadSessionAggregateType<T>>

    /**
     * Group by UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionGroupByArgs} args - Group by arguments.
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
      T extends UploadSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadSessionGroupByArgs['orderBy'] }
        : { orderBy?: UploadSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UploadSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadSession model
   */
  readonly fields: UploadSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends MediaObjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaObjectDefaultArgs<ExtArgs>>): Prisma__MediaObjectClient<$Result.GetResult<Prisma.$MediaObjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UploadSession model
   */
  interface UploadSessionFieldRefs {
    readonly id: FieldRef<"UploadSession", 'String'>
    readonly mediaId: FieldRef<"UploadSession", 'String'>
    readonly ownerUserId: FieldRef<"UploadSession", 'String'>
    readonly status: FieldRef<"UploadSession", 'UploadSessionStatus'>
    readonly checksum: FieldRef<"UploadSession", 'String'>
    readonly expiresAt: FieldRef<"UploadSession", 'DateTime'>
    readonly completedAt: FieldRef<"UploadSession", 'DateTime'>
    readonly createdAt: FieldRef<"UploadSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadSession findUnique
   */
  export type UploadSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findUniqueOrThrow
   */
  export type UploadSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findFirst
   */
  export type UploadSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findFirstOrThrow
   */
  export type UploadSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findMany
   */
  export type UploadSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSessions to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession create
   */
  export type UploadSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadSession.
     */
    data: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
  }

  /**
   * UploadSession createMany
   */
  export type UploadSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadSession createManyAndReturn
   */
  export type UploadSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession update
   */
  export type UploadSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadSession.
     */
    data: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
    /**
     * Choose, which UploadSession to update.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession updateMany
   */
  export type UploadSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
  }

  /**
   * UploadSession updateManyAndReturn
   */
  export type UploadSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession upsert
   */
  export type UploadSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadSession to update in case it exists.
     */
    where: UploadSessionWhereUniqueInput
    /**
     * In case the UploadSession found by the `where` argument doesn't exist, create a new UploadSession with this data.
     */
    create: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
    /**
     * In case the UploadSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
  }

  /**
   * UploadSession delete
   */
  export type UploadSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter which UploadSession to delete.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession deleteMany
   */
  export type UploadSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSessions to delete
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to delete.
     */
    limit?: number
  }

  /**
   * UploadSession without action
   */
  export type UploadSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
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


  export const MediaObjectScalarFieldEnum: {
    id: 'id',
    ownerUserId: 'ownerUserId',
    storageKey: 'storageKey',
    mediaType: 'mediaType',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    checksum: 'checksum',
    processingStatus: 'processingStatus',
    createdAt: 'createdAt',
    processedAt: 'processedAt',
    deletedAt: 'deletedAt'
  };

  export type MediaObjectScalarFieldEnum = (typeof MediaObjectScalarFieldEnum)[keyof typeof MediaObjectScalarFieldEnum]


  export const MediaVariantScalarFieldEnum: {
    id: 'id',
    mediaId: 'mediaId',
    variantType: 'variantType',
    storageKey: 'storageKey',
    width: 'width',
    height: 'height',
    durationMs: 'durationMs',
    sizeBytes: 'sizeBytes',
    createdAt: 'createdAt'
  };

  export type MediaVariantScalarFieldEnum = (typeof MediaVariantScalarFieldEnum)[keyof typeof MediaVariantScalarFieldEnum]


  export const UploadSessionScalarFieldEnum: {
    id: 'id',
    mediaId: 'mediaId',
    ownerUserId: 'ownerUserId',
    status: 'status',
    checksum: 'checksum',
    expiresAt: 'expiresAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt'
  };

  export type UploadSessionScalarFieldEnum = (typeof UploadSessionScalarFieldEnum)[keyof typeof UploadSessionScalarFieldEnum]


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
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'ProcessingStatus'
   */
  export type EnumProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingStatus'>
    


  /**
   * Reference to a field of type 'ProcessingStatus[]'
   */
  export type ListEnumProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UploadSessionStatus'
   */
  export type EnumUploadSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadSessionStatus'>
    


  /**
   * Reference to a field of type 'UploadSessionStatus[]'
   */
  export type ListEnumUploadSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadSessionStatus[]'>
    


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


  export type MediaObjectWhereInput = {
    AND?: MediaObjectWhereInput | MediaObjectWhereInput[]
    OR?: MediaObjectWhereInput[]
    NOT?: MediaObjectWhereInput | MediaObjectWhereInput[]
    id?: StringFilter<"MediaObject"> | string
    ownerUserId?: StringFilter<"MediaObject"> | string
    storageKey?: StringFilter<"MediaObject"> | string
    mediaType?: EnumMediaTypeFilter<"MediaObject"> | $Enums.MediaType
    mimeType?: StringFilter<"MediaObject"> | string
    sizeBytes?: BigIntFilter<"MediaObject"> | bigint | number
    checksum?: StringNullableFilter<"MediaObject"> | string | null
    processingStatus?: EnumProcessingStatusFilter<"MediaObject"> | $Enums.ProcessingStatus
    createdAt?: DateTimeFilter<"MediaObject"> | Date | string
    processedAt?: DateTimeNullableFilter<"MediaObject"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"MediaObject"> | Date | string | null
    variants?: MediaVariantListRelationFilter
    uploadSessions?: UploadSessionListRelationFilter
  }

  export type MediaObjectOrderByWithRelationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    storageKey?: SortOrder
    mediaType?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    checksum?: SortOrderInput | SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    variants?: MediaVariantOrderByRelationAggregateInput
    uploadSessions?: UploadSessionOrderByRelationAggregateInput
  }

  export type MediaObjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storageKey?: string
    AND?: MediaObjectWhereInput | MediaObjectWhereInput[]
    OR?: MediaObjectWhereInput[]
    NOT?: MediaObjectWhereInput | MediaObjectWhereInput[]
    ownerUserId?: StringFilter<"MediaObject"> | string
    mediaType?: EnumMediaTypeFilter<"MediaObject"> | $Enums.MediaType
    mimeType?: StringFilter<"MediaObject"> | string
    sizeBytes?: BigIntFilter<"MediaObject"> | bigint | number
    checksum?: StringNullableFilter<"MediaObject"> | string | null
    processingStatus?: EnumProcessingStatusFilter<"MediaObject"> | $Enums.ProcessingStatus
    createdAt?: DateTimeFilter<"MediaObject"> | Date | string
    processedAt?: DateTimeNullableFilter<"MediaObject"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"MediaObject"> | Date | string | null
    variants?: MediaVariantListRelationFilter
    uploadSessions?: UploadSessionListRelationFilter
  }, "id" | "storageKey">

  export type MediaObjectOrderByWithAggregationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    storageKey?: SortOrder
    mediaType?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    checksum?: SortOrderInput | SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: MediaObjectCountOrderByAggregateInput
    _avg?: MediaObjectAvgOrderByAggregateInput
    _max?: MediaObjectMaxOrderByAggregateInput
    _min?: MediaObjectMinOrderByAggregateInput
    _sum?: MediaObjectSumOrderByAggregateInput
  }

  export type MediaObjectScalarWhereWithAggregatesInput = {
    AND?: MediaObjectScalarWhereWithAggregatesInput | MediaObjectScalarWhereWithAggregatesInput[]
    OR?: MediaObjectScalarWhereWithAggregatesInput[]
    NOT?: MediaObjectScalarWhereWithAggregatesInput | MediaObjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaObject"> | string
    ownerUserId?: StringWithAggregatesFilter<"MediaObject"> | string
    storageKey?: StringWithAggregatesFilter<"MediaObject"> | string
    mediaType?: EnumMediaTypeWithAggregatesFilter<"MediaObject"> | $Enums.MediaType
    mimeType?: StringWithAggregatesFilter<"MediaObject"> | string
    sizeBytes?: BigIntWithAggregatesFilter<"MediaObject"> | bigint | number
    checksum?: StringNullableWithAggregatesFilter<"MediaObject"> | string | null
    processingStatus?: EnumProcessingStatusWithAggregatesFilter<"MediaObject"> | $Enums.ProcessingStatus
    createdAt?: DateTimeWithAggregatesFilter<"MediaObject"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"MediaObject"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"MediaObject"> | Date | string | null
  }

  export type MediaVariantWhereInput = {
    AND?: MediaVariantWhereInput | MediaVariantWhereInput[]
    OR?: MediaVariantWhereInput[]
    NOT?: MediaVariantWhereInput | MediaVariantWhereInput[]
    id?: StringFilter<"MediaVariant"> | string
    mediaId?: StringFilter<"MediaVariant"> | string
    variantType?: StringFilter<"MediaVariant"> | string
    storageKey?: StringFilter<"MediaVariant"> | string
    width?: IntNullableFilter<"MediaVariant"> | number | null
    height?: IntNullableFilter<"MediaVariant"> | number | null
    durationMs?: IntNullableFilter<"MediaVariant"> | number | null
    sizeBytes?: BigIntNullableFilter<"MediaVariant"> | bigint | number | null
    createdAt?: DateTimeFilter<"MediaVariant"> | Date | string
    media?: XOR<MediaObjectScalarRelationFilter, MediaObjectWhereInput>
  }

  export type MediaVariantOrderByWithRelationInput = {
    id?: SortOrder
    mediaId?: SortOrder
    variantType?: SortOrder
    storageKey?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    sizeBytes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    media?: MediaObjectOrderByWithRelationInput
  }

  export type MediaVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mediaId_variantType?: MediaVariantMediaIdVariantTypeCompoundUniqueInput
    AND?: MediaVariantWhereInput | MediaVariantWhereInput[]
    OR?: MediaVariantWhereInput[]
    NOT?: MediaVariantWhereInput | MediaVariantWhereInput[]
    mediaId?: StringFilter<"MediaVariant"> | string
    variantType?: StringFilter<"MediaVariant"> | string
    storageKey?: StringFilter<"MediaVariant"> | string
    width?: IntNullableFilter<"MediaVariant"> | number | null
    height?: IntNullableFilter<"MediaVariant"> | number | null
    durationMs?: IntNullableFilter<"MediaVariant"> | number | null
    sizeBytes?: BigIntNullableFilter<"MediaVariant"> | bigint | number | null
    createdAt?: DateTimeFilter<"MediaVariant"> | Date | string
    media?: XOR<MediaObjectScalarRelationFilter, MediaObjectWhereInput>
  }, "id" | "mediaId_variantType">

  export type MediaVariantOrderByWithAggregationInput = {
    id?: SortOrder
    mediaId?: SortOrder
    variantType?: SortOrder
    storageKey?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    sizeBytes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MediaVariantCountOrderByAggregateInput
    _avg?: MediaVariantAvgOrderByAggregateInput
    _max?: MediaVariantMaxOrderByAggregateInput
    _min?: MediaVariantMinOrderByAggregateInput
    _sum?: MediaVariantSumOrderByAggregateInput
  }

  export type MediaVariantScalarWhereWithAggregatesInput = {
    AND?: MediaVariantScalarWhereWithAggregatesInput | MediaVariantScalarWhereWithAggregatesInput[]
    OR?: MediaVariantScalarWhereWithAggregatesInput[]
    NOT?: MediaVariantScalarWhereWithAggregatesInput | MediaVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaVariant"> | string
    mediaId?: StringWithAggregatesFilter<"MediaVariant"> | string
    variantType?: StringWithAggregatesFilter<"MediaVariant"> | string
    storageKey?: StringWithAggregatesFilter<"MediaVariant"> | string
    width?: IntNullableWithAggregatesFilter<"MediaVariant"> | number | null
    height?: IntNullableWithAggregatesFilter<"MediaVariant"> | number | null
    durationMs?: IntNullableWithAggregatesFilter<"MediaVariant"> | number | null
    sizeBytes?: BigIntNullableWithAggregatesFilter<"MediaVariant"> | bigint | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MediaVariant"> | Date | string
  }

  export type UploadSessionWhereInput = {
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    id?: StringFilter<"UploadSession"> | string
    mediaId?: StringFilter<"UploadSession"> | string
    ownerUserId?: StringFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusFilter<"UploadSession"> | $Enums.UploadSessionStatus
    checksum?: StringNullableFilter<"UploadSession"> | string | null
    expiresAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    media?: XOR<MediaObjectScalarRelationFilter, MediaObjectWhereInput>
  }

  export type UploadSessionOrderByWithRelationInput = {
    id?: SortOrder
    mediaId?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    checksum?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    media?: MediaObjectOrderByWithRelationInput
  }

  export type UploadSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    mediaId?: StringFilter<"UploadSession"> | string
    ownerUserId?: StringFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusFilter<"UploadSession"> | $Enums.UploadSessionStatus
    checksum?: StringNullableFilter<"UploadSession"> | string | null
    expiresAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    media?: XOR<MediaObjectScalarRelationFilter, MediaObjectWhereInput>
  }, "id">

  export type UploadSessionOrderByWithAggregationInput = {
    id?: SortOrder
    mediaId?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    checksum?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UploadSessionCountOrderByAggregateInput
    _max?: UploadSessionMaxOrderByAggregateInput
    _min?: UploadSessionMinOrderByAggregateInput
  }

  export type UploadSessionScalarWhereWithAggregatesInput = {
    AND?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    OR?: UploadSessionScalarWhereWithAggregatesInput[]
    NOT?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadSession"> | string
    mediaId?: StringWithAggregatesFilter<"UploadSession"> | string
    ownerUserId?: StringWithAggregatesFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusWithAggregatesFilter<"UploadSession"> | $Enums.UploadSessionStatus
    checksum?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"UploadSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
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

  export type MediaObjectCreateInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    variants?: MediaVariantCreateNestedManyWithoutMediaInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectUncheckedCreateInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    variants?: MediaVariantUncheckedCreateNestedManyWithoutMediaInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: MediaVariantUpdateManyWithoutMediaNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutMediaNestedInput
  }

  export type MediaObjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: MediaVariantUncheckedUpdateManyWithoutMediaNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaObjectCreateManyInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
  }

  export type MediaObjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MediaObjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MediaVariantCreateInput = {
    id: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
    media: MediaObjectCreateNestedOneWithoutVariantsInput
  }

  export type MediaVariantUncheckedCreateInput = {
    id: string
    mediaId: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
  }

  export type MediaVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaObjectUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type MediaVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaVariantCreateManyInput = {
    id: string
    mediaId: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
  }

  export type MediaVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionCreateInput = {
    id: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    media: MediaObjectCreateNestedOneWithoutUploadSessionsInput
  }

  export type UploadSessionUncheckedCreateInput = {
    id: string
    mediaId: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UploadSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaObjectUpdateOneRequiredWithoutUploadSessionsNestedInput
  }

  export type UploadSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionCreateManyInput = {
    id: string
    mediaId: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UploadSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type EnumProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusFilter<$PrismaModel> | $Enums.ProcessingStatus
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

  export type MediaVariantListRelationFilter = {
    every?: MediaVariantWhereInput
    some?: MediaVariantWhereInput
    none?: MediaVariantWhereInput
  }

  export type UploadSessionListRelationFilter = {
    every?: UploadSessionWhereInput
    some?: UploadSessionWhereInput
    none?: UploadSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UploadSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaObjectCountOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    storageKey?: SortOrder
    mediaType?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    checksum?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaObjectAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type MediaObjectMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    storageKey?: SortOrder
    mediaType?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    checksum?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaObjectMinOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    storageKey?: SortOrder
    mediaType?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    checksum?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    processedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type MediaObjectSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
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

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type EnumProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumProcessingStatusFilter<$PrismaModel>
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type MediaObjectScalarRelationFilter = {
    is?: MediaObjectWhereInput
    isNot?: MediaObjectWhereInput
  }

  export type MediaVariantMediaIdVariantTypeCompoundUniqueInput = {
    mediaId: string
    variantType: string
  }

  export type MediaVariantCountOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    variantType?: SortOrder
    storageKey?: SortOrder
    width?: SortOrder
    height?: SortOrder
    durationMs?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaVariantAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    durationMs?: SortOrder
    sizeBytes?: SortOrder
  }

  export type MediaVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    variantType?: SortOrder
    storageKey?: SortOrder
    width?: SortOrder
    height?: SortOrder
    durationMs?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaVariantMinOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    variantType?: SortOrder
    storageKey?: SortOrder
    width?: SortOrder
    height?: SortOrder
    durationMs?: SortOrder
    sizeBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaVariantSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
    durationMs?: SortOrder
    sizeBytes?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumUploadSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusFilter<$PrismaModel> | $Enums.UploadSessionStatus
  }

  export type UploadSessionCountOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    checksum?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    checksum?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadSessionMinOrderByAggregateInput = {
    id?: SortOrder
    mediaId?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    checksum?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUploadSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
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

  export type MediaVariantCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput> | MediaVariantCreateWithoutMediaInput[] | MediaVariantUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaVariantCreateOrConnectWithoutMediaInput | MediaVariantCreateOrConnectWithoutMediaInput[]
    createMany?: MediaVariantCreateManyMediaInputEnvelope
    connect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
  }

  export type UploadSessionCreateNestedManyWithoutMediaInput = {
    create?: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput> | UploadSessionCreateWithoutMediaInput[] | UploadSessionUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutMediaInput | UploadSessionCreateOrConnectWithoutMediaInput[]
    createMany?: UploadSessionCreateManyMediaInputEnvelope
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
  }

  export type MediaVariantUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput> | MediaVariantCreateWithoutMediaInput[] | MediaVariantUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaVariantCreateOrConnectWithoutMediaInput | MediaVariantCreateOrConnectWithoutMediaInput[]
    createMany?: MediaVariantCreateManyMediaInputEnvelope
    connect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
  }

  export type UploadSessionUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput> | UploadSessionCreateWithoutMediaInput[] | UploadSessionUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutMediaInput | UploadSessionCreateOrConnectWithoutMediaInput[]
    createMany?: UploadSessionCreateManyMediaInputEnvelope
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumProcessingStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProcessingStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MediaVariantUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput> | MediaVariantCreateWithoutMediaInput[] | MediaVariantUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaVariantCreateOrConnectWithoutMediaInput | MediaVariantCreateOrConnectWithoutMediaInput[]
    upsert?: MediaVariantUpsertWithWhereUniqueWithoutMediaInput | MediaVariantUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediaVariantCreateManyMediaInputEnvelope
    set?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    disconnect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    delete?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    connect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    update?: MediaVariantUpdateWithWhereUniqueWithoutMediaInput | MediaVariantUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediaVariantUpdateManyWithWhereWithoutMediaInput | MediaVariantUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediaVariantScalarWhereInput | MediaVariantScalarWhereInput[]
  }

  export type UploadSessionUpdateManyWithoutMediaNestedInput = {
    create?: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput> | UploadSessionCreateWithoutMediaInput[] | UploadSessionUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutMediaInput | UploadSessionCreateOrConnectWithoutMediaInput[]
    upsert?: UploadSessionUpsertWithWhereUniqueWithoutMediaInput | UploadSessionUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: UploadSessionCreateManyMediaInputEnvelope
    set?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    disconnect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    delete?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    update?: UploadSessionUpdateWithWhereUniqueWithoutMediaInput | UploadSessionUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: UploadSessionUpdateManyWithWhereWithoutMediaInput | UploadSessionUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
  }

  export type MediaVariantUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput> | MediaVariantCreateWithoutMediaInput[] | MediaVariantUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaVariantCreateOrConnectWithoutMediaInput | MediaVariantCreateOrConnectWithoutMediaInput[]
    upsert?: MediaVariantUpsertWithWhereUniqueWithoutMediaInput | MediaVariantUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediaVariantCreateManyMediaInputEnvelope
    set?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    disconnect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    delete?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    connect?: MediaVariantWhereUniqueInput | MediaVariantWhereUniqueInput[]
    update?: MediaVariantUpdateWithWhereUniqueWithoutMediaInput | MediaVariantUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediaVariantUpdateManyWithWhereWithoutMediaInput | MediaVariantUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediaVariantScalarWhereInput | MediaVariantScalarWhereInput[]
  }

  export type UploadSessionUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput> | UploadSessionCreateWithoutMediaInput[] | UploadSessionUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutMediaInput | UploadSessionCreateOrConnectWithoutMediaInput[]
    upsert?: UploadSessionUpsertWithWhereUniqueWithoutMediaInput | UploadSessionUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: UploadSessionCreateManyMediaInputEnvelope
    set?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    disconnect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    delete?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    update?: UploadSessionUpdateWithWhereUniqueWithoutMediaInput | UploadSessionUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: UploadSessionUpdateManyWithWhereWithoutMediaInput | UploadSessionUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
  }

  export type MediaObjectCreateNestedOneWithoutVariantsInput = {
    create?: XOR<MediaObjectCreateWithoutVariantsInput, MediaObjectUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: MediaObjectCreateOrConnectWithoutVariantsInput
    connect?: MediaObjectWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type MediaObjectUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<MediaObjectCreateWithoutVariantsInput, MediaObjectUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: MediaObjectCreateOrConnectWithoutVariantsInput
    upsert?: MediaObjectUpsertWithoutVariantsInput
    connect?: MediaObjectWhereUniqueInput
    update?: XOR<XOR<MediaObjectUpdateToOneWithWhereWithoutVariantsInput, MediaObjectUpdateWithoutVariantsInput>, MediaObjectUncheckedUpdateWithoutVariantsInput>
  }

  export type MediaObjectCreateNestedOneWithoutUploadSessionsInput = {
    create?: XOR<MediaObjectCreateWithoutUploadSessionsInput, MediaObjectUncheckedCreateWithoutUploadSessionsInput>
    connectOrCreate?: MediaObjectCreateOrConnectWithoutUploadSessionsInput
    connect?: MediaObjectWhereUniqueInput
  }

  export type EnumUploadSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.UploadSessionStatus
  }

  export type MediaObjectUpdateOneRequiredWithoutUploadSessionsNestedInput = {
    create?: XOR<MediaObjectCreateWithoutUploadSessionsInput, MediaObjectUncheckedCreateWithoutUploadSessionsInput>
    connectOrCreate?: MediaObjectCreateOrConnectWithoutUploadSessionsInput
    upsert?: MediaObjectUpsertWithoutUploadSessionsInput
    connect?: MediaObjectWhereUniqueInput
    update?: XOR<XOR<MediaObjectUpdateToOneWithWhereWithoutUploadSessionsInput, MediaObjectUpdateWithoutUploadSessionsInput>, MediaObjectUncheckedUpdateWithoutUploadSessionsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
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

  export type NestedEnumProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusFilter<$PrismaModel> | $Enums.ProcessingStatus
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

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumProcessingStatusFilter<$PrismaModel>
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

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumUploadSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusFilter<$PrismaModel> | $Enums.UploadSessionStatus
  }

  export type NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumOutboxEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxEventStatus | EnumOutboxEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxEventStatus[] | ListEnumOutboxEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxEventStatusFilter<$PrismaModel> | $Enums.OutboxEventStatus
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

  export type MediaVariantCreateWithoutMediaInput = {
    id: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
  }

  export type MediaVariantUncheckedCreateWithoutMediaInput = {
    id: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
  }

  export type MediaVariantCreateOrConnectWithoutMediaInput = {
    where: MediaVariantWhereUniqueInput
    create: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput>
  }

  export type MediaVariantCreateManyMediaInputEnvelope = {
    data: MediaVariantCreateManyMediaInput | MediaVariantCreateManyMediaInput[]
    skipDuplicates?: boolean
  }

  export type UploadSessionCreateWithoutMediaInput = {
    id: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UploadSessionUncheckedCreateWithoutMediaInput = {
    id: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UploadSessionCreateOrConnectWithoutMediaInput = {
    where: UploadSessionWhereUniqueInput
    create: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput>
  }

  export type UploadSessionCreateManyMediaInputEnvelope = {
    data: UploadSessionCreateManyMediaInput | UploadSessionCreateManyMediaInput[]
    skipDuplicates?: boolean
  }

  export type MediaVariantUpsertWithWhereUniqueWithoutMediaInput = {
    where: MediaVariantWhereUniqueInput
    update: XOR<MediaVariantUpdateWithoutMediaInput, MediaVariantUncheckedUpdateWithoutMediaInput>
    create: XOR<MediaVariantCreateWithoutMediaInput, MediaVariantUncheckedCreateWithoutMediaInput>
  }

  export type MediaVariantUpdateWithWhereUniqueWithoutMediaInput = {
    where: MediaVariantWhereUniqueInput
    data: XOR<MediaVariantUpdateWithoutMediaInput, MediaVariantUncheckedUpdateWithoutMediaInput>
  }

  export type MediaVariantUpdateManyWithWhereWithoutMediaInput = {
    where: MediaVariantScalarWhereInput
    data: XOR<MediaVariantUpdateManyMutationInput, MediaVariantUncheckedUpdateManyWithoutMediaInput>
  }

  export type MediaVariantScalarWhereInput = {
    AND?: MediaVariantScalarWhereInput | MediaVariantScalarWhereInput[]
    OR?: MediaVariantScalarWhereInput[]
    NOT?: MediaVariantScalarWhereInput | MediaVariantScalarWhereInput[]
    id?: StringFilter<"MediaVariant"> | string
    mediaId?: StringFilter<"MediaVariant"> | string
    variantType?: StringFilter<"MediaVariant"> | string
    storageKey?: StringFilter<"MediaVariant"> | string
    width?: IntNullableFilter<"MediaVariant"> | number | null
    height?: IntNullableFilter<"MediaVariant"> | number | null
    durationMs?: IntNullableFilter<"MediaVariant"> | number | null
    sizeBytes?: BigIntNullableFilter<"MediaVariant"> | bigint | number | null
    createdAt?: DateTimeFilter<"MediaVariant"> | Date | string
  }

  export type UploadSessionUpsertWithWhereUniqueWithoutMediaInput = {
    where: UploadSessionWhereUniqueInput
    update: XOR<UploadSessionUpdateWithoutMediaInput, UploadSessionUncheckedUpdateWithoutMediaInput>
    create: XOR<UploadSessionCreateWithoutMediaInput, UploadSessionUncheckedCreateWithoutMediaInput>
  }

  export type UploadSessionUpdateWithWhereUniqueWithoutMediaInput = {
    where: UploadSessionWhereUniqueInput
    data: XOR<UploadSessionUpdateWithoutMediaInput, UploadSessionUncheckedUpdateWithoutMediaInput>
  }

  export type UploadSessionUpdateManyWithWhereWithoutMediaInput = {
    where: UploadSessionScalarWhereInput
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyWithoutMediaInput>
  }

  export type UploadSessionScalarWhereInput = {
    AND?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
    OR?: UploadSessionScalarWhereInput[]
    NOT?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
    id?: StringFilter<"UploadSession"> | string
    mediaId?: StringFilter<"UploadSession"> | string
    ownerUserId?: StringFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusFilter<"UploadSession"> | $Enums.UploadSessionStatus
    checksum?: StringNullableFilter<"UploadSession"> | string | null
    expiresAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
  }

  export type MediaObjectCreateWithoutVariantsInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    uploadSessions?: UploadSessionCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectUncheckedCreateWithoutVariantsInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectCreateOrConnectWithoutVariantsInput = {
    where: MediaObjectWhereUniqueInput
    create: XOR<MediaObjectCreateWithoutVariantsInput, MediaObjectUncheckedCreateWithoutVariantsInput>
  }

  export type MediaObjectUpsertWithoutVariantsInput = {
    update: XOR<MediaObjectUpdateWithoutVariantsInput, MediaObjectUncheckedUpdateWithoutVariantsInput>
    create: XOR<MediaObjectCreateWithoutVariantsInput, MediaObjectUncheckedCreateWithoutVariantsInput>
    where?: MediaObjectWhereInput
  }

  export type MediaObjectUpdateToOneWithWhereWithoutVariantsInput = {
    where?: MediaObjectWhereInput
    data: XOR<MediaObjectUpdateWithoutVariantsInput, MediaObjectUncheckedUpdateWithoutVariantsInput>
  }

  export type MediaObjectUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadSessions?: UploadSessionUpdateManyWithoutMediaNestedInput
  }

  export type MediaObjectUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaObjectCreateWithoutUploadSessionsInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    variants?: MediaVariantCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectUncheckedCreateWithoutUploadSessionsInput = {
    id: string
    ownerUserId: string
    storageKey: string
    mediaType: $Enums.MediaType
    mimeType: string
    sizeBytes: bigint | number
    checksum?: string | null
    processingStatus: $Enums.ProcessingStatus
    createdAt?: Date | string
    processedAt?: Date | string | null
    deletedAt?: Date | string | null
    variants?: MediaVariantUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaObjectCreateOrConnectWithoutUploadSessionsInput = {
    where: MediaObjectWhereUniqueInput
    create: XOR<MediaObjectCreateWithoutUploadSessionsInput, MediaObjectUncheckedCreateWithoutUploadSessionsInput>
  }

  export type MediaObjectUpsertWithoutUploadSessionsInput = {
    update: XOR<MediaObjectUpdateWithoutUploadSessionsInput, MediaObjectUncheckedUpdateWithoutUploadSessionsInput>
    create: XOR<MediaObjectCreateWithoutUploadSessionsInput, MediaObjectUncheckedCreateWithoutUploadSessionsInput>
    where?: MediaObjectWhereInput
  }

  export type MediaObjectUpdateToOneWithWhereWithoutUploadSessionsInput = {
    where?: MediaObjectWhereInput
    data: XOR<MediaObjectUpdateWithoutUploadSessionsInput, MediaObjectUncheckedUpdateWithoutUploadSessionsInput>
  }

  export type MediaObjectUpdateWithoutUploadSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: MediaVariantUpdateManyWithoutMediaNestedInput
  }

  export type MediaObjectUncheckedUpdateWithoutUploadSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: BigIntFieldUpdateOperationsInput | bigint | number
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    processingStatus?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: MediaVariantUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaVariantCreateManyMediaInput = {
    id: string
    variantType: string
    storageKey: string
    width?: number | null
    height?: number | null
    durationMs?: number | null
    sizeBytes?: bigint | number | null
    createdAt?: Date | string
  }

  export type UploadSessionCreateManyMediaInput = {
    id: string
    ownerUserId: string
    status: $Enums.UploadSessionStatus
    checksum?: string | null
    expiresAt: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type MediaVariantUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaVariantUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaVariantUncheckedUpdateManyWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantType?: StringFieldUpdateOperationsInput | string
    storageKey?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    sizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUncheckedUpdateManyWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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