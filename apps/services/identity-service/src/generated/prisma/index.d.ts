
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
 * Model UserAccount
 * 
 */
export type UserAccount = $Result.DefaultSelection<Prisma.$UserAccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model OtpChallenge
 * 
 */
export type OtpChallenge = $Result.DefaultSelection<Prisma.$OtpChallengePayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccountStatus: {
  pending: 'pending',
  active: 'active',
  suspended: 'suspended',
  deleted: 'deleted'
};

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]


export const SessionClientType: {
  ios: 'ios',
  android: 'android',
  web: 'web',
  desktop: 'desktop',
  unknown: 'unknown'
};

export type SessionClientType = (typeof SessionClientType)[keyof typeof SessionClientType]


export const OtpPurpose: {
  register: 'register',
  login: 'login',
  two_factor: 'two_factor'
};

export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose]


export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type AccountStatus = $Enums.AccountStatus

export const AccountStatus: typeof $Enums.AccountStatus

export type SessionClientType = $Enums.SessionClientType

export const SessionClientType: typeof $Enums.SessionClientType

export type OtpPurpose = $Enums.OtpPurpose

export const OtpPurpose: typeof $Enums.OtpPurpose

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserAccounts
 * const userAccounts = await prisma.userAccount.findMany()
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
   * // Fetch zero or more UserAccounts
   * const userAccounts = await prisma.userAccount.findMany()
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
   * `prisma.userAccount`: Exposes CRUD operations for the **UserAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAccounts
    * const userAccounts = await prisma.userAccount.findMany()
    * ```
    */
  get userAccount(): Prisma.UserAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpChallenge`: Exposes CRUD operations for the **OtpChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpChallenges
    * const otpChallenges = await prisma.otpChallenge.findMany()
    * ```
    */
  get otpChallenge(): Prisma.OtpChallengeDelegate<ExtArgs, ClientOptions>;

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
    UserAccount: 'UserAccount',
    Session: 'Session',
    OtpChallenge: 'OtpChallenge',
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
      modelProps: "userAccount" | "session" | "otpChallenge" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserAccount: {
        payload: Prisma.$UserAccountPayload<ExtArgs>
        fields: Prisma.UserAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findFirst: {
            args: Prisma.UserAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findMany: {
            args: Prisma.UserAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>[]
          }
          create: {
            args: Prisma.UserAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          createMany: {
            args: Prisma.UserAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>[]
          }
          delete: {
            args: Prisma.UserAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          update: {
            args: Prisma.UserAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          deleteMany: {
            args: Prisma.UserAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>[]
          }
          upsert: {
            args: Prisma.UserAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          aggregate: {
            args: Prisma.UserAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAccount>
          }
          groupBy: {
            args: Prisma.UserAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAccountCountArgs<ExtArgs>
            result: $Utils.Optional<UserAccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      OtpChallenge: {
        payload: Prisma.$OtpChallengePayload<ExtArgs>
        fields: Prisma.OtpChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          findFirst: {
            args: Prisma.OtpChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          findMany: {
            args: Prisma.OtpChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          create: {
            args: Prisma.OtpChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          createMany: {
            args: Prisma.OtpChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          delete: {
            args: Prisma.OtpChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          update: {
            args: Prisma.OtpChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          deleteMany: {
            args: Prisma.OtpChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          upsert: {
            args: Prisma.OtpChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          aggregate: {
            args: Prisma.OtpChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpChallenge>
          }
          groupBy: {
            args: Prisma.OtpChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpChallengeCountAggregateOutputType> | number
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
    userAccount?: UserAccountOmit
    session?: SessionOmit
    otpChallenge?: OtpChallengeOmit
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
   * Count Type UserAccountCountOutputType
   */

  export type UserAccountCountOutputType = {
    sessions: number
  }

  export type UserAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserAccountCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserAccountCountOutputType without action
   */
  export type UserAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccountCountOutputType
     */
    select?: UserAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserAccountCountOutputType without action
   */
  export type UserAccountCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserAccount
   */

  export type AggregateUserAccount = {
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  export type UserAccountMinAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    phoneNumberHash: string | null
    status: $Enums.AccountStatus | null
    twoFactorEnabled: boolean | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type UserAccountMaxAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    phoneNumberHash: string | null
    status: $Enums.AccountStatus | null
    twoFactorEnabled: boolean | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type UserAccountCountAggregateOutputType = {
    id: number
    phoneNumber: number
    phoneNumberHash: number
    status: number
    twoFactorEnabled: number
    createdAt: number
    verifiedAt: number
    _all: number
  }


  export type UserAccountMinAggregateInputType = {
    id?: true
    phoneNumber?: true
    phoneNumberHash?: true
    status?: true
    twoFactorEnabled?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type UserAccountMaxAggregateInputType = {
    id?: true
    phoneNumber?: true
    phoneNumberHash?: true
    status?: true
    twoFactorEnabled?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type UserAccountCountAggregateInputType = {
    id?: true
    phoneNumber?: true
    phoneNumberHash?: true
    status?: true
    twoFactorEnabled?: true
    createdAt?: true
    verifiedAt?: true
    _all?: true
  }

  export type UserAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccount to aggregate.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAccounts
    **/
    _count?: true | UserAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAccountMaxAggregateInputType
  }

  export type GetUserAccountAggregateType<T extends UserAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAccount[P]>
      : GetScalarType<T[P], AggregateUserAccount[P]>
  }




  export type UserAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccountWhereInput
    orderBy?: UserAccountOrderByWithAggregationInput | UserAccountOrderByWithAggregationInput[]
    by: UserAccountScalarFieldEnum[] | UserAccountScalarFieldEnum
    having?: UserAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAccountCountAggregateInputType | true
    _min?: UserAccountMinAggregateInputType
    _max?: UserAccountMaxAggregateInputType
  }

  export type UserAccountGroupByOutputType = {
    id: string
    phoneNumber: string | null
    phoneNumberHash: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled: boolean
    createdAt: Date
    verifiedAt: Date | null
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  type GetUserAccountGroupByPayload<T extends UserAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
            : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
        }
      >
    >


  export type UserAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    phoneNumberHash?: boolean
    status?: boolean
    twoFactorEnabled?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    sessions?: boolean | UserAccount$sessionsArgs<ExtArgs>
    _count?: boolean | UserAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAccount"]>

  export type UserAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    phoneNumberHash?: boolean
    status?: boolean
    twoFactorEnabled?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
  }, ExtArgs["result"]["userAccount"]>

  export type UserAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    phoneNumberHash?: boolean
    status?: boolean
    twoFactorEnabled?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
  }, ExtArgs["result"]["userAccount"]>

  export type UserAccountSelectScalar = {
    id?: boolean
    phoneNumber?: boolean
    phoneNumberHash?: boolean
    status?: boolean
    twoFactorEnabled?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
  }

  export type UserAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phoneNumber" | "phoneNumberHash" | "status" | "twoFactorEnabled" | "createdAt" | "verifiedAt", ExtArgs["result"]["userAccount"]>
  export type UserAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserAccount$sessionsArgs<ExtArgs>
    _count?: boolean | UserAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAccount"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phoneNumber: string | null
      phoneNumberHash: string | null
      status: $Enums.AccountStatus
      twoFactorEnabled: boolean
      createdAt: Date
      verifiedAt: Date | null
    }, ExtArgs["result"]["userAccount"]>
    composites: {}
  }

  type UserAccountGetPayload<S extends boolean | null | undefined | UserAccountDefaultArgs> = $Result.GetResult<Prisma.$UserAccountPayload, S>

  type UserAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAccountCountAggregateInputType | true
    }

  export interface UserAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAccount'], meta: { name: 'UserAccount' } }
    /**
     * Find zero or one UserAccount that matches the filter.
     * @param {UserAccountFindUniqueArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAccountFindUniqueArgs>(args: SelectSubset<T, UserAccountFindUniqueArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAccountFindUniqueOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAccountFindFirstArgs>(args?: SelectSubset<T, UserAccountFindFirstArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAccounts
     * const userAccounts = await prisma.userAccount.findMany()
     * 
     * // Get first 10 UserAccounts
     * const userAccounts = await prisma.userAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAccountFindManyArgs>(args?: SelectSubset<T, UserAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAccount.
     * @param {UserAccountCreateArgs} args - Arguments to create a UserAccount.
     * @example
     * // Create one UserAccount
     * const UserAccount = await prisma.userAccount.create({
     *   data: {
     *     // ... data to create a UserAccount
     *   }
     * })
     * 
     */
    create<T extends UserAccountCreateArgs>(args: SelectSubset<T, UserAccountCreateArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAccounts.
     * @param {UserAccountCreateManyArgs} args - Arguments to create many UserAccounts.
     * @example
     * // Create many UserAccounts
     * const userAccount = await prisma.userAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAccountCreateManyArgs>(args?: SelectSubset<T, UserAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAccounts and returns the data saved in the database.
     * @param {UserAccountCreateManyAndReturnArgs} args - Arguments to create many UserAccounts.
     * @example
     * // Create many UserAccounts
     * const userAccount = await prisma.userAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAccounts and only return the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAccount.
     * @param {UserAccountDeleteArgs} args - Arguments to delete one UserAccount.
     * @example
     * // Delete one UserAccount
     * const UserAccount = await prisma.userAccount.delete({
     *   where: {
     *     // ... filter to delete one UserAccount
     *   }
     * })
     * 
     */
    delete<T extends UserAccountDeleteArgs>(args: SelectSubset<T, UserAccountDeleteArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAccount.
     * @param {UserAccountUpdateArgs} args - Arguments to update one UserAccount.
     * @example
     * // Update one UserAccount
     * const userAccount = await prisma.userAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAccountUpdateArgs>(args: SelectSubset<T, UserAccountUpdateArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAccounts.
     * @param {UserAccountDeleteManyArgs} args - Arguments to filter UserAccounts to delete.
     * @example
     * // Delete a few UserAccounts
     * const { count } = await prisma.userAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAccountDeleteManyArgs>(args?: SelectSubset<T, UserAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAccounts
     * const userAccount = await prisma.userAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAccountUpdateManyArgs>(args: SelectSubset<T, UserAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccounts and returns the data updated in the database.
     * @param {UserAccountUpdateManyAndReturnArgs} args - Arguments to update many UserAccounts.
     * @example
     * // Update many UserAccounts
     * const userAccount = await prisma.userAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAccounts and only return the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAccount.
     * @param {UserAccountUpsertArgs} args - Arguments to update or create a UserAccount.
     * @example
     * // Update or create a UserAccount
     * const userAccount = await prisma.userAccount.upsert({
     *   create: {
     *     // ... data to create a UserAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAccount we want to update
     *   }
     * })
     */
    upsert<T extends UserAccountUpsertArgs>(args: SelectSubset<T, UserAccountUpsertArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountCountArgs} args - Arguments to filter UserAccounts to count.
     * @example
     * // Count the number of UserAccounts
     * const count = await prisma.userAccount.count({
     *   where: {
     *     // ... the filter for the UserAccounts we want to count
     *   }
     * })
    **/
    count<T extends UserAccountCountArgs>(
      args?: Subset<T, UserAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAccountAggregateArgs>(args: Subset<T, UserAccountAggregateArgs>): Prisma.PrismaPromise<GetUserAccountAggregateType<T>>

    /**
     * Group by UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountGroupByArgs} args - Group by arguments.
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
      T extends UserAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAccountGroupByArgs['orderBy'] }
        : { orderBy?: UserAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAccount model
   */
  readonly fields: UserAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends UserAccount$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, UserAccount$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the UserAccount model
   */
  interface UserAccountFieldRefs {
    readonly id: FieldRef<"UserAccount", 'String'>
    readonly phoneNumber: FieldRef<"UserAccount", 'String'>
    readonly phoneNumberHash: FieldRef<"UserAccount", 'String'>
    readonly status: FieldRef<"UserAccount", 'AccountStatus'>
    readonly twoFactorEnabled: FieldRef<"UserAccount", 'Boolean'>
    readonly createdAt: FieldRef<"UserAccount", 'DateTime'>
    readonly verifiedAt: FieldRef<"UserAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAccount findUnique
   */
  export type UserAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount findUniqueOrThrow
   */
  export type UserAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount findFirst
   */
  export type UserAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount findFirstOrThrow
   */
  export type UserAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount findMany
   */
  export type UserAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccounts to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount create
   */
  export type UserAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAccount.
     */
    data: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
  }

  /**
   * UserAccount createMany
   */
  export type UserAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAccounts.
     */
    data: UserAccountCreateManyInput | UserAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAccount createManyAndReturn
   */
  export type UserAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * The data used to create many UserAccounts.
     */
    data: UserAccountCreateManyInput | UserAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAccount update
   */
  export type UserAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAccount.
     */
    data: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
    /**
     * Choose, which UserAccount to update.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount updateMany
   */
  export type UserAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAccounts.
     */
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserAccounts to update
     */
    where?: UserAccountWhereInput
    /**
     * Limit how many UserAccounts to update.
     */
    limit?: number
  }

  /**
   * UserAccount updateManyAndReturn
   */
  export type UserAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * The data used to update UserAccounts.
     */
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserAccounts to update
     */
    where?: UserAccountWhereInput
    /**
     * Limit how many UserAccounts to update.
     */
    limit?: number
  }

  /**
   * UserAccount upsert
   */
  export type UserAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAccount to update in case it exists.
     */
    where: UserAccountWhereUniqueInput
    /**
     * In case the UserAccount found by the `where` argument doesn't exist, create a new UserAccount with this data.
     */
    create: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
    /**
     * In case the UserAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
  }

  /**
   * UserAccount delete
   */
  export type UserAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter which UserAccount to delete.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount deleteMany
   */
  export type UserAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccounts to delete
     */
    where?: UserAccountWhereInput
    /**
     * Limit how many UserAccounts to delete.
     */
    limit?: number
  }

  /**
   * UserAccount.sessions
   */
  export type UserAccount$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * UserAccount without action
   */
  export type UserAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userAccountId: string | null
    deviceId: string | null
    clientType: $Enums.SessionClientType | null
    refreshTokenHash: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
    revokedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userAccountId: string | null
    deviceId: string | null
    clientType: $Enums.SessionClientType | null
    refreshTokenHash: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    lastSeenAt: Date | null
    revokedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userAccountId: number
    deviceId: number
    clientType: number
    refreshTokenHash: number
    ipAddress: number
    userAgent: number
    createdAt: number
    lastSeenAt: number
    revokedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userAccountId?: true
    deviceId?: true
    clientType?: true
    refreshTokenHash?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    lastSeenAt?: true
    revokedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userAccountId?: true
    deviceId?: true
    clientType?: true
    refreshTokenHash?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    lastSeenAt?: true
    revokedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userAccountId?: true
    deviceId?: true
    clientType?: true
    refreshTokenHash?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    lastSeenAt?: true
    revokedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userAccountId: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    lastSeenAt: Date | null
    revokedAt: Date | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAccountId?: boolean
    deviceId?: boolean
    clientType?: boolean
    refreshTokenHash?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    revokedAt?: boolean
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAccountId?: boolean
    deviceId?: boolean
    clientType?: boolean
    refreshTokenHash?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    revokedAt?: boolean
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAccountId?: boolean
    deviceId?: boolean
    clientType?: boolean
    refreshTokenHash?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    revokedAt?: boolean
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userAccountId?: boolean
    deviceId?: boolean
    clientType?: boolean
    refreshTokenHash?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    lastSeenAt?: boolean
    revokedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAccountId" | "deviceId" | "clientType" | "refreshTokenHash" | "ipAddress" | "userAgent" | "createdAt" | "lastSeenAt" | "revokedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAccount?: boolean | UserAccountDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      userAccount: Prisma.$UserAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userAccountId: string
      deviceId: string
      clientType: $Enums.SessionClientType
      refreshTokenHash: string
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      lastSeenAt: Date | null
      revokedAt: Date | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userAccount<T extends UserAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserAccountDefaultArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userAccountId: FieldRef<"Session", 'String'>
    readonly deviceId: FieldRef<"Session", 'String'>
    readonly clientType: FieldRef<"Session", 'SessionClientType'>
    readonly refreshTokenHash: FieldRef<"Session", 'String'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly lastSeenAt: FieldRef<"Session", 'DateTime'>
    readonly revokedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model OtpChallenge
   */

  export type AggregateOtpChallenge = {
    _count: OtpChallengeCountAggregateOutputType | null
    _avg: OtpChallengeAvgAggregateOutputType | null
    _sum: OtpChallengeSumAggregateOutputType | null
    _min: OtpChallengeMinAggregateOutputType | null
    _max: OtpChallengeMaxAggregateOutputType | null
  }

  export type OtpChallengeAvgAggregateOutputType = {
    attemptCount: number | null
  }

  export type OtpChallengeSumAggregateOutputType = {
    attemptCount: number | null
  }

  export type OtpChallengeMinAggregateOutputType = {
    id: string | null
    target: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    attemptCount: number | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OtpChallengeMaxAggregateOutputType = {
    id: string | null
    target: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    attemptCount: number | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OtpChallengeCountAggregateOutputType = {
    id: number
    target: number
    purpose: number
    codeHash: number
    attemptCount: number
    expiresAt: number
    consumedAt: number
    createdAt: number
    _all: number
  }


  export type OtpChallengeAvgAggregateInputType = {
    attemptCount?: true
  }

  export type OtpChallengeSumAggregateInputType = {
    attemptCount?: true
  }

  export type OtpChallengeMinAggregateInputType = {
    id?: true
    target?: true
    purpose?: true
    codeHash?: true
    attemptCount?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OtpChallengeMaxAggregateInputType = {
    id?: true
    target?: true
    purpose?: true
    codeHash?: true
    attemptCount?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OtpChallengeCountAggregateInputType = {
    id?: true
    target?: true
    purpose?: true
    codeHash?: true
    attemptCount?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpChallenge to aggregate.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpChallenges
    **/
    _count?: true | OtpChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpChallengeMaxAggregateInputType
  }

  export type GetOtpChallengeAggregateType<T extends OtpChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpChallenge[P]>
      : GetScalarType<T[P], AggregateOtpChallenge[P]>
  }




  export type OtpChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpChallengeWhereInput
    orderBy?: OtpChallengeOrderByWithAggregationInput | OtpChallengeOrderByWithAggregationInput[]
    by: OtpChallengeScalarFieldEnum[] | OtpChallengeScalarFieldEnum
    having?: OtpChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpChallengeCountAggregateInputType | true
    _avg?: OtpChallengeAvgAggregateInputType
    _sum?: OtpChallengeSumAggregateInputType
    _min?: OtpChallengeMinAggregateInputType
    _max?: OtpChallengeMaxAggregateInputType
  }

  export type OtpChallengeGroupByOutputType = {
    id: string
    target: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attemptCount: number
    expiresAt: Date
    consumedAt: Date | null
    createdAt: Date
    _count: OtpChallengeCountAggregateOutputType | null
    _avg: OtpChallengeAvgAggregateOutputType | null
    _sum: OtpChallengeSumAggregateOutputType | null
    _min: OtpChallengeMinAggregateOutputType | null
    _max: OtpChallengeMaxAggregateOutputType | null
  }

  type GetOtpChallengeGroupByPayload<T extends OtpChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpChallengeGroupByOutputType[P]>
        }
      >
    >


  export type OtpChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    purpose?: boolean
    codeHash?: boolean
    attemptCount?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    purpose?: boolean
    codeHash?: boolean
    attemptCount?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    purpose?: boolean
    codeHash?: boolean
    attemptCount?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectScalar = {
    id?: boolean
    target?: boolean
    purpose?: boolean
    codeHash?: boolean
    attemptCount?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }

  export type OtpChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "target" | "purpose" | "codeHash" | "attemptCount" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["otpChallenge"]>

  export type $OtpChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpChallenge"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      target: string
      purpose: $Enums.OtpPurpose
      codeHash: string
      attemptCount: number
      expiresAt: Date
      consumedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["otpChallenge"]>
    composites: {}
  }

  type OtpChallengeGetPayload<S extends boolean | null | undefined | OtpChallengeDefaultArgs> = $Result.GetResult<Prisma.$OtpChallengePayload, S>

  type OtpChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpChallengeCountAggregateInputType | true
    }

  export interface OtpChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpChallenge'], meta: { name: 'OtpChallenge' } }
    /**
     * Find zero or one OtpChallenge that matches the filter.
     * @param {OtpChallengeFindUniqueArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpChallengeFindUniqueArgs>(args: SelectSubset<T, OtpChallengeFindUniqueArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpChallenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpChallengeFindUniqueOrThrowArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindFirstArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpChallengeFindFirstArgs>(args?: SelectSubset<T, OtpChallengeFindFirstArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindFirstOrThrowArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpChallenges
     * const otpChallenges = await prisma.otpChallenge.findMany()
     * 
     * // Get first 10 OtpChallenges
     * const otpChallenges = await prisma.otpChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpChallengeFindManyArgs>(args?: SelectSubset<T, OtpChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpChallenge.
     * @param {OtpChallengeCreateArgs} args - Arguments to create a OtpChallenge.
     * @example
     * // Create one OtpChallenge
     * const OtpChallenge = await prisma.otpChallenge.create({
     *   data: {
     *     // ... data to create a OtpChallenge
     *   }
     * })
     * 
     */
    create<T extends OtpChallengeCreateArgs>(args: SelectSubset<T, OtpChallengeCreateArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpChallenges.
     * @param {OtpChallengeCreateManyArgs} args - Arguments to create many OtpChallenges.
     * @example
     * // Create many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpChallengeCreateManyArgs>(args?: SelectSubset<T, OtpChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpChallenges and returns the data saved in the database.
     * @param {OtpChallengeCreateManyAndReturnArgs} args - Arguments to create many OtpChallenges.
     * @example
     * // Create many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpChallenges and only return the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpChallenge.
     * @param {OtpChallengeDeleteArgs} args - Arguments to delete one OtpChallenge.
     * @example
     * // Delete one OtpChallenge
     * const OtpChallenge = await prisma.otpChallenge.delete({
     *   where: {
     *     // ... filter to delete one OtpChallenge
     *   }
     * })
     * 
     */
    delete<T extends OtpChallengeDeleteArgs>(args: SelectSubset<T, OtpChallengeDeleteArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpChallenge.
     * @param {OtpChallengeUpdateArgs} args - Arguments to update one OtpChallenge.
     * @example
     * // Update one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpChallengeUpdateArgs>(args: SelectSubset<T, OtpChallengeUpdateArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpChallenges.
     * @param {OtpChallengeDeleteManyArgs} args - Arguments to filter OtpChallenges to delete.
     * @example
     * // Delete a few OtpChallenges
     * const { count } = await prisma.otpChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpChallengeDeleteManyArgs>(args?: SelectSubset<T, OtpChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpChallengeUpdateManyArgs>(args: SelectSubset<T, OtpChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpChallenges and returns the data updated in the database.
     * @param {OtpChallengeUpdateManyAndReturnArgs} args - Arguments to update many OtpChallenges.
     * @example
     * // Update many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpChallenges and only return the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.updateManyAndReturn({
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
    updateManyAndReturn<T extends OtpChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpChallenge.
     * @param {OtpChallengeUpsertArgs} args - Arguments to update or create a OtpChallenge.
     * @example
     * // Update or create a OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.upsert({
     *   create: {
     *     // ... data to create a OtpChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpChallenge we want to update
     *   }
     * })
     */
    upsert<T extends OtpChallengeUpsertArgs>(args: SelectSubset<T, OtpChallengeUpsertArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeCountArgs} args - Arguments to filter OtpChallenges to count.
     * @example
     * // Count the number of OtpChallenges
     * const count = await prisma.otpChallenge.count({
     *   where: {
     *     // ... the filter for the OtpChallenges we want to count
     *   }
     * })
    **/
    count<T extends OtpChallengeCountArgs>(
      args?: Subset<T, OtpChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtpChallengeAggregateArgs>(args: Subset<T, OtpChallengeAggregateArgs>): Prisma.PrismaPromise<GetOtpChallengeAggregateType<T>>

    /**
     * Group by OtpChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeGroupByArgs} args - Group by arguments.
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
      T extends OtpChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpChallengeGroupByArgs['orderBy'] }
        : { orderBy?: OtpChallengeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OtpChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpChallenge model
   */
  readonly fields: OtpChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OtpChallenge model
   */
  interface OtpChallengeFieldRefs {
    readonly id: FieldRef<"OtpChallenge", 'String'>
    readonly target: FieldRef<"OtpChallenge", 'String'>
    readonly purpose: FieldRef<"OtpChallenge", 'OtpPurpose'>
    readonly codeHash: FieldRef<"OtpChallenge", 'String'>
    readonly attemptCount: FieldRef<"OtpChallenge", 'Int'>
    readonly expiresAt: FieldRef<"OtpChallenge", 'DateTime'>
    readonly consumedAt: FieldRef<"OtpChallenge", 'DateTime'>
    readonly createdAt: FieldRef<"OtpChallenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpChallenge findUnique
   */
  export type OtpChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge findUniqueOrThrow
   */
  export type OtpChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge findFirst
   */
  export type OtpChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpChallenges.
     */
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge findFirstOrThrow
   */
  export type OtpChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpChallenges.
     */
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge findMany
   */
  export type OtpChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter, which OtpChallenges to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge create
   */
  export type OtpChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpChallenge.
     */
    data: XOR<OtpChallengeCreateInput, OtpChallengeUncheckedCreateInput>
  }

  /**
   * OtpChallenge createMany
   */
  export type OtpChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpChallenges.
     */
    data: OtpChallengeCreateManyInput | OtpChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpChallenge createManyAndReturn
   */
  export type OtpChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpChallenges.
     */
    data: OtpChallengeCreateManyInput | OtpChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpChallenge update
   */
  export type OtpChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpChallenge.
     */
    data: XOR<OtpChallengeUpdateInput, OtpChallengeUncheckedUpdateInput>
    /**
     * Choose, which OtpChallenge to update.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge updateMany
   */
  export type OtpChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpChallenges.
     */
    data: XOR<OtpChallengeUpdateManyMutationInput, OtpChallengeUncheckedUpdateManyInput>
    /**
     * Filter which OtpChallenges to update
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to update.
     */
    limit?: number
  }

  /**
   * OtpChallenge updateManyAndReturn
   */
  export type OtpChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data used to update OtpChallenges.
     */
    data: XOR<OtpChallengeUpdateManyMutationInput, OtpChallengeUncheckedUpdateManyInput>
    /**
     * Filter which OtpChallenges to update
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to update.
     */
    limit?: number
  }

  /**
   * OtpChallenge upsert
   */
  export type OtpChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpChallenge to update in case it exists.
     */
    where: OtpChallengeWhereUniqueInput
    /**
     * In case the OtpChallenge found by the `where` argument doesn't exist, create a new OtpChallenge with this data.
     */
    create: XOR<OtpChallengeCreateInput, OtpChallengeUncheckedCreateInput>
    /**
     * In case the OtpChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpChallengeUpdateInput, OtpChallengeUncheckedUpdateInput>
  }

  /**
   * OtpChallenge delete
   */
  export type OtpChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Filter which OtpChallenge to delete.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge deleteMany
   */
  export type OtpChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpChallenges to delete
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to delete.
     */
    limit?: number
  }

  /**
   * OtpChallenge without action
   */
  export type OtpChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
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


  export const UserAccountScalarFieldEnum: {
    id: 'id',
    phoneNumber: 'phoneNumber',
    phoneNumberHash: 'phoneNumberHash',
    status: 'status',
    twoFactorEnabled: 'twoFactorEnabled',
    createdAt: 'createdAt',
    verifiedAt: 'verifiedAt'
  };

  export type UserAccountScalarFieldEnum = (typeof UserAccountScalarFieldEnum)[keyof typeof UserAccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userAccountId: 'userAccountId',
    deviceId: 'deviceId',
    clientType: 'clientType',
    refreshTokenHash: 'refreshTokenHash',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    lastSeenAt: 'lastSeenAt',
    revokedAt: 'revokedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const OtpChallengeScalarFieldEnum: {
    id: 'id',
    target: 'target',
    purpose: 'purpose',
    codeHash: 'codeHash',
    attemptCount: 'attemptCount',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
  };

  export type OtpChallengeScalarFieldEnum = (typeof OtpChallengeScalarFieldEnum)[keyof typeof OtpChallengeScalarFieldEnum]


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
   * Reference to a field of type 'AccountStatus'
   */
  export type EnumAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountStatus'>
    


  /**
   * Reference to a field of type 'AccountStatus[]'
   */
  export type ListEnumAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SessionClientType'
   */
  export type EnumSessionClientTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionClientType'>
    


  /**
   * Reference to a field of type 'SessionClientType[]'
   */
  export type ListEnumSessionClientTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionClientType[]'>
    


  /**
   * Reference to a field of type 'OtpPurpose'
   */
  export type EnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose'>
    


  /**
   * Reference to a field of type 'OtpPurpose[]'
   */
  export type ListEnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose[]'>
    


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


  export type UserAccountWhereInput = {
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    id?: StringFilter<"UserAccount"> | string
    phoneNumber?: StringNullableFilter<"UserAccount"> | string | null
    phoneNumberHash?: StringNullableFilter<"UserAccount"> | string | null
    status?: EnumAccountStatusFilter<"UserAccount"> | $Enums.AccountStatus
    twoFactorEnabled?: BoolFilter<"UserAccount"> | boolean
    createdAt?: DateTimeFilter<"UserAccount"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"UserAccount"> | Date | string | null
    sessions?: SessionListRelationFilter
  }

  export type UserAccountOrderByWithRelationInput = {
    id?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    phoneNumberHash?: SortOrderInput | SortOrder
    status?: SortOrder
    twoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phoneNumber?: string
    phoneNumberHash?: string
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    status?: EnumAccountStatusFilter<"UserAccount"> | $Enums.AccountStatus
    twoFactorEnabled?: BoolFilter<"UserAccount"> | boolean
    createdAt?: DateTimeFilter<"UserAccount"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"UserAccount"> | Date | string | null
    sessions?: SessionListRelationFilter
  }, "id" | "phoneNumber" | "phoneNumberHash">

  export type UserAccountOrderByWithAggregationInput = {
    id?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    phoneNumberHash?: SortOrderInput | SortOrder
    status?: SortOrder
    twoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    _count?: UserAccountCountOrderByAggregateInput
    _max?: UserAccountMaxOrderByAggregateInput
    _min?: UserAccountMinOrderByAggregateInput
  }

  export type UserAccountScalarWhereWithAggregatesInput = {
    AND?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    OR?: UserAccountScalarWhereWithAggregatesInput[]
    NOT?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAccount"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"UserAccount"> | string | null
    phoneNumberHash?: StringNullableWithAggregatesFilter<"UserAccount"> | string | null
    status?: EnumAccountStatusWithAggregatesFilter<"UserAccount"> | $Enums.AccountStatus
    twoFactorEnabled?: BoolWithAggregatesFilter<"UserAccount"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserAccount"> | Date | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"UserAccount"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userAccountId?: StringFilter<"Session"> | string
    deviceId?: StringFilter<"Session"> | string
    clientType?: EnumSessionClientTypeFilter<"Session"> | $Enums.SessionClientType
    refreshTokenHash?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userAccount?: XOR<UserAccountScalarRelationFilter, UserAccountWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userAccountId?: SortOrder
    deviceId?: SortOrder
    clientType?: SortOrder
    refreshTokenHash?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    userAccount?: UserAccountOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refreshTokenHash?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userAccountId?: StringFilter<"Session"> | string
    deviceId?: StringFilter<"Session"> | string
    clientType?: EnumSessionClientTypeFilter<"Session"> | $Enums.SessionClientType
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    userAccount?: XOR<UserAccountScalarRelationFilter, UserAccountWhereInput>
  }, "id" | "refreshTokenHash">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userAccountId?: SortOrder
    deviceId?: SortOrder
    clientType?: SortOrder
    refreshTokenHash?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userAccountId?: StringWithAggregatesFilter<"Session"> | string
    deviceId?: StringWithAggregatesFilter<"Session"> | string
    clientType?: EnumSessionClientTypeWithAggregatesFilter<"Session"> | $Enums.SessionClientType
    refreshTokenHash?: StringWithAggregatesFilter<"Session"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
  }

  export type OtpChallengeWhereInput = {
    AND?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    OR?: OtpChallengeWhereInput[]
    NOT?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    id?: StringFilter<"OtpChallenge"> | string
    target?: StringFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpChallenge"> | string
    attemptCount?: IntFilter<"OtpChallenge"> | number
    expiresAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpChallenge"> | Date | string
  }

  export type OtpChallengeOrderByWithRelationInput = {
    id?: SortOrder
    target?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attemptCount?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OtpChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    OR?: OtpChallengeWhereInput[]
    NOT?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    target?: StringFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpChallenge"> | string
    attemptCount?: IntFilter<"OtpChallenge"> | number
    expiresAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpChallenge"> | Date | string
  }, "id">

  export type OtpChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    target?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attemptCount?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OtpChallengeCountOrderByAggregateInput
    _avg?: OtpChallengeAvgOrderByAggregateInput
    _max?: OtpChallengeMaxOrderByAggregateInput
    _min?: OtpChallengeMinOrderByAggregateInput
    _sum?: OtpChallengeSumOrderByAggregateInput
  }

  export type OtpChallengeScalarWhereWithAggregatesInput = {
    AND?: OtpChallengeScalarWhereWithAggregatesInput | OtpChallengeScalarWhereWithAggregatesInput[]
    OR?: OtpChallengeScalarWhereWithAggregatesInput[]
    NOT?: OtpChallengeScalarWhereWithAggregatesInput | OtpChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpChallenge"> | string
    target?: StringWithAggregatesFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeWithAggregatesFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringWithAggregatesFilter<"OtpChallenge"> | string
    attemptCount?: IntWithAggregatesFilter<"OtpChallenge"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string
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

  export type UserAccountCreateInput = {
    id: string
    phoneNumber?: string | null
    phoneNumberHash?: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled?: boolean
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserAccountInput
  }

  export type UserAccountUncheckedCreateInput = {
    id: string
    phoneNumber?: string | null
    phoneNumberHash?: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled?: boolean
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserAccountInput
  }

  export type UserAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserAccountNestedInput
  }

  export type UserAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserAccountNestedInput
  }

  export type UserAccountCreateManyInput = {
    id: string
    phoneNumber?: string | null
    phoneNumberHash?: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled?: boolean
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type UserAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
    userAccount: UserAccountCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userAccountId: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userAccount?: UserAccountUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAccountId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyInput = {
    id: string
    userAccountId: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAccountId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OtpChallengeCreateInput = {
    id: string
    target: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attemptCount?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpChallengeUncheckedCreateInput = {
    id: string
    target: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attemptCount?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeCreateManyInput = {
    id: string
    target: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attemptCount?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAccountCountOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    phoneNumberHash?: SortOrder
    status?: SortOrder
    twoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type UserAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    phoneNumberHash?: SortOrder
    status?: SortOrder
    twoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type UserAccountMinOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    phoneNumberHash?: SortOrder
    status?: SortOrder
    twoFactorEnabled?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
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

  export type EnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumSessionClientTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionClientType | EnumSessionClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionClientTypeFilter<$PrismaModel> | $Enums.SessionClientType
  }

  export type UserAccountScalarRelationFilter = {
    is?: UserAccountWhereInput
    isNot?: UserAccountWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userAccountId?: SortOrder
    deviceId?: SortOrder
    clientType?: SortOrder
    refreshTokenHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userAccountId?: SortOrder
    deviceId?: SortOrder
    clientType?: SortOrder
    refreshTokenHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userAccountId?: SortOrder
    deviceId?: SortOrder
    clientType?: SortOrder
    refreshTokenHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    lastSeenAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type EnumSessionClientTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionClientType | EnumSessionClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionClientTypeWithAggregatesFilter<$PrismaModel> | $Enums.SessionClientType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionClientTypeFilter<$PrismaModel>
    _max?: NestedEnumSessionClientTypeFilter<$PrismaModel>
  }

  export type EnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
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

  export type OtpChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attemptCount?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpChallengeAvgOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type OtpChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attemptCount?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attemptCount?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpChallengeSumOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type EnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
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

  export type SessionCreateNestedManyWithoutUserAccountInput = {
    create?: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput> | SessionCreateWithoutUserAccountInput[] | SessionUncheckedCreateWithoutUserAccountInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserAccountInput | SessionCreateOrConnectWithoutUserAccountInput[]
    createMany?: SessionCreateManyUserAccountInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserAccountInput = {
    create?: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput> | SessionCreateWithoutUserAccountInput[] | SessionUncheckedCreateWithoutUserAccountInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserAccountInput | SessionCreateOrConnectWithoutUserAccountInput[]
    createMany?: SessionCreateManyUserAccountInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAccountStatusFieldUpdateOperationsInput = {
    set?: $Enums.AccountStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SessionUpdateManyWithoutUserAccountNestedInput = {
    create?: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput> | SessionCreateWithoutUserAccountInput[] | SessionUncheckedCreateWithoutUserAccountInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserAccountInput | SessionCreateOrConnectWithoutUserAccountInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserAccountInput | SessionUpsertWithWhereUniqueWithoutUserAccountInput[]
    createMany?: SessionCreateManyUserAccountInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserAccountInput | SessionUpdateWithWhereUniqueWithoutUserAccountInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserAccountInput | SessionUpdateManyWithWhereWithoutUserAccountInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserAccountNestedInput = {
    create?: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput> | SessionCreateWithoutUserAccountInput[] | SessionUncheckedCreateWithoutUserAccountInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserAccountInput | SessionCreateOrConnectWithoutUserAccountInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserAccountInput | SessionUpsertWithWhereUniqueWithoutUserAccountInput[]
    createMany?: SessionCreateManyUserAccountInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserAccountInput | SessionUpdateWithWhereUniqueWithoutUserAccountInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserAccountInput | SessionUpdateManyWithWhereWithoutUserAccountInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserAccountCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserAccountCreateWithoutSessionsInput, UserAccountUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutSessionsInput
    connect?: UserAccountWhereUniqueInput
  }

  export type EnumSessionClientTypeFieldUpdateOperationsInput = {
    set?: $Enums.SessionClientType
  }

  export type UserAccountUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserAccountCreateWithoutSessionsInput, UserAccountUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutSessionsInput
    upsert?: UserAccountUpsertWithoutSessionsInput
    connect?: UserAccountWhereUniqueInput
    update?: XOR<XOR<UserAccountUpdateToOneWithWhereWithoutSessionsInput, UserAccountUpdateWithoutSessionsInput>, UserAccountUncheckedUpdateWithoutSessionsInput>
  }

  export type EnumOtpPurposeFieldUpdateOperationsInput = {
    set?: $Enums.OtpPurpose
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

  export type NestedEnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumSessionClientTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionClientType | EnumSessionClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionClientTypeFilter<$PrismaModel> | $Enums.SessionClientType
  }

  export type NestedEnumSessionClientTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionClientType | EnumSessionClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionClientType[] | ListEnumSessionClientTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionClientTypeWithAggregatesFilter<$PrismaModel> | $Enums.SessionClientType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionClientTypeFilter<$PrismaModel>
    _max?: NestedEnumSessionClientTypeFilter<$PrismaModel>
  }

  export type NestedEnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
  }

  export type NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
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

  export type SessionCreateWithoutUserAccountInput = {
    id: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type SessionUncheckedCreateWithoutUserAccountInput = {
    id: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type SessionCreateOrConnectWithoutUserAccountInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput>
  }

  export type SessionCreateManyUserAccountInputEnvelope = {
    data: SessionCreateManyUserAccountInput | SessionCreateManyUserAccountInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserAccountInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserAccountInput, SessionUncheckedUpdateWithoutUserAccountInput>
    create: XOR<SessionCreateWithoutUserAccountInput, SessionUncheckedCreateWithoutUserAccountInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserAccountInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserAccountInput, SessionUncheckedUpdateWithoutUserAccountInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserAccountInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserAccountInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userAccountId?: StringFilter<"Session"> | string
    deviceId?: StringFilter<"Session"> | string
    clientType?: EnumSessionClientTypeFilter<"Session"> | $Enums.SessionClientType
    refreshTokenHash?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    lastSeenAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
  }

  export type UserAccountCreateWithoutSessionsInput = {
    id: string
    phoneNumber?: string | null
    phoneNumberHash?: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled?: boolean
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type UserAccountUncheckedCreateWithoutSessionsInput = {
    id: string
    phoneNumber?: string | null
    phoneNumberHash?: string | null
    status: $Enums.AccountStatus
    twoFactorEnabled?: boolean
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type UserAccountCreateOrConnectWithoutSessionsInput = {
    where: UserAccountWhereUniqueInput
    create: XOR<UserAccountCreateWithoutSessionsInput, UserAccountUncheckedCreateWithoutSessionsInput>
  }

  export type UserAccountUpsertWithoutSessionsInput = {
    update: XOR<UserAccountUpdateWithoutSessionsInput, UserAccountUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserAccountCreateWithoutSessionsInput, UserAccountUncheckedCreateWithoutSessionsInput>
    where?: UserAccountWhereInput
  }

  export type UserAccountUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserAccountWhereInput
    data: XOR<UserAccountUpdateWithoutSessionsInput, UserAccountUncheckedUpdateWithoutSessionsInput>
  }

  export type UserAccountUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserAccountUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumberHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyUserAccountInput = {
    id: string
    deviceId: string
    clientType: $Enums.SessionClientType
    refreshTokenHash: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    lastSeenAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type SessionUpdateWithoutUserAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateWithoutUserAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    clientType?: EnumSessionClientTypeFieldUpdateOperationsInput | $Enums.SessionClientType
    refreshTokenHash?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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