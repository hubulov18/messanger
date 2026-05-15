
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
 * Model DeviceRegistration
 * 
 */
export type DeviceRegistration = $Result.DefaultSelection<Prisma.$DeviceRegistrationPayload>
/**
 * Model NotificationPreference
 * 
 */
export type NotificationPreference = $Result.DefaultSelection<Prisma.$NotificationPreferencePayload>
/**
 * Model NotificationDeliveryLog
 * 
 */
export type NotificationDeliveryLog = $Result.DefaultSelection<Prisma.$NotificationDeliveryLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DevicePlatform: {
  ios: 'ios',
  android: 'android',
  web: 'web'
};

export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform]


export const NotificationDeliveryStatus: {
  pending: 'pending',
  sent: 'sent',
  failed: 'failed'
};

export type NotificationDeliveryStatus = (typeof NotificationDeliveryStatus)[keyof typeof NotificationDeliveryStatus]

}

export type DevicePlatform = $Enums.DevicePlatform

export const DevicePlatform: typeof $Enums.DevicePlatform

export type NotificationDeliveryStatus = $Enums.NotificationDeliveryStatus

export const NotificationDeliveryStatus: typeof $Enums.NotificationDeliveryStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DeviceRegistrations
 * const deviceRegistrations = await prisma.deviceRegistration.findMany()
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
   * // Fetch zero or more DeviceRegistrations
   * const deviceRegistrations = await prisma.deviceRegistration.findMany()
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
   * `prisma.deviceRegistration`: Exposes CRUD operations for the **DeviceRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceRegistrations
    * const deviceRegistrations = await prisma.deviceRegistration.findMany()
    * ```
    */
  get deviceRegistration(): Prisma.DeviceRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationPreference`: Exposes CRUD operations for the **NotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreference.findMany()
    * ```
    */
  get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationDeliveryLog`: Exposes CRUD operations for the **NotificationDeliveryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationDeliveryLogs
    * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany()
    * ```
    */
  get notificationDeliveryLog(): Prisma.NotificationDeliveryLogDelegate<ExtArgs, ClientOptions>;
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
    DeviceRegistration: 'DeviceRegistration',
    NotificationPreference: 'NotificationPreference',
    NotificationDeliveryLog: 'NotificationDeliveryLog'
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
      modelProps: "deviceRegistration" | "notificationPreference" | "notificationDeliveryLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DeviceRegistration: {
        payload: Prisma.$DeviceRegistrationPayload<ExtArgs>
        fields: Prisma.DeviceRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          findFirst: {
            args: Prisma.DeviceRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          findMany: {
            args: Prisma.DeviceRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[]
          }
          create: {
            args: Prisma.DeviceRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          createMany: {
            args: Prisma.DeviceRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[]
          }
          delete: {
            args: Prisma.DeviceRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          update: {
            args: Prisma.DeviceRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.DeviceRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.DeviceRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceRegistrationPayload>
          }
          aggregate: {
            args: Prisma.DeviceRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeviceRegistration>
          }
          groupBy: {
            args: Prisma.DeviceRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceRegistrationCountAggregateOutputType> | number
          }
        }
      }
      NotificationPreference: {
        payload: Prisma.$NotificationPreferencePayload<ExtArgs>
        fields: Prisma.NotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          update: {
            args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          upsert: {
            args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreference>
          }
          groupBy: {
            args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
      NotificationDeliveryLog: {
        payload: Prisma.$NotificationDeliveryLogPayload<ExtArgs>
        fields: Prisma.NotificationDeliveryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationDeliveryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationDeliveryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          findMany: {
            args: Prisma.NotificationDeliveryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>[]
          }
          create: {
            args: Prisma.NotificationDeliveryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          createMany: {
            args: Prisma.NotificationDeliveryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationDeliveryLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeliveryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          update: {
            args: Prisma.NotificationDeliveryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeliveryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationDeliveryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationDeliveryLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>[]
          }
          upsert: {
            args: Prisma.NotificationDeliveryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationDeliveryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationDeliveryLog>
          }
          groupBy: {
            args: Prisma.NotificationDeliveryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationDeliveryLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationDeliveryLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationDeliveryLogCountAggregateOutputType> | number
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
    deviceRegistration?: DeviceRegistrationOmit
    notificationPreference?: NotificationPreferenceOmit
    notificationDeliveryLog?: NotificationDeliveryLogOmit
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
   * Models
   */

  /**
   * Model DeviceRegistration
   */

  export type AggregateDeviceRegistration = {
    _count: DeviceRegistrationCountAggregateOutputType | null
    _min: DeviceRegistrationMinAggregateOutputType | null
    _max: DeviceRegistrationMaxAggregateOutputType | null
  }

  export type DeviceRegistrationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: $Enums.DevicePlatform | null
    deviceId: string | null
    pushToken: string | null
    voipPushToken: string | null
    appVersion: string | null
    lastRegisteredAt: Date | null
    revokedAt: Date | null
  }

  export type DeviceRegistrationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    platform: $Enums.DevicePlatform | null
    deviceId: string | null
    pushToken: string | null
    voipPushToken: string | null
    appVersion: string | null
    lastRegisteredAt: Date | null
    revokedAt: Date | null
  }

  export type DeviceRegistrationCountAggregateOutputType = {
    id: number
    userId: number
    platform: number
    deviceId: number
    pushToken: number
    voipPushToken: number
    appVersion: number
    lastRegisteredAt: number
    revokedAt: number
    _all: number
  }


  export type DeviceRegistrationMinAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    deviceId?: true
    pushToken?: true
    voipPushToken?: true
    appVersion?: true
    lastRegisteredAt?: true
    revokedAt?: true
  }

  export type DeviceRegistrationMaxAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    deviceId?: true
    pushToken?: true
    voipPushToken?: true
    appVersion?: true
    lastRegisteredAt?: true
    revokedAt?: true
  }

  export type DeviceRegistrationCountAggregateInputType = {
    id?: true
    userId?: true
    platform?: true
    deviceId?: true
    pushToken?: true
    voipPushToken?: true
    appVersion?: true
    lastRegisteredAt?: true
    revokedAt?: true
    _all?: true
  }

  export type DeviceRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceRegistration to aggregate.
     */
    where?: DeviceRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceRegistrations to fetch.
     */
    orderBy?: DeviceRegistrationOrderByWithRelationInput | DeviceRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceRegistrations
    **/
    _count?: true | DeviceRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceRegistrationMaxAggregateInputType
  }

  export type GetDeviceRegistrationAggregateType<T extends DeviceRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceRegistration[P]>
      : GetScalarType<T[P], AggregateDeviceRegistration[P]>
  }




  export type DeviceRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceRegistrationWhereInput
    orderBy?: DeviceRegistrationOrderByWithAggregationInput | DeviceRegistrationOrderByWithAggregationInput[]
    by: DeviceRegistrationScalarFieldEnum[] | DeviceRegistrationScalarFieldEnum
    having?: DeviceRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceRegistrationCountAggregateInputType | true
    _min?: DeviceRegistrationMinAggregateInputType
    _max?: DeviceRegistrationMaxAggregateInputType
  }

  export type DeviceRegistrationGroupByOutputType = {
    id: string
    userId: string
    platform: $Enums.DevicePlatform
    deviceId: string
    pushToken: string | null
    voipPushToken: string | null
    appVersion: string | null
    lastRegisteredAt: Date
    revokedAt: Date | null
    _count: DeviceRegistrationCountAggregateOutputType | null
    _min: DeviceRegistrationMinAggregateOutputType | null
    _max: DeviceRegistrationMaxAggregateOutputType | null
  }

  type GetDeviceRegistrationGroupByPayload<T extends DeviceRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type DeviceRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    deviceId?: boolean
    pushToken?: boolean
    voipPushToken?: boolean
    appVersion?: boolean
    lastRegisteredAt?: boolean
    revokedAt?: boolean
  }, ExtArgs["result"]["deviceRegistration"]>

  export type DeviceRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    deviceId?: boolean
    pushToken?: boolean
    voipPushToken?: boolean
    appVersion?: boolean
    lastRegisteredAt?: boolean
    revokedAt?: boolean
  }, ExtArgs["result"]["deviceRegistration"]>

  export type DeviceRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    platform?: boolean
    deviceId?: boolean
    pushToken?: boolean
    voipPushToken?: boolean
    appVersion?: boolean
    lastRegisteredAt?: boolean
    revokedAt?: boolean
  }, ExtArgs["result"]["deviceRegistration"]>

  export type DeviceRegistrationSelectScalar = {
    id?: boolean
    userId?: boolean
    platform?: boolean
    deviceId?: boolean
    pushToken?: boolean
    voipPushToken?: boolean
    appVersion?: boolean
    lastRegisteredAt?: boolean
    revokedAt?: boolean
  }

  export type DeviceRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "platform" | "deviceId" | "pushToken" | "voipPushToken" | "appVersion" | "lastRegisteredAt" | "revokedAt", ExtArgs["result"]["deviceRegistration"]>

  export type $DeviceRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceRegistration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      platform: $Enums.DevicePlatform
      deviceId: string
      pushToken: string | null
      voipPushToken: string | null
      appVersion: string | null
      lastRegisteredAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["deviceRegistration"]>
    composites: {}
  }

  type DeviceRegistrationGetPayload<S extends boolean | null | undefined | DeviceRegistrationDefaultArgs> = $Result.GetResult<Prisma.$DeviceRegistrationPayload, S>

  type DeviceRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceRegistrationCountAggregateInputType | true
    }

  export interface DeviceRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceRegistration'], meta: { name: 'DeviceRegistration' } }
    /**
     * Find zero or one DeviceRegistration that matches the filter.
     * @param {DeviceRegistrationFindUniqueArgs} args - Arguments to find a DeviceRegistration
     * @example
     * // Get one DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceRegistrationFindUniqueArgs>(args: SelectSubset<T, DeviceRegistrationFindUniqueArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeviceRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceRegistrationFindUniqueOrThrowArgs} args - Arguments to find a DeviceRegistration
     * @example
     * // Get one DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationFindFirstArgs} args - Arguments to find a DeviceRegistration
     * @example
     * // Get one DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceRegistrationFindFirstArgs>(args?: SelectSubset<T, DeviceRegistrationFindFirstArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationFindFirstOrThrowArgs} args - Arguments to find a DeviceRegistration
     * @example
     * // Get one DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeviceRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceRegistrations
     * const deviceRegistrations = await prisma.deviceRegistration.findMany()
     * 
     * // Get first 10 DeviceRegistrations
     * const deviceRegistrations = await prisma.deviceRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceRegistrationWithIdOnly = await prisma.deviceRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceRegistrationFindManyArgs>(args?: SelectSubset<T, DeviceRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeviceRegistration.
     * @param {DeviceRegistrationCreateArgs} args - Arguments to create a DeviceRegistration.
     * @example
     * // Create one DeviceRegistration
     * const DeviceRegistration = await prisma.deviceRegistration.create({
     *   data: {
     *     // ... data to create a DeviceRegistration
     *   }
     * })
     * 
     */
    create<T extends DeviceRegistrationCreateArgs>(args: SelectSubset<T, DeviceRegistrationCreateArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeviceRegistrations.
     * @param {DeviceRegistrationCreateManyArgs} args - Arguments to create many DeviceRegistrations.
     * @example
     * // Create many DeviceRegistrations
     * const deviceRegistration = await prisma.deviceRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceRegistrationCreateManyArgs>(args?: SelectSubset<T, DeviceRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeviceRegistrations and returns the data saved in the database.
     * @param {DeviceRegistrationCreateManyAndReturnArgs} args - Arguments to create many DeviceRegistrations.
     * @example
     * // Create many DeviceRegistrations
     * const deviceRegistration = await prisma.deviceRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeviceRegistrations and only return the `id`
     * const deviceRegistrationWithIdOnly = await prisma.deviceRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeviceRegistration.
     * @param {DeviceRegistrationDeleteArgs} args - Arguments to delete one DeviceRegistration.
     * @example
     * // Delete one DeviceRegistration
     * const DeviceRegistration = await prisma.deviceRegistration.delete({
     *   where: {
     *     // ... filter to delete one DeviceRegistration
     *   }
     * })
     * 
     */
    delete<T extends DeviceRegistrationDeleteArgs>(args: SelectSubset<T, DeviceRegistrationDeleteArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeviceRegistration.
     * @param {DeviceRegistrationUpdateArgs} args - Arguments to update one DeviceRegistration.
     * @example
     * // Update one DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceRegistrationUpdateArgs>(args: SelectSubset<T, DeviceRegistrationUpdateArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeviceRegistrations.
     * @param {DeviceRegistrationDeleteManyArgs} args - Arguments to filter DeviceRegistrations to delete.
     * @example
     * // Delete a few DeviceRegistrations
     * const { count } = await prisma.deviceRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceRegistrationDeleteManyArgs>(args?: SelectSubset<T, DeviceRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceRegistrations
     * const deviceRegistration = await prisma.deviceRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceRegistrationUpdateManyArgs>(args: SelectSubset<T, DeviceRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceRegistrations and returns the data updated in the database.
     * @param {DeviceRegistrationUpdateManyAndReturnArgs} args - Arguments to update many DeviceRegistrations.
     * @example
     * // Update many DeviceRegistrations
     * const deviceRegistration = await prisma.deviceRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeviceRegistrations and only return the `id`
     * const deviceRegistrationWithIdOnly = await prisma.deviceRegistration.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeviceRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeviceRegistration.
     * @param {DeviceRegistrationUpsertArgs} args - Arguments to update or create a DeviceRegistration.
     * @example
     * // Update or create a DeviceRegistration
     * const deviceRegistration = await prisma.deviceRegistration.upsert({
     *   create: {
     *     // ... data to create a DeviceRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceRegistration we want to update
     *   }
     * })
     */
    upsert<T extends DeviceRegistrationUpsertArgs>(args: SelectSubset<T, DeviceRegistrationUpsertArgs<ExtArgs>>): Prisma__DeviceRegistrationClient<$Result.GetResult<Prisma.$DeviceRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeviceRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationCountArgs} args - Arguments to filter DeviceRegistrations to count.
     * @example
     * // Count the number of DeviceRegistrations
     * const count = await prisma.deviceRegistration.count({
     *   where: {
     *     // ... the filter for the DeviceRegistrations we want to count
     *   }
     * })
    **/
    count<T extends DeviceRegistrationCountArgs>(
      args?: Subset<T, DeviceRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeviceRegistrationAggregateArgs>(args: Subset<T, DeviceRegistrationAggregateArgs>): Prisma.PrismaPromise<GetDeviceRegistrationAggregateType<T>>

    /**
     * Group by DeviceRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceRegistrationGroupByArgs} args - Group by arguments.
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
      T extends DeviceRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: DeviceRegistrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeviceRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceRegistration model
   */
  readonly fields: DeviceRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the DeviceRegistration model
   */
  interface DeviceRegistrationFieldRefs {
    readonly id: FieldRef<"DeviceRegistration", 'String'>
    readonly userId: FieldRef<"DeviceRegistration", 'String'>
    readonly platform: FieldRef<"DeviceRegistration", 'DevicePlatform'>
    readonly deviceId: FieldRef<"DeviceRegistration", 'String'>
    readonly pushToken: FieldRef<"DeviceRegistration", 'String'>
    readonly voipPushToken: FieldRef<"DeviceRegistration", 'String'>
    readonly appVersion: FieldRef<"DeviceRegistration", 'String'>
    readonly lastRegisteredAt: FieldRef<"DeviceRegistration", 'DateTime'>
    readonly revokedAt: FieldRef<"DeviceRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeviceRegistration findUnique
   */
  export type DeviceRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which DeviceRegistration to fetch.
     */
    where: DeviceRegistrationWhereUniqueInput
  }

  /**
   * DeviceRegistration findUniqueOrThrow
   */
  export type DeviceRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which DeviceRegistration to fetch.
     */
    where: DeviceRegistrationWhereUniqueInput
  }

  /**
   * DeviceRegistration findFirst
   */
  export type DeviceRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which DeviceRegistration to fetch.
     */
    where?: DeviceRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceRegistrations to fetch.
     */
    orderBy?: DeviceRegistrationOrderByWithRelationInput | DeviceRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceRegistrations.
     */
    cursor?: DeviceRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceRegistrations.
     */
    distinct?: DeviceRegistrationScalarFieldEnum | DeviceRegistrationScalarFieldEnum[]
  }

  /**
   * DeviceRegistration findFirstOrThrow
   */
  export type DeviceRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which DeviceRegistration to fetch.
     */
    where?: DeviceRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceRegistrations to fetch.
     */
    orderBy?: DeviceRegistrationOrderByWithRelationInput | DeviceRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceRegistrations.
     */
    cursor?: DeviceRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceRegistrations.
     */
    distinct?: DeviceRegistrationScalarFieldEnum | DeviceRegistrationScalarFieldEnum[]
  }

  /**
   * DeviceRegistration findMany
   */
  export type DeviceRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which DeviceRegistrations to fetch.
     */
    where?: DeviceRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceRegistrations to fetch.
     */
    orderBy?: DeviceRegistrationOrderByWithRelationInput | DeviceRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceRegistrations.
     */
    cursor?: DeviceRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceRegistrations.
     */
    skip?: number
    distinct?: DeviceRegistrationScalarFieldEnum | DeviceRegistrationScalarFieldEnum[]
  }

  /**
   * DeviceRegistration create
   */
  export type DeviceRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to create a DeviceRegistration.
     */
    data: XOR<DeviceRegistrationCreateInput, DeviceRegistrationUncheckedCreateInput>
  }

  /**
   * DeviceRegistration createMany
   */
  export type DeviceRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeviceRegistrations.
     */
    data: DeviceRegistrationCreateManyInput | DeviceRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeviceRegistration createManyAndReturn
   */
  export type DeviceRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many DeviceRegistrations.
     */
    data: DeviceRegistrationCreateManyInput | DeviceRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeviceRegistration update
   */
  export type DeviceRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to update a DeviceRegistration.
     */
    data: XOR<DeviceRegistrationUpdateInput, DeviceRegistrationUncheckedUpdateInput>
    /**
     * Choose, which DeviceRegistration to update.
     */
    where: DeviceRegistrationWhereUniqueInput
  }

  /**
   * DeviceRegistration updateMany
   */
  export type DeviceRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceRegistrations.
     */
    data: XOR<DeviceRegistrationUpdateManyMutationInput, DeviceRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which DeviceRegistrations to update
     */
    where?: DeviceRegistrationWhereInput
    /**
     * Limit how many DeviceRegistrations to update.
     */
    limit?: number
  }

  /**
   * DeviceRegistration updateManyAndReturn
   */
  export type DeviceRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update DeviceRegistrations.
     */
    data: XOR<DeviceRegistrationUpdateManyMutationInput, DeviceRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which DeviceRegistrations to update
     */
    where?: DeviceRegistrationWhereInput
    /**
     * Limit how many DeviceRegistrations to update.
     */
    limit?: number
  }

  /**
   * DeviceRegistration upsert
   */
  export type DeviceRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * The filter to search for the DeviceRegistration to update in case it exists.
     */
    where: DeviceRegistrationWhereUniqueInput
    /**
     * In case the DeviceRegistration found by the `where` argument doesn't exist, create a new DeviceRegistration with this data.
     */
    create: XOR<DeviceRegistrationCreateInput, DeviceRegistrationUncheckedCreateInput>
    /**
     * In case the DeviceRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceRegistrationUpdateInput, DeviceRegistrationUncheckedUpdateInput>
  }

  /**
   * DeviceRegistration delete
   */
  export type DeviceRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
    /**
     * Filter which DeviceRegistration to delete.
     */
    where: DeviceRegistrationWhereUniqueInput
  }

  /**
   * DeviceRegistration deleteMany
   */
  export type DeviceRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceRegistrations to delete
     */
    where?: DeviceRegistrationWhereInput
    /**
     * Limit how many DeviceRegistrations to delete.
     */
    limit?: number
  }

  /**
   * DeviceRegistration without action
   */
  export type DeviceRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceRegistration
     */
    select?: DeviceRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceRegistration
     */
    omit?: DeviceRegistrationOmit<ExtArgs> | null
  }


  /**
   * Model NotificationPreference
   */

  export type AggregateNotificationPreference = {
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  export type NotificationPreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    chatId: string | null
    isMuted: boolean | null
    muteUntil: Date | null
    showPreview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    chatId: string | null
    isMuted: boolean | null
    muteUntil: Date | null
    showPreview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceCountAggregateOutputType = {
    id: number
    userId: number
    chatId: number
    isMuted: number
    muteUntil: number
    showPreview: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationPreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    chatId?: true
    isMuted?: true
    muteUntil?: true
    showPreview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    chatId?: true
    isMuted?: true
    muteUntil?: true
    showPreview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    chatId?: true
    isMuted?: true
    muteUntil?: true
    showPreview?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreference to aggregate.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type GetNotificationPreferenceAggregateType<T extends NotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreference[P]>
      : GetScalarType<T[P], AggregateNotificationPreference[P]>
  }




  export type NotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithAggregationInput | NotificationPreferenceOrderByWithAggregationInput[]
    by: NotificationPreferenceScalarFieldEnum[] | NotificationPreferenceScalarFieldEnum
    having?: NotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferenceCountAggregateInputType | true
    _min?: NotificationPreferenceMinAggregateInputType
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type NotificationPreferenceGroupByOutputType = {
    id: string
    userId: string
    chatId: string | null
    isMuted: boolean
    muteUntil: Date | null
    showPreview: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  type GetNotificationPreferenceGroupByPayload<T extends NotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chatId?: boolean
    isMuted?: boolean
    muteUntil?: boolean
    showPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chatId?: boolean
    isMuted?: boolean
    muteUntil?: boolean
    showPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chatId?: boolean
    isMuted?: boolean
    muteUntil?: boolean
    showPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    chatId?: boolean
    isMuted?: boolean
    muteUntil?: boolean
    showPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "chatId" | "isMuted" | "muteUntil" | "showPreview" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationPreference"]>

  export type $NotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreference"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      chatId: string | null
      isMuted: boolean
      muteUntil: Date | null
      showPreview: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationPreference"]>
    composites: {}
  }

  type NotificationPreferenceGetPayload<S extends boolean | null | undefined | NotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencePayload, S>

  type NotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationPreferenceCountAggregateInputType | true
    }

  export interface NotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreference'], meta: { name: 'NotificationPreference' } }
    /**
     * Find zero or one NotificationPreference that matches the filter.
     * @param {NotificationPreferenceFindUniqueArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferenceFindManyArgs>(args?: SelectSubset<T, NotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationPreference.
     * @param {NotificationPreferenceCreateArgs} args - Arguments to create a NotificationPreference.
     * @example
     * // Create one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.create({
     *   data: {
     *     // ... data to create a NotificationPreference
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferenceCreateArgs>(args: SelectSubset<T, NotificationPreferenceCreateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferenceCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationPreference.
     * @param {NotificationPreferenceDeleteArgs} args - Arguments to delete one NotificationPreference.
     * @example
     * // Delete one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferenceDeleteArgs>(args: SelectSubset<T, NotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationPreference.
     * @param {NotificationPreferenceUpdateArgs} args - Arguments to update one NotificationPreference.
     * @example
     * // Update one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferenceUpdateArgs>(args: SelectSubset<T, NotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferenceDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences and returns the data updated in the database.
     * @param {NotificationPreferenceUpdateManyAndReturnArgs} args - Arguments to update many NotificationPreferences.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationPreference.
     * @param {NotificationPreferenceUpsertArgs} args - Arguments to update or create a NotificationPreference.
     * @example
     * // Update or create a NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.upsert({
     *   create: {
     *     // ... data to create a NotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferenceUpsertArgs>(args: SelectSubset<T, NotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreference.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferenceCountArgs>(
      args?: Subset<T, NotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationPreferenceAggregateArgs>(args: Subset<T, NotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferenceAggregateType<T>>

    /**
     * Group by NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceGroupByArgs} args - Group by arguments.
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
      T extends NotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreference model
   */
  readonly fields: NotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NotificationPreference model
   */
  interface NotificationPreferenceFieldRefs {
    readonly id: FieldRef<"NotificationPreference", 'String'>
    readonly userId: FieldRef<"NotificationPreference", 'String'>
    readonly chatId: FieldRef<"NotificationPreference", 'String'>
    readonly isMuted: FieldRef<"NotificationPreference", 'Boolean'>
    readonly muteUntil: FieldRef<"NotificationPreference", 'DateTime'>
    readonly showPreview: FieldRef<"NotificationPreference", 'Boolean'>
    readonly createdAt: FieldRef<"NotificationPreference", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreference findUnique
   */
  export type NotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findUniqueOrThrow
   */
  export type NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findFirst
   */
  export type NotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findFirstOrThrow
   */
  export type NotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findMany
   */
  export type NotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference create
   */
  export type NotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreference.
     */
    data: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
  }

  /**
   * NotificationPreference createMany
   */
  export type NotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference createManyAndReturn
   */
  export type NotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference update
   */
  export type NotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreference.
     */
    data: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreference to update.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference updateMany
   */
  export type NotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference updateManyAndReturn
   */
  export type NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference upsert
   */
  export type NotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreference to update in case it exists.
     */
    where: NotificationPreferenceWhereUniqueInput
    /**
     * In case the NotificationPreference found by the `where` argument doesn't exist, create a new NotificationPreference with this data.
     */
    create: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
    /**
     * In case the NotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * NotificationPreference delete
   */
  export type NotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter which NotificationPreference to delete.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference deleteMany
   */
  export type NotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * NotificationPreference without action
   */
  export type NotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
  }


  /**
   * Model NotificationDeliveryLog
   */

  export type AggregateNotificationDeliveryLog = {
    _count: NotificationDeliveryLogCountAggregateOutputType | null
    _min: NotificationDeliveryLogMinAggregateOutputType | null
    _max: NotificationDeliveryLogMaxAggregateOutputType | null
  }

  export type NotificationDeliveryLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceEventId: string | null
    provider: string | null
    status: $Enums.NotificationDeliveryStatus | null
    reasonCode: string | null
    createdAt: Date | null
  }

  export type NotificationDeliveryLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceEventId: string | null
    provider: string | null
    status: $Enums.NotificationDeliveryStatus | null
    reasonCode: string | null
    createdAt: Date | null
  }

  export type NotificationDeliveryLogCountAggregateOutputType = {
    id: number
    userId: number
    sourceEventId: number
    provider: number
    status: number
    reasonCode: number
    createdAt: number
    _all: number
  }


  export type NotificationDeliveryLogMinAggregateInputType = {
    id?: true
    userId?: true
    sourceEventId?: true
    provider?: true
    status?: true
    reasonCode?: true
    createdAt?: true
  }

  export type NotificationDeliveryLogMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceEventId?: true
    provider?: true
    status?: true
    reasonCode?: true
    createdAt?: true
  }

  export type NotificationDeliveryLogCountAggregateInputType = {
    id?: true
    userId?: true
    sourceEventId?: true
    provider?: true
    status?: true
    reasonCode?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationDeliveryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDeliveryLog to aggregate.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationDeliveryLogs
    **/
    _count?: true | NotificationDeliveryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationDeliveryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationDeliveryLogMaxAggregateInputType
  }

  export type GetNotificationDeliveryLogAggregateType<T extends NotificationDeliveryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationDeliveryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationDeliveryLog[P]>
      : GetScalarType<T[P], AggregateNotificationDeliveryLog[P]>
  }




  export type NotificationDeliveryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationDeliveryLogWhereInput
    orderBy?: NotificationDeliveryLogOrderByWithAggregationInput | NotificationDeliveryLogOrderByWithAggregationInput[]
    by: NotificationDeliveryLogScalarFieldEnum[] | NotificationDeliveryLogScalarFieldEnum
    having?: NotificationDeliveryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationDeliveryLogCountAggregateInputType | true
    _min?: NotificationDeliveryLogMinAggregateInputType
    _max?: NotificationDeliveryLogMaxAggregateInputType
  }

  export type NotificationDeliveryLogGroupByOutputType = {
    id: string
    userId: string
    sourceEventId: string
    provider: string
    status: $Enums.NotificationDeliveryStatus
    reasonCode: string | null
    createdAt: Date
    _count: NotificationDeliveryLogCountAggregateOutputType | null
    _min: NotificationDeliveryLogMinAggregateOutputType | null
    _max: NotificationDeliveryLogMaxAggregateOutputType | null
  }

  type GetNotificationDeliveryLogGroupByPayload<T extends NotificationDeliveryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationDeliveryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationDeliveryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationDeliveryLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationDeliveryLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationDeliveryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceEventId?: boolean
    provider?: boolean
    status?: boolean
    reasonCode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationDeliveryLog"]>

  export type NotificationDeliveryLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceEventId?: boolean
    provider?: boolean
    status?: boolean
    reasonCode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationDeliveryLog"]>

  export type NotificationDeliveryLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceEventId?: boolean
    provider?: boolean
    status?: boolean
    reasonCode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationDeliveryLog"]>

  export type NotificationDeliveryLogSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceEventId?: boolean
    provider?: boolean
    status?: boolean
    reasonCode?: boolean
    createdAt?: boolean
  }

  export type NotificationDeliveryLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sourceEventId" | "provider" | "status" | "reasonCode" | "createdAt", ExtArgs["result"]["notificationDeliveryLog"]>

  export type $NotificationDeliveryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationDeliveryLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sourceEventId: string
      provider: string
      status: $Enums.NotificationDeliveryStatus
      reasonCode: string | null
      createdAt: Date
    }, ExtArgs["result"]["notificationDeliveryLog"]>
    composites: {}
  }

  type NotificationDeliveryLogGetPayload<S extends boolean | null | undefined | NotificationDeliveryLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationDeliveryLogPayload, S>

  type NotificationDeliveryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationDeliveryLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationDeliveryLogCountAggregateInputType | true
    }

  export interface NotificationDeliveryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationDeliveryLog'], meta: { name: 'NotificationDeliveryLog' } }
    /**
     * Find zero or one NotificationDeliveryLog that matches the filter.
     * @param {NotificationDeliveryLogFindUniqueArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationDeliveryLogFindUniqueArgs>(args: SelectSubset<T, NotificationDeliveryLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationDeliveryLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationDeliveryLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationDeliveryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationDeliveryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindFirstArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationDeliveryLogFindFirstArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindFirstArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationDeliveryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindFirstOrThrowArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationDeliveryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationDeliveryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationDeliveryLogs
     * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany()
     * 
     * // Get first 10 NotificationDeliveryLogs
     * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationDeliveryLogWithIdOnly = await prisma.notificationDeliveryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationDeliveryLogFindManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationDeliveryLog.
     * @param {NotificationDeliveryLogCreateArgs} args - Arguments to create a NotificationDeliveryLog.
     * @example
     * // Create one NotificationDeliveryLog
     * const NotificationDeliveryLog = await prisma.notificationDeliveryLog.create({
     *   data: {
     *     // ... data to create a NotificationDeliveryLog
     *   }
     * })
     * 
     */
    create<T extends NotificationDeliveryLogCreateArgs>(args: SelectSubset<T, NotificationDeliveryLogCreateArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationDeliveryLogs.
     * @param {NotificationDeliveryLogCreateManyArgs} args - Arguments to create many NotificationDeliveryLogs.
     * @example
     * // Create many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationDeliveryLogCreateManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationDeliveryLogs and returns the data saved in the database.
     * @param {NotificationDeliveryLogCreateManyAndReturnArgs} args - Arguments to create many NotificationDeliveryLogs.
     * @example
     * // Create many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationDeliveryLogs and only return the `id`
     * const notificationDeliveryLogWithIdOnly = await prisma.notificationDeliveryLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationDeliveryLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationDeliveryLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationDeliveryLog.
     * @param {NotificationDeliveryLogDeleteArgs} args - Arguments to delete one NotificationDeliveryLog.
     * @example
     * // Delete one NotificationDeliveryLog
     * const NotificationDeliveryLog = await prisma.notificationDeliveryLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationDeliveryLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeliveryLogDeleteArgs>(args: SelectSubset<T, NotificationDeliveryLogDeleteArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationDeliveryLog.
     * @param {NotificationDeliveryLogUpdateArgs} args - Arguments to update one NotificationDeliveryLog.
     * @example
     * // Update one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationDeliveryLogUpdateArgs>(args: SelectSubset<T, NotificationDeliveryLogUpdateArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationDeliveryLogs.
     * @param {NotificationDeliveryLogDeleteManyArgs} args - Arguments to filter NotificationDeliveryLogs to delete.
     * @example
     * // Delete a few NotificationDeliveryLogs
     * const { count } = await prisma.notificationDeliveryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeliveryLogDeleteManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationDeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationDeliveryLogUpdateManyArgs>(args: SelectSubset<T, NotificationDeliveryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationDeliveryLogs and returns the data updated in the database.
     * @param {NotificationDeliveryLogUpdateManyAndReturnArgs} args - Arguments to update many NotificationDeliveryLogs.
     * @example
     * // Update many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationDeliveryLogs and only return the `id`
     * const notificationDeliveryLogWithIdOnly = await prisma.notificationDeliveryLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationDeliveryLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationDeliveryLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationDeliveryLog.
     * @param {NotificationDeliveryLogUpsertArgs} args - Arguments to update or create a NotificationDeliveryLog.
     * @example
     * // Update or create a NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.upsert({
     *   create: {
     *     // ... data to create a NotificationDeliveryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationDeliveryLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationDeliveryLogUpsertArgs>(args: SelectSubset<T, NotificationDeliveryLogUpsertArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationDeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogCountArgs} args - Arguments to filter NotificationDeliveryLogs to count.
     * @example
     * // Count the number of NotificationDeliveryLogs
     * const count = await prisma.notificationDeliveryLog.count({
     *   where: {
     *     // ... the filter for the NotificationDeliveryLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationDeliveryLogCountArgs>(
      args?: Subset<T, NotificationDeliveryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationDeliveryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationDeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationDeliveryLogAggregateArgs>(args: Subset<T, NotificationDeliveryLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationDeliveryLogAggregateType<T>>

    /**
     * Group by NotificationDeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogGroupByArgs} args - Group by arguments.
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
      T extends NotificationDeliveryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationDeliveryLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationDeliveryLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationDeliveryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationDeliveryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationDeliveryLog model
   */
  readonly fields: NotificationDeliveryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationDeliveryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationDeliveryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NotificationDeliveryLog model
   */
  interface NotificationDeliveryLogFieldRefs {
    readonly id: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly userId: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly sourceEventId: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly provider: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly status: FieldRef<"NotificationDeliveryLog", 'NotificationDeliveryStatus'>
    readonly reasonCode: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly createdAt: FieldRef<"NotificationDeliveryLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationDeliveryLog findUnique
   */
  export type NotificationDeliveryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog findUniqueOrThrow
   */
  export type NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog findFirst
   */
  export type NotificationDeliveryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationDeliveryLogs.
     */
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog findFirstOrThrow
   */
  export type NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationDeliveryLogs.
     */
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog findMany
   */
  export type NotificationDeliveryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLogs to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog create
   */
  export type NotificationDeliveryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationDeliveryLog.
     */
    data: XOR<NotificationDeliveryLogCreateInput, NotificationDeliveryLogUncheckedCreateInput>
  }

  /**
   * NotificationDeliveryLog createMany
   */
  export type NotificationDeliveryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationDeliveryLogs.
     */
    data: NotificationDeliveryLogCreateManyInput | NotificationDeliveryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationDeliveryLog createManyAndReturn
   */
  export type NotificationDeliveryLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationDeliveryLogs.
     */
    data: NotificationDeliveryLogCreateManyInput | NotificationDeliveryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationDeliveryLog update
   */
  export type NotificationDeliveryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationDeliveryLog.
     */
    data: XOR<NotificationDeliveryLogUpdateInput, NotificationDeliveryLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationDeliveryLog to update.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog updateMany
   */
  export type NotificationDeliveryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationDeliveryLogs.
     */
    data: XOR<NotificationDeliveryLogUpdateManyMutationInput, NotificationDeliveryLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationDeliveryLogs to update
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * Limit how many NotificationDeliveryLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationDeliveryLog updateManyAndReturn
   */
  export type NotificationDeliveryLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * The data used to update NotificationDeliveryLogs.
     */
    data: XOR<NotificationDeliveryLogUpdateManyMutationInput, NotificationDeliveryLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationDeliveryLogs to update
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * Limit how many NotificationDeliveryLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationDeliveryLog upsert
   */
  export type NotificationDeliveryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationDeliveryLog to update in case it exists.
     */
    where: NotificationDeliveryLogWhereUniqueInput
    /**
     * In case the NotificationDeliveryLog found by the `where` argument doesn't exist, create a new NotificationDeliveryLog with this data.
     */
    create: XOR<NotificationDeliveryLogCreateInput, NotificationDeliveryLogUncheckedCreateInput>
    /**
     * In case the NotificationDeliveryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationDeliveryLogUpdateInput, NotificationDeliveryLogUncheckedUpdateInput>
  }

  /**
   * NotificationDeliveryLog delete
   */
  export type NotificationDeliveryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
    /**
     * Filter which NotificationDeliveryLog to delete.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog deleteMany
   */
  export type NotificationDeliveryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDeliveryLogs to delete
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * Limit how many NotificationDeliveryLogs to delete.
     */
    limit?: number
  }

  /**
   * NotificationDeliveryLog without action
   */
  export type NotificationDeliveryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationDeliveryLog
     */
    omit?: NotificationDeliveryLogOmit<ExtArgs> | null
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


  export const DeviceRegistrationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    platform: 'platform',
    deviceId: 'deviceId',
    pushToken: 'pushToken',
    voipPushToken: 'voipPushToken',
    appVersion: 'appVersion',
    lastRegisteredAt: 'lastRegisteredAt',
    revokedAt: 'revokedAt'
  };

  export type DeviceRegistrationScalarFieldEnum = (typeof DeviceRegistrationScalarFieldEnum)[keyof typeof DeviceRegistrationScalarFieldEnum]


  export const NotificationPreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chatId: 'chatId',
    isMuted: 'isMuted',
    muteUntil: 'muteUntil',
    showPreview: 'showPreview',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum]


  export const NotificationDeliveryLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceEventId: 'sourceEventId',
    provider: 'provider',
    status: 'status',
    reasonCode: 'reasonCode',
    createdAt: 'createdAt'
  };

  export type NotificationDeliveryLogScalarFieldEnum = (typeof NotificationDeliveryLogScalarFieldEnum)[keyof typeof NotificationDeliveryLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DevicePlatform'
   */
  export type EnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform'>
    


  /**
   * Reference to a field of type 'DevicePlatform[]'
   */
  export type ListEnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'NotificationDeliveryStatus'
   */
  export type EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationDeliveryStatus'>
    


  /**
   * Reference to a field of type 'NotificationDeliveryStatus[]'
   */
  export type ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationDeliveryStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type DeviceRegistrationWhereInput = {
    AND?: DeviceRegistrationWhereInput | DeviceRegistrationWhereInput[]
    OR?: DeviceRegistrationWhereInput[]
    NOT?: DeviceRegistrationWhereInput | DeviceRegistrationWhereInput[]
    id?: StringFilter<"DeviceRegistration"> | string
    userId?: StringFilter<"DeviceRegistration"> | string
    platform?: EnumDevicePlatformFilter<"DeviceRegistration"> | $Enums.DevicePlatform
    deviceId?: StringFilter<"DeviceRegistration"> | string
    pushToken?: StringNullableFilter<"DeviceRegistration"> | string | null
    voipPushToken?: StringNullableFilter<"DeviceRegistration"> | string | null
    appVersion?: StringNullableFilter<"DeviceRegistration"> | string | null
    lastRegisteredAt?: DateTimeFilter<"DeviceRegistration"> | Date | string
    revokedAt?: DateTimeNullableFilter<"DeviceRegistration"> | Date | string | null
  }

  export type DeviceRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    voipPushToken?: SortOrderInput | SortOrder
    appVersion?: SortOrderInput | SortOrder
    lastRegisteredAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
  }

  export type DeviceRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_deviceId?: DeviceRegistrationUserIdDeviceIdCompoundUniqueInput
    AND?: DeviceRegistrationWhereInput | DeviceRegistrationWhereInput[]
    OR?: DeviceRegistrationWhereInput[]
    NOT?: DeviceRegistrationWhereInput | DeviceRegistrationWhereInput[]
    userId?: StringFilter<"DeviceRegistration"> | string
    platform?: EnumDevicePlatformFilter<"DeviceRegistration"> | $Enums.DevicePlatform
    deviceId?: StringFilter<"DeviceRegistration"> | string
    pushToken?: StringNullableFilter<"DeviceRegistration"> | string | null
    voipPushToken?: StringNullableFilter<"DeviceRegistration"> | string | null
    appVersion?: StringNullableFilter<"DeviceRegistration"> | string | null
    lastRegisteredAt?: DateTimeFilter<"DeviceRegistration"> | Date | string
    revokedAt?: DateTimeNullableFilter<"DeviceRegistration"> | Date | string | null
  }, "id" | "userId_deviceId">

  export type DeviceRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    voipPushToken?: SortOrderInput | SortOrder
    appVersion?: SortOrderInput | SortOrder
    lastRegisteredAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: DeviceRegistrationCountOrderByAggregateInput
    _max?: DeviceRegistrationMaxOrderByAggregateInput
    _min?: DeviceRegistrationMinOrderByAggregateInput
  }

  export type DeviceRegistrationScalarWhereWithAggregatesInput = {
    AND?: DeviceRegistrationScalarWhereWithAggregatesInput | DeviceRegistrationScalarWhereWithAggregatesInput[]
    OR?: DeviceRegistrationScalarWhereWithAggregatesInput[]
    NOT?: DeviceRegistrationScalarWhereWithAggregatesInput | DeviceRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeviceRegistration"> | string
    userId?: StringWithAggregatesFilter<"DeviceRegistration"> | string
    platform?: EnumDevicePlatformWithAggregatesFilter<"DeviceRegistration"> | $Enums.DevicePlatform
    deviceId?: StringWithAggregatesFilter<"DeviceRegistration"> | string
    pushToken?: StringNullableWithAggregatesFilter<"DeviceRegistration"> | string | null
    voipPushToken?: StringNullableWithAggregatesFilter<"DeviceRegistration"> | string | null
    appVersion?: StringNullableWithAggregatesFilter<"DeviceRegistration"> | string | null
    lastRegisteredAt?: DateTimeWithAggregatesFilter<"DeviceRegistration"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"DeviceRegistration"> | Date | string | null
  }

  export type NotificationPreferenceWhereInput = {
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    id?: StringFilter<"NotificationPreference"> | string
    userId?: StringFilter<"NotificationPreference"> | string
    chatId?: StringNullableFilter<"NotificationPreference"> | string | null
    isMuted?: BoolFilter<"NotificationPreference"> | boolean
    muteUntil?: DateTimeNullableFilter<"NotificationPreference"> | Date | string | null
    showPreview?: BoolFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }

  export type NotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chatId?: SortOrderInput | SortOrder
    isMuted?: SortOrder
    muteUntil?: SortOrderInput | SortOrder
    showPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_chatId?: NotificationPreferenceUserIdChatIdCompoundUniqueInput
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    userId?: StringFilter<"NotificationPreference"> | string
    chatId?: StringNullableFilter<"NotificationPreference"> | string | null
    isMuted?: BoolFilter<"NotificationPreference"> | boolean
    muteUntil?: DateTimeNullableFilter<"NotificationPreference"> | Date | string | null
    showPreview?: BoolFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }, "id" | "userId_chatId">

  export type NotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chatId?: SortOrderInput | SortOrder
    isMuted?: SortOrder
    muteUntil?: SortOrderInput | SortOrder
    showPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationPreferenceCountOrderByAggregateInput
    _max?: NotificationPreferenceMaxOrderByAggregateInput
    _min?: NotificationPreferenceMinOrderByAggregateInput
  }

  export type NotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationPreference"> | string
    userId?: StringWithAggregatesFilter<"NotificationPreference"> | string
    chatId?: StringNullableWithAggregatesFilter<"NotificationPreference"> | string | null
    isMuted?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    muteUntil?: DateTimeNullableWithAggregatesFilter<"NotificationPreference"> | Date | string | null
    showPreview?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
  }

  export type NotificationDeliveryLogWhereInput = {
    AND?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    OR?: NotificationDeliveryLogWhereInput[]
    NOT?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    id?: StringFilter<"NotificationDeliveryLog"> | string
    userId?: StringFilter<"NotificationDeliveryLog"> | string
    sourceEventId?: StringFilter<"NotificationDeliveryLog"> | string
    provider?: StringFilter<"NotificationDeliveryLog"> | string
    status?: EnumNotificationDeliveryStatusFilter<"NotificationDeliveryLog"> | $Enums.NotificationDeliveryStatus
    reasonCode?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    createdAt?: DateTimeFilter<"NotificationDeliveryLog"> | Date | string
  }

  export type NotificationDeliveryLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceEventId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationDeliveryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    OR?: NotificationDeliveryLogWhereInput[]
    NOT?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    userId?: StringFilter<"NotificationDeliveryLog"> | string
    sourceEventId?: StringFilter<"NotificationDeliveryLog"> | string
    provider?: StringFilter<"NotificationDeliveryLog"> | string
    status?: EnumNotificationDeliveryStatusFilter<"NotificationDeliveryLog"> | $Enums.NotificationDeliveryStatus
    reasonCode?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    createdAt?: DateTimeFilter<"NotificationDeliveryLog"> | Date | string
  }, "id">

  export type NotificationDeliveryLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceEventId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationDeliveryLogCountOrderByAggregateInput
    _max?: NotificationDeliveryLogMaxOrderByAggregateInput
    _min?: NotificationDeliveryLogMinOrderByAggregateInput
  }

  export type NotificationDeliveryLogScalarWhereWithAggregatesInput = {
    AND?: NotificationDeliveryLogScalarWhereWithAggregatesInput | NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    OR?: NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationDeliveryLogScalarWhereWithAggregatesInput | NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    userId?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    sourceEventId?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    provider?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    status?: EnumNotificationDeliveryStatusWithAggregatesFilter<"NotificationDeliveryLog"> | $Enums.NotificationDeliveryStatus
    reasonCode?: StringNullableWithAggregatesFilter<"NotificationDeliveryLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationDeliveryLog"> | Date | string
  }

  export type DeviceRegistrationCreateInput = {
    id: string
    userId: string
    platform: $Enums.DevicePlatform
    deviceId: string
    pushToken?: string | null
    voipPushToken?: string | null
    appVersion?: string | null
    lastRegisteredAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type DeviceRegistrationUncheckedCreateInput = {
    id: string
    userId: string
    platform: $Enums.DevicePlatform
    deviceId: string
    pushToken?: string | null
    voipPushToken?: string | null
    appVersion?: string | null
    lastRegisteredAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type DeviceRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    deviceId?: StringFieldUpdateOperationsInput | string
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    voipPushToken?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeviceRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    deviceId?: StringFieldUpdateOperationsInput | string
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    voipPushToken?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeviceRegistrationCreateManyInput = {
    id: string
    userId: string
    platform: $Enums.DevicePlatform
    deviceId: string
    pushToken?: string | null
    voipPushToken?: string | null
    appVersion?: string | null
    lastRegisteredAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type DeviceRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    deviceId?: StringFieldUpdateOperationsInput | string
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    voipPushToken?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeviceRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    deviceId?: StringFieldUpdateOperationsInput | string
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    voipPushToken?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    lastRegisteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NotificationPreferenceCreateInput = {
    id: string
    userId: string
    chatId?: string | null
    isMuted?: boolean
    muteUntil?: Date | string | null
    showPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUncheckedCreateInput = {
    id: string
    userId: string
    chatId?: string | null
    isMuted?: boolean
    muteUntil?: Date | string | null
    showPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isMuted?: BoolFieldUpdateOperationsInput | boolean
    muteUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isMuted?: BoolFieldUpdateOperationsInput | boolean
    muteUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateManyInput = {
    id: string
    userId: string
    chatId?: string | null
    isMuted?: boolean
    muteUntil?: Date | string | null
    showPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isMuted?: BoolFieldUpdateOperationsInput | boolean
    muteUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    isMuted?: BoolFieldUpdateOperationsInput | boolean
    muteUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogCreateInput = {
    id: string
    userId: string
    sourceEventId: string
    provider: string
    status: $Enums.NotificationDeliveryStatus
    reasonCode?: string | null
    createdAt?: Date | string
  }

  export type NotificationDeliveryLogUncheckedCreateInput = {
    id: string
    userId: string
    sourceEventId: string
    provider: string
    status: $Enums.NotificationDeliveryStatus
    reasonCode?: string | null
    createdAt?: Date | string
  }

  export type NotificationDeliveryLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceEventId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationDeliveryStatusFieldUpdateOperationsInput | $Enums.NotificationDeliveryStatus
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceEventId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationDeliveryStatusFieldUpdateOperationsInput | $Enums.NotificationDeliveryStatus
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogCreateManyInput = {
    id: string
    userId: string
    sourceEventId: string
    provider: string
    status: $Enums.NotificationDeliveryStatus
    reasonCode?: string | null
    createdAt?: Date | string
  }

  export type NotificationDeliveryLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceEventId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationDeliveryStatusFieldUpdateOperationsInput | $Enums.NotificationDeliveryStatus
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceEventId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationDeliveryStatusFieldUpdateOperationsInput | $Enums.NotificationDeliveryStatus
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DeviceRegistrationUserIdDeviceIdCompoundUniqueInput = {
    userId: string
    deviceId: string
  }

  export type DeviceRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    voipPushToken?: SortOrder
    appVersion?: SortOrder
    lastRegisteredAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type DeviceRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    voipPushToken?: SortOrder
    appVersion?: SortOrder
    lastRegisteredAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type DeviceRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    platform?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    voipPushToken?: SortOrder
    appVersion?: SortOrder
    lastRegisteredAt?: SortOrder
    revokedAt?: SortOrder
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

  export type EnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationPreferenceUserIdChatIdCompoundUniqueInput = {
    userId: string
    chatId: string
  }

  export type NotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatId?: SortOrder
    isMuted?: SortOrder
    muteUntil?: SortOrder
    showPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatId?: SortOrder
    isMuted?: SortOrder
    muteUntil?: SortOrder
    showPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chatId?: SortOrder
    isMuted?: SortOrder
    muteUntil?: SortOrder
    showPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumNotificationDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus
  }

  export type NotificationDeliveryLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceEventId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    reasonCode?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationDeliveryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceEventId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    reasonCode?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationDeliveryLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceEventId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    reasonCode?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumDevicePlatformFieldUpdateOperationsInput = {
    set?: $Enums.DevicePlatform
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumNotificationDeliveryStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationDeliveryStatus
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

  export type NestedEnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
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

  export type NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumNotificationDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus
  }

  export type NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationDeliveryStatus | EnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationDeliveryStatus[] | ListEnumNotificationDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationDeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationDeliveryStatusFilter<$PrismaModel>
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