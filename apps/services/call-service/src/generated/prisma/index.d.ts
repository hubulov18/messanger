
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
 * Model CallSession
 * 
 */
export type CallSession = $Result.DefaultSelection<Prisma.$CallSessionPayload>
/**
 * Model CallParticipant
 * 
 */
export type CallParticipant = $Result.DefaultSelection<Prisma.$CallParticipantPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CallState: {
  initiated: 'initiated',
  ringing: 'ringing',
  accepted: 'accepted',
  active: 'active',
  ended: 'ended',
  declined: 'declined',
  missed: 'missed',
  canceled: 'canceled',
  failed: 'failed'
};

export type CallState = (typeof CallState)[keyof typeof CallState]


export const CallParticipantRole: {
  caller: 'caller',
  callee: 'callee'
};

export type CallParticipantRole = (typeof CallParticipantRole)[keyof typeof CallParticipantRole]


export const CallParticipantState: {
  invited: 'invited',
  ringing: 'ringing',
  joined: 'joined',
  accepted: 'accepted',
  active: 'active',
  left: 'left',
  declined: 'declined',
  missed: 'missed',
  ended: 'ended',
  failed: 'failed'
};

export type CallParticipantState = (typeof CallParticipantState)[keyof typeof CallParticipantState]


export const CallType: {
  audio: 'audio',
  video: 'video'
};

export type CallType = (typeof CallType)[keyof typeof CallType]


export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type CallState = $Enums.CallState

export const CallState: typeof $Enums.CallState

export type CallParticipantRole = $Enums.CallParticipantRole

export const CallParticipantRole: typeof $Enums.CallParticipantRole

export type CallParticipantState = $Enums.CallParticipantState

export const CallParticipantState: typeof $Enums.CallParticipantState

export type CallType = $Enums.CallType

export const CallType: typeof $Enums.CallType

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CallSessions
 * const callSessions = await prisma.callSession.findMany()
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
   * // Fetch zero or more CallSessions
   * const callSessions = await prisma.callSession.findMany()
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
   * `prisma.callSession`: Exposes CRUD operations for the **CallSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallSessions
    * const callSessions = await prisma.callSession.findMany()
    * ```
    */
  get callSession(): Prisma.CallSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callParticipant`: Exposes CRUD operations for the **CallParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallParticipants
    * const callParticipants = await prisma.callParticipant.findMany()
    * ```
    */
  get callParticipant(): Prisma.CallParticipantDelegate<ExtArgs, ClientOptions>;

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
    CallSession: 'CallSession',
    CallParticipant: 'CallParticipant',
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
      modelProps: "callSession" | "callParticipant" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CallSession: {
        payload: Prisma.$CallSessionPayload<ExtArgs>
        fields: Prisma.CallSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          findFirst: {
            args: Prisma.CallSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          findMany: {
            args: Prisma.CallSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          create: {
            args: Prisma.CallSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          createMany: {
            args: Prisma.CallSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          delete: {
            args: Prisma.CallSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          update: {
            args: Prisma.CallSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          deleteMany: {
            args: Prisma.CallSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>[]
          }
          upsert: {
            args: Prisma.CallSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallSessionPayload>
          }
          aggregate: {
            args: Prisma.CallSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallSession>
          }
          groupBy: {
            args: Prisma.CallSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CallSessionCountAggregateOutputType> | number
          }
        }
      }
      CallParticipant: {
        payload: Prisma.$CallParticipantPayload<ExtArgs>
        fields: Prisma.CallParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          findFirst: {
            args: Prisma.CallParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          findMany: {
            args: Prisma.CallParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>[]
          }
          create: {
            args: Prisma.CallParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          createMany: {
            args: Prisma.CallParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>[]
          }
          delete: {
            args: Prisma.CallParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          update: {
            args: Prisma.CallParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          deleteMany: {
            args: Prisma.CallParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>[]
          }
          upsert: {
            args: Prisma.CallParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallParticipantPayload>
          }
          aggregate: {
            args: Prisma.CallParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallParticipant>
          }
          groupBy: {
            args: Prisma.CallParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<CallParticipantCountAggregateOutputType> | number
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
    callSession?: CallSessionOmit
    callParticipant?: CallParticipantOmit
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
   * Count Type CallSessionCountOutputType
   */

  export type CallSessionCountOutputType = {
    participants: number
  }

  export type CallSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | CallSessionCountOutputTypeCountParticipantsArgs
  }

  // Custom InputTypes
  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSessionCountOutputType
     */
    select?: CallSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CallSessionCountOutputType without action
   */
  export type CallSessionCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallParticipantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CallSession
   */

  export type AggregateCallSession = {
    _count: CallSessionCountAggregateOutputType | null
    _min: CallSessionMinAggregateOutputType | null
    _max: CallSessionMaxAggregateOutputType | null
  }

  export type CallSessionMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    initiatorUserId: string | null
    receiverUserId: string | null
    callType: $Enums.CallType | null
    state: $Enums.CallState | null
    startedAt: Date | null
    ringingAt: Date | null
    acceptedAt: Date | null
    activeAt: Date | null
    endedAt: Date | null
    endReason: string | null
    timelineMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallSessionMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    initiatorUserId: string | null
    receiverUserId: string | null
    callType: $Enums.CallType | null
    state: $Enums.CallState | null
    startedAt: Date | null
    ringingAt: Date | null
    acceptedAt: Date | null
    activeAt: Date | null
    endedAt: Date | null
    endReason: string | null
    timelineMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallSessionCountAggregateOutputType = {
    id: number
    chatId: number
    initiatorUserId: number
    receiverUserId: number
    callType: number
    state: number
    startedAt: number
    ringingAt: number
    acceptedAt: number
    activeAt: number
    endedAt: number
    endReason: number
    timelineMessageId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CallSessionMinAggregateInputType = {
    id?: true
    chatId?: true
    initiatorUserId?: true
    receiverUserId?: true
    callType?: true
    state?: true
    startedAt?: true
    ringingAt?: true
    acceptedAt?: true
    activeAt?: true
    endedAt?: true
    endReason?: true
    timelineMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallSessionMaxAggregateInputType = {
    id?: true
    chatId?: true
    initiatorUserId?: true
    receiverUserId?: true
    callType?: true
    state?: true
    startedAt?: true
    ringingAt?: true
    acceptedAt?: true
    activeAt?: true
    endedAt?: true
    endReason?: true
    timelineMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallSessionCountAggregateInputType = {
    id?: true
    chatId?: true
    initiatorUserId?: true
    receiverUserId?: true
    callType?: true
    state?: true
    startedAt?: true
    ringingAt?: true
    acceptedAt?: true
    activeAt?: true
    endedAt?: true
    endReason?: true
    timelineMessageId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CallSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallSession to aggregate.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallSessions
    **/
    _count?: true | CallSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallSessionMaxAggregateInputType
  }

  export type GetCallSessionAggregateType<T extends CallSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCallSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallSession[P]>
      : GetScalarType<T[P], AggregateCallSession[P]>
  }




  export type CallSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallSessionWhereInput
    orderBy?: CallSessionOrderByWithAggregationInput | CallSessionOrderByWithAggregationInput[]
    by: CallSessionScalarFieldEnum[] | CallSessionScalarFieldEnum
    having?: CallSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallSessionCountAggregateInputType | true
    _min?: CallSessionMinAggregateInputType
    _max?: CallSessionMaxAggregateInputType
  }

  export type CallSessionGroupByOutputType = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date
    ringingAt: Date | null
    acceptedAt: Date | null
    activeAt: Date | null
    endedAt: Date | null
    endReason: string | null
    timelineMessageId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CallSessionCountAggregateOutputType | null
    _min: CallSessionMinAggregateOutputType | null
    _max: CallSessionMaxAggregateOutputType | null
  }

  type GetCallSessionGroupByPayload<T extends CallSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CallSessionGroupByOutputType[P]>
        }
      >
    >


  export type CallSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    initiatorUserId?: boolean
    receiverUserId?: boolean
    callType?: boolean
    state?: boolean
    startedAt?: boolean
    ringingAt?: boolean
    acceptedAt?: boolean
    activeAt?: boolean
    endedAt?: boolean
    endReason?: boolean
    timelineMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    participants?: boolean | CallSession$participantsArgs<ExtArgs>
    _count?: boolean | CallSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    initiatorUserId?: boolean
    receiverUserId?: boolean
    callType?: boolean
    state?: boolean
    startedAt?: boolean
    ringingAt?: boolean
    acceptedAt?: boolean
    activeAt?: boolean
    endedAt?: boolean
    endReason?: boolean
    timelineMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    initiatorUserId?: boolean
    receiverUserId?: boolean
    callType?: boolean
    state?: boolean
    startedAt?: boolean
    ringingAt?: boolean
    acceptedAt?: boolean
    activeAt?: boolean
    endedAt?: boolean
    endReason?: boolean
    timelineMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["callSession"]>

  export type CallSessionSelectScalar = {
    id?: boolean
    chatId?: boolean
    initiatorUserId?: boolean
    receiverUserId?: boolean
    callType?: boolean
    state?: boolean
    startedAt?: boolean
    ringingAt?: boolean
    acceptedAt?: boolean
    activeAt?: boolean
    endedAt?: boolean
    endReason?: boolean
    timelineMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CallSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "initiatorUserId" | "receiverUserId" | "callType" | "state" | "startedAt" | "ringingAt" | "acceptedAt" | "activeAt" | "endedAt" | "endReason" | "timelineMessageId" | "createdAt" | "updatedAt", ExtArgs["result"]["callSession"]>
  export type CallSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | CallSession$participantsArgs<ExtArgs>
    _count?: boolean | CallSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CallSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CallSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CallSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallSession"
    objects: {
      participants: Prisma.$CallParticipantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      initiatorUserId: string
      receiverUserId: string
      callType: $Enums.CallType
      state: $Enums.CallState
      startedAt: Date
      ringingAt: Date | null
      acceptedAt: Date | null
      activeAt: Date | null
      endedAt: Date | null
      endReason: string | null
      timelineMessageId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["callSession"]>
    composites: {}
  }

  type CallSessionGetPayload<S extends boolean | null | undefined | CallSessionDefaultArgs> = $Result.GetResult<Prisma.$CallSessionPayload, S>

  type CallSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallSessionCountAggregateInputType | true
    }

  export interface CallSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallSession'], meta: { name: 'CallSession' } }
    /**
     * Find zero or one CallSession that matches the filter.
     * @param {CallSessionFindUniqueArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallSessionFindUniqueArgs>(args: SelectSubset<T, CallSessionFindUniqueArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallSessionFindUniqueOrThrowArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CallSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindFirstArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallSessionFindFirstArgs>(args?: SelectSubset<T, CallSessionFindFirstArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindFirstOrThrowArgs} args - Arguments to find a CallSession
     * @example
     * // Get one CallSession
     * const callSession = await prisma.callSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CallSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallSessions
     * const callSessions = await prisma.callSession.findMany()
     * 
     * // Get first 10 CallSessions
     * const callSessions = await prisma.callSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callSessionWithIdOnly = await prisma.callSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallSessionFindManyArgs>(args?: SelectSubset<T, CallSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallSession.
     * @param {CallSessionCreateArgs} args - Arguments to create a CallSession.
     * @example
     * // Create one CallSession
     * const CallSession = await prisma.callSession.create({
     *   data: {
     *     // ... data to create a CallSession
     *   }
     * })
     * 
     */
    create<T extends CallSessionCreateArgs>(args: SelectSubset<T, CallSessionCreateArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallSessions.
     * @param {CallSessionCreateManyArgs} args - Arguments to create many CallSessions.
     * @example
     * // Create many CallSessions
     * const callSession = await prisma.callSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallSessionCreateManyArgs>(args?: SelectSubset<T, CallSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallSessions and returns the data saved in the database.
     * @param {CallSessionCreateManyAndReturnArgs} args - Arguments to create many CallSessions.
     * @example
     * // Create many CallSessions
     * const callSession = await prisma.callSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallSessions and only return the `id`
     * const callSessionWithIdOnly = await prisma.callSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CallSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CallSession.
     * @param {CallSessionDeleteArgs} args - Arguments to delete one CallSession.
     * @example
     * // Delete one CallSession
     * const CallSession = await prisma.callSession.delete({
     *   where: {
     *     // ... filter to delete one CallSession
     *   }
     * })
     * 
     */
    delete<T extends CallSessionDeleteArgs>(args: SelectSubset<T, CallSessionDeleteArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallSession.
     * @param {CallSessionUpdateArgs} args - Arguments to update one CallSession.
     * @example
     * // Update one CallSession
     * const callSession = await prisma.callSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallSessionUpdateArgs>(args: SelectSubset<T, CallSessionUpdateArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallSessions.
     * @param {CallSessionDeleteManyArgs} args - Arguments to filter CallSessions to delete.
     * @example
     * // Delete a few CallSessions
     * const { count } = await prisma.callSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallSessionDeleteManyArgs>(args?: SelectSubset<T, CallSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallSessions
     * const callSession = await prisma.callSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallSessionUpdateManyArgs>(args: SelectSubset<T, CallSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallSessions and returns the data updated in the database.
     * @param {CallSessionUpdateManyAndReturnArgs} args - Arguments to update many CallSessions.
     * @example
     * // Update many CallSessions
     * const callSession = await prisma.callSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallSessions and only return the `id`
     * const callSessionWithIdOnly = await prisma.callSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends CallSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, CallSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CallSession.
     * @param {CallSessionUpsertArgs} args - Arguments to update or create a CallSession.
     * @example
     * // Update or create a CallSession
     * const callSession = await prisma.callSession.upsert({
     *   create: {
     *     // ... data to create a CallSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallSession we want to update
     *   }
     * })
     */
    upsert<T extends CallSessionUpsertArgs>(args: SelectSubset<T, CallSessionUpsertArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CallSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionCountArgs} args - Arguments to filter CallSessions to count.
     * @example
     * // Count the number of CallSessions
     * const count = await prisma.callSession.count({
     *   where: {
     *     // ... the filter for the CallSessions we want to count
     *   }
     * })
    **/
    count<T extends CallSessionCountArgs>(
      args?: Subset<T, CallSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CallSessionAggregateArgs>(args: Subset<T, CallSessionAggregateArgs>): Prisma.PrismaPromise<GetCallSessionAggregateType<T>>

    /**
     * Group by CallSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallSessionGroupByArgs} args - Group by arguments.
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
      T extends CallSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallSessionGroupByArgs['orderBy'] }
        : { orderBy?: CallSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CallSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallSession model
   */
  readonly fields: CallSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends CallSession$participantsArgs<ExtArgs> = {}>(args?: Subset<T, CallSession$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CallSession model
   */
  interface CallSessionFieldRefs {
    readonly id: FieldRef<"CallSession", 'String'>
    readonly chatId: FieldRef<"CallSession", 'String'>
    readonly initiatorUserId: FieldRef<"CallSession", 'String'>
    readonly receiverUserId: FieldRef<"CallSession", 'String'>
    readonly callType: FieldRef<"CallSession", 'CallType'>
    readonly state: FieldRef<"CallSession", 'CallState'>
    readonly startedAt: FieldRef<"CallSession", 'DateTime'>
    readonly ringingAt: FieldRef<"CallSession", 'DateTime'>
    readonly acceptedAt: FieldRef<"CallSession", 'DateTime'>
    readonly activeAt: FieldRef<"CallSession", 'DateTime'>
    readonly endedAt: FieldRef<"CallSession", 'DateTime'>
    readonly endReason: FieldRef<"CallSession", 'String'>
    readonly timelineMessageId: FieldRef<"CallSession", 'String'>
    readonly createdAt: FieldRef<"CallSession", 'DateTime'>
    readonly updatedAt: FieldRef<"CallSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallSession findUnique
   */
  export type CallSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession findUniqueOrThrow
   */
  export type CallSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession findFirst
   */
  export type CallSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallSessions.
     */
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession findFirstOrThrow
   */
  export type CallSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSession to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallSessions.
     */
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession findMany
   */
  export type CallSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter, which CallSessions to fetch.
     */
    where?: CallSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallSessions to fetch.
     */
    orderBy?: CallSessionOrderByWithRelationInput | CallSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallSessions.
     */
    cursor?: CallSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallSessions.
     */
    skip?: number
    distinct?: CallSessionScalarFieldEnum | CallSessionScalarFieldEnum[]
  }

  /**
   * CallSession create
   */
  export type CallSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CallSession.
     */
    data: XOR<CallSessionCreateInput, CallSessionUncheckedCreateInput>
  }

  /**
   * CallSession createMany
   */
  export type CallSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallSessions.
     */
    data: CallSessionCreateManyInput | CallSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallSession createManyAndReturn
   */
  export type CallSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * The data used to create many CallSessions.
     */
    data: CallSessionCreateManyInput | CallSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallSession update
   */
  export type CallSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CallSession.
     */
    data: XOR<CallSessionUpdateInput, CallSessionUncheckedUpdateInput>
    /**
     * Choose, which CallSession to update.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession updateMany
   */
  export type CallSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallSessions.
     */
    data: XOR<CallSessionUpdateManyMutationInput, CallSessionUncheckedUpdateManyInput>
    /**
     * Filter which CallSessions to update
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to update.
     */
    limit?: number
  }

  /**
   * CallSession updateManyAndReturn
   */
  export type CallSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * The data used to update CallSessions.
     */
    data: XOR<CallSessionUpdateManyMutationInput, CallSessionUncheckedUpdateManyInput>
    /**
     * Filter which CallSessions to update
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to update.
     */
    limit?: number
  }

  /**
   * CallSession upsert
   */
  export type CallSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CallSession to update in case it exists.
     */
    where: CallSessionWhereUniqueInput
    /**
     * In case the CallSession found by the `where` argument doesn't exist, create a new CallSession with this data.
     */
    create: XOR<CallSessionCreateInput, CallSessionUncheckedCreateInput>
    /**
     * In case the CallSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallSessionUpdateInput, CallSessionUncheckedUpdateInput>
  }

  /**
   * CallSession delete
   */
  export type CallSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
    /**
     * Filter which CallSession to delete.
     */
    where: CallSessionWhereUniqueInput
  }

  /**
   * CallSession deleteMany
   */
  export type CallSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallSessions to delete
     */
    where?: CallSessionWhereInput
    /**
     * Limit how many CallSessions to delete.
     */
    limit?: number
  }

  /**
   * CallSession.participants
   */
  export type CallSession$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    where?: CallParticipantWhereInput
    orderBy?: CallParticipantOrderByWithRelationInput | CallParticipantOrderByWithRelationInput[]
    cursor?: CallParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallParticipantScalarFieldEnum | CallParticipantScalarFieldEnum[]
  }

  /**
   * CallSession without action
   */
  export type CallSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallSession
     */
    select?: CallSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallSession
     */
    omit?: CallSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallSessionInclude<ExtArgs> | null
  }


  /**
   * Model CallParticipant
   */

  export type AggregateCallParticipant = {
    _count: CallParticipantCountAggregateOutputType | null
    _min: CallParticipantMinAggregateOutputType | null
    _max: CallParticipantMaxAggregateOutputType | null
  }

  export type CallParticipantMinAggregateOutputType = {
    id: string | null
    callId: string | null
    userId: string | null
    role: $Enums.CallParticipantRole | null
    state: $Enums.CallParticipantState | null
    joinedAt: Date | null
    leftAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallParticipantMaxAggregateOutputType = {
    id: string | null
    callId: string | null
    userId: string | null
    role: $Enums.CallParticipantRole | null
    state: $Enums.CallParticipantState | null
    joinedAt: Date | null
    leftAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallParticipantCountAggregateOutputType = {
    id: number
    callId: number
    userId: number
    role: number
    state: number
    joinedAt: number
    leftAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CallParticipantMinAggregateInputType = {
    id?: true
    callId?: true
    userId?: true
    role?: true
    state?: true
    joinedAt?: true
    leftAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallParticipantMaxAggregateInputType = {
    id?: true
    callId?: true
    userId?: true
    role?: true
    state?: true
    joinedAt?: true
    leftAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallParticipantCountAggregateInputType = {
    id?: true
    callId?: true
    userId?: true
    role?: true
    state?: true
    joinedAt?: true
    leftAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CallParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallParticipant to aggregate.
     */
    where?: CallParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallParticipants to fetch.
     */
    orderBy?: CallParticipantOrderByWithRelationInput | CallParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallParticipants
    **/
    _count?: true | CallParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallParticipantMaxAggregateInputType
  }

  export type GetCallParticipantAggregateType<T extends CallParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateCallParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallParticipant[P]>
      : GetScalarType<T[P], AggregateCallParticipant[P]>
  }




  export type CallParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallParticipantWhereInput
    orderBy?: CallParticipantOrderByWithAggregationInput | CallParticipantOrderByWithAggregationInput[]
    by: CallParticipantScalarFieldEnum[] | CallParticipantScalarFieldEnum
    having?: CallParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallParticipantCountAggregateInputType | true
    _min?: CallParticipantMinAggregateInputType
    _max?: CallParticipantMaxAggregateInputType
  }

  export type CallParticipantGroupByOutputType = {
    id: string
    callId: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt: Date | null
    leftAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CallParticipantCountAggregateOutputType | null
    _min: CallParticipantMinAggregateOutputType | null
    _max: CallParticipantMaxAggregateOutputType | null
  }

  type GetCallParticipantGroupByPayload<T extends CallParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], CallParticipantGroupByOutputType[P]>
        }
      >
    >


  export type CallParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    userId?: boolean
    role?: boolean
    state?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callParticipant"]>

  export type CallParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    userId?: boolean
    role?: boolean
    state?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callParticipant"]>

  export type CallParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callId?: boolean
    userId?: boolean
    role?: boolean
    state?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callParticipant"]>

  export type CallParticipantSelectScalar = {
    id?: boolean
    callId?: boolean
    userId?: boolean
    role?: boolean
    state?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CallParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callId" | "userId" | "role" | "state" | "joinedAt" | "leftAt" | "createdAt" | "updatedAt", ExtArgs["result"]["callParticipant"]>
  export type CallParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CallParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }
  export type CallParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | CallSessionDefaultArgs<ExtArgs>
  }

  export type $CallParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallParticipant"
    objects: {
      call: Prisma.$CallSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      callId: string
      userId: string
      role: $Enums.CallParticipantRole
      state: $Enums.CallParticipantState
      joinedAt: Date | null
      leftAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["callParticipant"]>
    composites: {}
  }

  type CallParticipantGetPayload<S extends boolean | null | undefined | CallParticipantDefaultArgs> = $Result.GetResult<Prisma.$CallParticipantPayload, S>

  type CallParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallParticipantCountAggregateInputType | true
    }

  export interface CallParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallParticipant'], meta: { name: 'CallParticipant' } }
    /**
     * Find zero or one CallParticipant that matches the filter.
     * @param {CallParticipantFindUniqueArgs} args - Arguments to find a CallParticipant
     * @example
     * // Get one CallParticipant
     * const callParticipant = await prisma.callParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallParticipantFindUniqueArgs>(args: SelectSubset<T, CallParticipantFindUniqueArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallParticipantFindUniqueOrThrowArgs} args - Arguments to find a CallParticipant
     * @example
     * // Get one CallParticipant
     * const callParticipant = await prisma.callParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, CallParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantFindFirstArgs} args - Arguments to find a CallParticipant
     * @example
     * // Get one CallParticipant
     * const callParticipant = await prisma.callParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallParticipantFindFirstArgs>(args?: SelectSubset<T, CallParticipantFindFirstArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantFindFirstOrThrowArgs} args - Arguments to find a CallParticipant
     * @example
     * // Get one CallParticipant
     * const callParticipant = await prisma.callParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, CallParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallParticipants
     * const callParticipants = await prisma.callParticipant.findMany()
     * 
     * // Get first 10 CallParticipants
     * const callParticipants = await prisma.callParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callParticipantWithIdOnly = await prisma.callParticipant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallParticipantFindManyArgs>(args?: SelectSubset<T, CallParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallParticipant.
     * @param {CallParticipantCreateArgs} args - Arguments to create a CallParticipant.
     * @example
     * // Create one CallParticipant
     * const CallParticipant = await prisma.callParticipant.create({
     *   data: {
     *     // ... data to create a CallParticipant
     *   }
     * })
     * 
     */
    create<T extends CallParticipantCreateArgs>(args: SelectSubset<T, CallParticipantCreateArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallParticipants.
     * @param {CallParticipantCreateManyArgs} args - Arguments to create many CallParticipants.
     * @example
     * // Create many CallParticipants
     * const callParticipant = await prisma.callParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallParticipantCreateManyArgs>(args?: SelectSubset<T, CallParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallParticipants and returns the data saved in the database.
     * @param {CallParticipantCreateManyAndReturnArgs} args - Arguments to create many CallParticipants.
     * @example
     * // Create many CallParticipants
     * const callParticipant = await prisma.callParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallParticipants and only return the `id`
     * const callParticipantWithIdOnly = await prisma.callParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, CallParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CallParticipant.
     * @param {CallParticipantDeleteArgs} args - Arguments to delete one CallParticipant.
     * @example
     * // Delete one CallParticipant
     * const CallParticipant = await prisma.callParticipant.delete({
     *   where: {
     *     // ... filter to delete one CallParticipant
     *   }
     * })
     * 
     */
    delete<T extends CallParticipantDeleteArgs>(args: SelectSubset<T, CallParticipantDeleteArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallParticipant.
     * @param {CallParticipantUpdateArgs} args - Arguments to update one CallParticipant.
     * @example
     * // Update one CallParticipant
     * const callParticipant = await prisma.callParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallParticipantUpdateArgs>(args: SelectSubset<T, CallParticipantUpdateArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallParticipants.
     * @param {CallParticipantDeleteManyArgs} args - Arguments to filter CallParticipants to delete.
     * @example
     * // Delete a few CallParticipants
     * const { count } = await prisma.callParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallParticipantDeleteManyArgs>(args?: SelectSubset<T, CallParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallParticipants
     * const callParticipant = await prisma.callParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallParticipantUpdateManyArgs>(args: SelectSubset<T, CallParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallParticipants and returns the data updated in the database.
     * @param {CallParticipantUpdateManyAndReturnArgs} args - Arguments to update many CallParticipants.
     * @example
     * // Update many CallParticipants
     * const callParticipant = await prisma.callParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallParticipants and only return the `id`
     * const callParticipantWithIdOnly = await prisma.callParticipant.updateManyAndReturn({
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
    updateManyAndReturn<T extends CallParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, CallParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CallParticipant.
     * @param {CallParticipantUpsertArgs} args - Arguments to update or create a CallParticipant.
     * @example
     * // Update or create a CallParticipant
     * const callParticipant = await prisma.callParticipant.upsert({
     *   create: {
     *     // ... data to create a CallParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallParticipant we want to update
     *   }
     * })
     */
    upsert<T extends CallParticipantUpsertArgs>(args: SelectSubset<T, CallParticipantUpsertArgs<ExtArgs>>): Prisma__CallParticipantClient<$Result.GetResult<Prisma.$CallParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CallParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantCountArgs} args - Arguments to filter CallParticipants to count.
     * @example
     * // Count the number of CallParticipants
     * const count = await prisma.callParticipant.count({
     *   where: {
     *     // ... the filter for the CallParticipants we want to count
     *   }
     * })
    **/
    count<T extends CallParticipantCountArgs>(
      args?: Subset<T, CallParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CallParticipantAggregateArgs>(args: Subset<T, CallParticipantAggregateArgs>): Prisma.PrismaPromise<GetCallParticipantAggregateType<T>>

    /**
     * Group by CallParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallParticipantGroupByArgs} args - Group by arguments.
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
      T extends CallParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallParticipantGroupByArgs['orderBy'] }
        : { orderBy?: CallParticipantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CallParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallParticipant model
   */
  readonly fields: CallParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    call<T extends CallSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CallSessionDefaultArgs<ExtArgs>>): Prisma__CallSessionClient<$Result.GetResult<Prisma.$CallSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CallParticipant model
   */
  interface CallParticipantFieldRefs {
    readonly id: FieldRef<"CallParticipant", 'String'>
    readonly callId: FieldRef<"CallParticipant", 'String'>
    readonly userId: FieldRef<"CallParticipant", 'String'>
    readonly role: FieldRef<"CallParticipant", 'CallParticipantRole'>
    readonly state: FieldRef<"CallParticipant", 'CallParticipantState'>
    readonly joinedAt: FieldRef<"CallParticipant", 'DateTime'>
    readonly leftAt: FieldRef<"CallParticipant", 'DateTime'>
    readonly createdAt: FieldRef<"CallParticipant", 'DateTime'>
    readonly updatedAt: FieldRef<"CallParticipant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallParticipant findUnique
   */
  export type CallParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter, which CallParticipant to fetch.
     */
    where: CallParticipantWhereUniqueInput
  }

  /**
   * CallParticipant findUniqueOrThrow
   */
  export type CallParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter, which CallParticipant to fetch.
     */
    where: CallParticipantWhereUniqueInput
  }

  /**
   * CallParticipant findFirst
   */
  export type CallParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter, which CallParticipant to fetch.
     */
    where?: CallParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallParticipants to fetch.
     */
    orderBy?: CallParticipantOrderByWithRelationInput | CallParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallParticipants.
     */
    cursor?: CallParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallParticipants.
     */
    distinct?: CallParticipantScalarFieldEnum | CallParticipantScalarFieldEnum[]
  }

  /**
   * CallParticipant findFirstOrThrow
   */
  export type CallParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter, which CallParticipant to fetch.
     */
    where?: CallParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallParticipants to fetch.
     */
    orderBy?: CallParticipantOrderByWithRelationInput | CallParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallParticipants.
     */
    cursor?: CallParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallParticipants.
     */
    distinct?: CallParticipantScalarFieldEnum | CallParticipantScalarFieldEnum[]
  }

  /**
   * CallParticipant findMany
   */
  export type CallParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter, which CallParticipants to fetch.
     */
    where?: CallParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallParticipants to fetch.
     */
    orderBy?: CallParticipantOrderByWithRelationInput | CallParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallParticipants.
     */
    cursor?: CallParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallParticipants.
     */
    skip?: number
    distinct?: CallParticipantScalarFieldEnum | CallParticipantScalarFieldEnum[]
  }

  /**
   * CallParticipant create
   */
  export type CallParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a CallParticipant.
     */
    data: XOR<CallParticipantCreateInput, CallParticipantUncheckedCreateInput>
  }

  /**
   * CallParticipant createMany
   */
  export type CallParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallParticipants.
     */
    data: CallParticipantCreateManyInput | CallParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallParticipant createManyAndReturn
   */
  export type CallParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many CallParticipants.
     */
    data: CallParticipantCreateManyInput | CallParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallParticipant update
   */
  export type CallParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a CallParticipant.
     */
    data: XOR<CallParticipantUpdateInput, CallParticipantUncheckedUpdateInput>
    /**
     * Choose, which CallParticipant to update.
     */
    where: CallParticipantWhereUniqueInput
  }

  /**
   * CallParticipant updateMany
   */
  export type CallParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallParticipants.
     */
    data: XOR<CallParticipantUpdateManyMutationInput, CallParticipantUncheckedUpdateManyInput>
    /**
     * Filter which CallParticipants to update
     */
    where?: CallParticipantWhereInput
    /**
     * Limit how many CallParticipants to update.
     */
    limit?: number
  }

  /**
   * CallParticipant updateManyAndReturn
   */
  export type CallParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * The data used to update CallParticipants.
     */
    data: XOR<CallParticipantUpdateManyMutationInput, CallParticipantUncheckedUpdateManyInput>
    /**
     * Filter which CallParticipants to update
     */
    where?: CallParticipantWhereInput
    /**
     * Limit how many CallParticipants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallParticipant upsert
   */
  export type CallParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the CallParticipant to update in case it exists.
     */
    where: CallParticipantWhereUniqueInput
    /**
     * In case the CallParticipant found by the `where` argument doesn't exist, create a new CallParticipant with this data.
     */
    create: XOR<CallParticipantCreateInput, CallParticipantUncheckedCreateInput>
    /**
     * In case the CallParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallParticipantUpdateInput, CallParticipantUncheckedUpdateInput>
  }

  /**
   * CallParticipant delete
   */
  export type CallParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
    /**
     * Filter which CallParticipant to delete.
     */
    where: CallParticipantWhereUniqueInput
  }

  /**
   * CallParticipant deleteMany
   */
  export type CallParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallParticipants to delete
     */
    where?: CallParticipantWhereInput
    /**
     * Limit how many CallParticipants to delete.
     */
    limit?: number
  }

  /**
   * CallParticipant without action
   */
  export type CallParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallParticipant
     */
    select?: CallParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallParticipant
     */
    omit?: CallParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallParticipantInclude<ExtArgs> | null
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


  export const CallSessionScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    initiatorUserId: 'initiatorUserId',
    receiverUserId: 'receiverUserId',
    callType: 'callType',
    state: 'state',
    startedAt: 'startedAt',
    ringingAt: 'ringingAt',
    acceptedAt: 'acceptedAt',
    activeAt: 'activeAt',
    endedAt: 'endedAt',
    endReason: 'endReason',
    timelineMessageId: 'timelineMessageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CallSessionScalarFieldEnum = (typeof CallSessionScalarFieldEnum)[keyof typeof CallSessionScalarFieldEnum]


  export const CallParticipantScalarFieldEnum: {
    id: 'id',
    callId: 'callId',
    userId: 'userId',
    role: 'role',
    state: 'state',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CallParticipantScalarFieldEnum = (typeof CallParticipantScalarFieldEnum)[keyof typeof CallParticipantScalarFieldEnum]


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
   * Reference to a field of type 'CallType'
   */
  export type EnumCallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallType'>
    


  /**
   * Reference to a field of type 'CallType[]'
   */
  export type ListEnumCallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallType[]'>
    


  /**
   * Reference to a field of type 'CallState'
   */
  export type EnumCallStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallState'>
    


  /**
   * Reference to a field of type 'CallState[]'
   */
  export type ListEnumCallStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallState[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CallParticipantRole'
   */
  export type EnumCallParticipantRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallParticipantRole'>
    


  /**
   * Reference to a field of type 'CallParticipantRole[]'
   */
  export type ListEnumCallParticipantRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallParticipantRole[]'>
    


  /**
   * Reference to a field of type 'CallParticipantState'
   */
  export type EnumCallParticipantStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallParticipantState'>
    


  /**
   * Reference to a field of type 'CallParticipantState[]'
   */
  export type ListEnumCallParticipantStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CallParticipantState[]'>
    


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


  export type CallSessionWhereInput = {
    AND?: CallSessionWhereInput | CallSessionWhereInput[]
    OR?: CallSessionWhereInput[]
    NOT?: CallSessionWhereInput | CallSessionWhereInput[]
    id?: StringFilter<"CallSession"> | string
    chatId?: StringFilter<"CallSession"> | string
    initiatorUserId?: StringFilter<"CallSession"> | string
    receiverUserId?: StringFilter<"CallSession"> | string
    callType?: EnumCallTypeFilter<"CallSession"> | $Enums.CallType
    state?: EnumCallStateFilter<"CallSession"> | $Enums.CallState
    startedAt?: DateTimeFilter<"CallSession"> | Date | string
    ringingAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    activeAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    endReason?: StringNullableFilter<"CallSession"> | string | null
    timelineMessageId?: StringNullableFilter<"CallSession"> | string | null
    createdAt?: DateTimeFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeFilter<"CallSession"> | Date | string
    participants?: CallParticipantListRelationFilter
  }

  export type CallSessionOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    initiatorUserId?: SortOrder
    receiverUserId?: SortOrder
    callType?: SortOrder
    state?: SortOrder
    startedAt?: SortOrder
    ringingAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    activeAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    endReason?: SortOrderInput | SortOrder
    timelineMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    participants?: CallParticipantOrderByRelationAggregateInput
  }

  export type CallSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CallSessionWhereInput | CallSessionWhereInput[]
    OR?: CallSessionWhereInput[]
    NOT?: CallSessionWhereInput | CallSessionWhereInput[]
    chatId?: StringFilter<"CallSession"> | string
    initiatorUserId?: StringFilter<"CallSession"> | string
    receiverUserId?: StringFilter<"CallSession"> | string
    callType?: EnumCallTypeFilter<"CallSession"> | $Enums.CallType
    state?: EnumCallStateFilter<"CallSession"> | $Enums.CallState
    startedAt?: DateTimeFilter<"CallSession"> | Date | string
    ringingAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    acceptedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    activeAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"CallSession"> | Date | string | null
    endReason?: StringNullableFilter<"CallSession"> | string | null
    timelineMessageId?: StringNullableFilter<"CallSession"> | string | null
    createdAt?: DateTimeFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeFilter<"CallSession"> | Date | string
    participants?: CallParticipantListRelationFilter
  }, "id">

  export type CallSessionOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    initiatorUserId?: SortOrder
    receiverUserId?: SortOrder
    callType?: SortOrder
    state?: SortOrder
    startedAt?: SortOrder
    ringingAt?: SortOrderInput | SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    activeAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    endReason?: SortOrderInput | SortOrder
    timelineMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CallSessionCountOrderByAggregateInput
    _max?: CallSessionMaxOrderByAggregateInput
    _min?: CallSessionMinOrderByAggregateInput
  }

  export type CallSessionScalarWhereWithAggregatesInput = {
    AND?: CallSessionScalarWhereWithAggregatesInput | CallSessionScalarWhereWithAggregatesInput[]
    OR?: CallSessionScalarWhereWithAggregatesInput[]
    NOT?: CallSessionScalarWhereWithAggregatesInput | CallSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallSession"> | string
    chatId?: StringWithAggregatesFilter<"CallSession"> | string
    initiatorUserId?: StringWithAggregatesFilter<"CallSession"> | string
    receiverUserId?: StringWithAggregatesFilter<"CallSession"> | string
    callType?: EnumCallTypeWithAggregatesFilter<"CallSession"> | $Enums.CallType
    state?: EnumCallStateWithAggregatesFilter<"CallSession"> | $Enums.CallState
    startedAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
    ringingAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    activeAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"CallSession"> | Date | string | null
    endReason?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    timelineMessageId?: StringNullableWithAggregatesFilter<"CallSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CallSession"> | Date | string
  }

  export type CallParticipantWhereInput = {
    AND?: CallParticipantWhereInput | CallParticipantWhereInput[]
    OR?: CallParticipantWhereInput[]
    NOT?: CallParticipantWhereInput | CallParticipantWhereInput[]
    id?: StringFilter<"CallParticipant"> | string
    callId?: StringFilter<"CallParticipant"> | string
    userId?: StringFilter<"CallParticipant"> | string
    role?: EnumCallParticipantRoleFilter<"CallParticipant"> | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFilter<"CallParticipant"> | $Enums.CallParticipantState
    joinedAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    createdAt?: DateTimeFilter<"CallParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"CallParticipant"> | Date | string
    call?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }

  export type CallParticipantOrderByWithRelationInput = {
    id?: SortOrder
    callId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    state?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    leftAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    call?: CallSessionOrderByWithRelationInput
  }

  export type CallParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    callId_userId?: CallParticipantCallIdUserIdCompoundUniqueInput
    AND?: CallParticipantWhereInput | CallParticipantWhereInput[]
    OR?: CallParticipantWhereInput[]
    NOT?: CallParticipantWhereInput | CallParticipantWhereInput[]
    callId?: StringFilter<"CallParticipant"> | string
    userId?: StringFilter<"CallParticipant"> | string
    role?: EnumCallParticipantRoleFilter<"CallParticipant"> | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFilter<"CallParticipant"> | $Enums.CallParticipantState
    joinedAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    createdAt?: DateTimeFilter<"CallParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"CallParticipant"> | Date | string
    call?: XOR<CallSessionScalarRelationFilter, CallSessionWhereInput>
  }, "id" | "callId_userId">

  export type CallParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    callId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    state?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    leftAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CallParticipantCountOrderByAggregateInput
    _max?: CallParticipantMaxOrderByAggregateInput
    _min?: CallParticipantMinOrderByAggregateInput
  }

  export type CallParticipantScalarWhereWithAggregatesInput = {
    AND?: CallParticipantScalarWhereWithAggregatesInput | CallParticipantScalarWhereWithAggregatesInput[]
    OR?: CallParticipantScalarWhereWithAggregatesInput[]
    NOT?: CallParticipantScalarWhereWithAggregatesInput | CallParticipantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallParticipant"> | string
    callId?: StringWithAggregatesFilter<"CallParticipant"> | string
    userId?: StringWithAggregatesFilter<"CallParticipant"> | string
    role?: EnumCallParticipantRoleWithAggregatesFilter<"CallParticipant"> | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateWithAggregatesFilter<"CallParticipant"> | $Enums.CallParticipantState
    joinedAt?: DateTimeNullableWithAggregatesFilter<"CallParticipant"> | Date | string | null
    leftAt?: DateTimeNullableWithAggregatesFilter<"CallParticipant"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CallParticipant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CallParticipant"> | Date | string
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

  export type CallSessionCreateInput = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType?: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date | string
    ringingAt?: Date | string | null
    acceptedAt?: Date | string | null
    activeAt?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    timelineMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: CallParticipantCreateNestedManyWithoutCallInput
  }

  export type CallSessionUncheckedCreateInput = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType?: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date | string
    ringingAt?: Date | string | null
    acceptedAt?: Date | string | null
    activeAt?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    timelineMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: CallParticipantUncheckedCreateNestedManyWithoutCallInput
  }

  export type CallSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: CallParticipantUpdateManyWithoutCallNestedInput
  }

  export type CallSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: CallParticipantUncheckedUpdateManyWithoutCallNestedInput
  }

  export type CallSessionCreateManyInput = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType?: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date | string
    ringingAt?: Date | string | null
    acceptedAt?: Date | string | null
    activeAt?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    timelineMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantCreateInput = {
    id: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    call: CallSessionCreateNestedOneWithoutParticipantsInput
  }

  export type CallParticipantUncheckedCreateInput = {
    id: string
    callId: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    call?: CallSessionUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type CallParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantCreateManyInput = {
    id: string
    callId: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    callId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumCallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCallTypeFilter<$PrismaModel> | $Enums.CallType
  }

  export type EnumCallStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CallState | EnumCallStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallStateFilter<$PrismaModel> | $Enums.CallState
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

  export type CallParticipantListRelationFilter = {
    every?: CallParticipantWhereInput
    some?: CallParticipantWhereInput
    none?: CallParticipantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CallParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CallSessionCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    initiatorUserId?: SortOrder
    receiverUserId?: SortOrder
    callType?: SortOrder
    state?: SortOrder
    startedAt?: SortOrder
    ringingAt?: SortOrder
    acceptedAt?: SortOrder
    activeAt?: SortOrder
    endedAt?: SortOrder
    endReason?: SortOrder
    timelineMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    initiatorUserId?: SortOrder
    receiverUserId?: SortOrder
    callType?: SortOrder
    state?: SortOrder
    startedAt?: SortOrder
    ringingAt?: SortOrder
    acceptedAt?: SortOrder
    activeAt?: SortOrder
    endedAt?: SortOrder
    endReason?: SortOrder
    timelineMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallSessionMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    initiatorUserId?: SortOrder
    receiverUserId?: SortOrder
    callType?: SortOrder
    state?: SortOrder
    startedAt?: SortOrder
    ringingAt?: SortOrder
    acceptedAt?: SortOrder
    activeAt?: SortOrder
    endedAt?: SortOrder
    endReason?: SortOrder
    timelineMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumCallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCallTypeWithAggregatesFilter<$PrismaModel> | $Enums.CallType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallTypeFilter<$PrismaModel>
    _max?: NestedEnumCallTypeFilter<$PrismaModel>
  }

  export type EnumCallStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallState | EnumCallStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallStateWithAggregatesFilter<$PrismaModel> | $Enums.CallState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallStateFilter<$PrismaModel>
    _max?: NestedEnumCallStateFilter<$PrismaModel>
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

  export type EnumCallParticipantRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantRole | EnumCallParticipantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantRoleFilter<$PrismaModel> | $Enums.CallParticipantRole
  }

  export type EnumCallParticipantStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantState | EnumCallParticipantStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantStateFilter<$PrismaModel> | $Enums.CallParticipantState
  }

  export type CallSessionScalarRelationFilter = {
    is?: CallSessionWhereInput
    isNot?: CallSessionWhereInput
  }

  export type CallParticipantCallIdUserIdCompoundUniqueInput = {
    callId: string
    userId: string
  }

  export type CallParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    state?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    state?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    callId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    state?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCallParticipantRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantRole | EnumCallParticipantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantRoleWithAggregatesFilter<$PrismaModel> | $Enums.CallParticipantRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallParticipantRoleFilter<$PrismaModel>
    _max?: NestedEnumCallParticipantRoleFilter<$PrismaModel>
  }

  export type EnumCallParticipantStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantState | EnumCallParticipantStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantStateWithAggregatesFilter<$PrismaModel> | $Enums.CallParticipantState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallParticipantStateFilter<$PrismaModel>
    _max?: NestedEnumCallParticipantStateFilter<$PrismaModel>
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

  export type CallParticipantCreateNestedManyWithoutCallInput = {
    create?: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput> | CallParticipantCreateWithoutCallInput[] | CallParticipantUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CallParticipantCreateOrConnectWithoutCallInput | CallParticipantCreateOrConnectWithoutCallInput[]
    createMany?: CallParticipantCreateManyCallInputEnvelope
    connect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
  }

  export type CallParticipantUncheckedCreateNestedManyWithoutCallInput = {
    create?: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput> | CallParticipantCreateWithoutCallInput[] | CallParticipantUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CallParticipantCreateOrConnectWithoutCallInput | CallParticipantCreateOrConnectWithoutCallInput[]
    createMany?: CallParticipantCreateManyCallInputEnvelope
    connect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCallTypeFieldUpdateOperationsInput = {
    set?: $Enums.CallType
  }

  export type EnumCallStateFieldUpdateOperationsInput = {
    set?: $Enums.CallState
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CallParticipantUpdateManyWithoutCallNestedInput = {
    create?: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput> | CallParticipantCreateWithoutCallInput[] | CallParticipantUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CallParticipantCreateOrConnectWithoutCallInput | CallParticipantCreateOrConnectWithoutCallInput[]
    upsert?: CallParticipantUpsertWithWhereUniqueWithoutCallInput | CallParticipantUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: CallParticipantCreateManyCallInputEnvelope
    set?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    disconnect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    delete?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    connect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    update?: CallParticipantUpdateWithWhereUniqueWithoutCallInput | CallParticipantUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: CallParticipantUpdateManyWithWhereWithoutCallInput | CallParticipantUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: CallParticipantScalarWhereInput | CallParticipantScalarWhereInput[]
  }

  export type CallParticipantUncheckedUpdateManyWithoutCallNestedInput = {
    create?: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput> | CallParticipantCreateWithoutCallInput[] | CallParticipantUncheckedCreateWithoutCallInput[]
    connectOrCreate?: CallParticipantCreateOrConnectWithoutCallInput | CallParticipantCreateOrConnectWithoutCallInput[]
    upsert?: CallParticipantUpsertWithWhereUniqueWithoutCallInput | CallParticipantUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: CallParticipantCreateManyCallInputEnvelope
    set?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    disconnect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    delete?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    connect?: CallParticipantWhereUniqueInput | CallParticipantWhereUniqueInput[]
    update?: CallParticipantUpdateWithWhereUniqueWithoutCallInput | CallParticipantUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: CallParticipantUpdateManyWithWhereWithoutCallInput | CallParticipantUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: CallParticipantScalarWhereInput | CallParticipantScalarWhereInput[]
  }

  export type CallSessionCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<CallSessionCreateWithoutParticipantsInput, CallSessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutParticipantsInput
    connect?: CallSessionWhereUniqueInput
  }

  export type EnumCallParticipantRoleFieldUpdateOperationsInput = {
    set?: $Enums.CallParticipantRole
  }

  export type EnumCallParticipantStateFieldUpdateOperationsInput = {
    set?: $Enums.CallParticipantState
  }

  export type CallSessionUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<CallSessionCreateWithoutParticipantsInput, CallSessionUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: CallSessionCreateOrConnectWithoutParticipantsInput
    upsert?: CallSessionUpsertWithoutParticipantsInput
    connect?: CallSessionWhereUniqueInput
    update?: XOR<XOR<CallSessionUpdateToOneWithWhereWithoutParticipantsInput, CallSessionUpdateWithoutParticipantsInput>, CallSessionUncheckedUpdateWithoutParticipantsInput>
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

  export type NestedEnumCallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCallTypeFilter<$PrismaModel> | $Enums.CallType
  }

  export type NestedEnumCallStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CallState | EnumCallStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallStateFilter<$PrismaModel> | $Enums.CallState
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

  export type NestedEnumCallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCallTypeWithAggregatesFilter<$PrismaModel> | $Enums.CallType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallTypeFilter<$PrismaModel>
    _max?: NestedEnumCallTypeFilter<$PrismaModel>
  }

  export type NestedEnumCallStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallState | EnumCallStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallState[] | ListEnumCallStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallStateWithAggregatesFilter<$PrismaModel> | $Enums.CallState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallStateFilter<$PrismaModel>
    _max?: NestedEnumCallStateFilter<$PrismaModel>
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

  export type NestedEnumCallParticipantRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantRole | EnumCallParticipantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantRoleFilter<$PrismaModel> | $Enums.CallParticipantRole
  }

  export type NestedEnumCallParticipantStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantState | EnumCallParticipantStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantStateFilter<$PrismaModel> | $Enums.CallParticipantState
  }

  export type NestedEnumCallParticipantRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantRole | EnumCallParticipantRoleFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantRole[] | ListEnumCallParticipantRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantRoleWithAggregatesFilter<$PrismaModel> | $Enums.CallParticipantRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallParticipantRoleFilter<$PrismaModel>
    _max?: NestedEnumCallParticipantRoleFilter<$PrismaModel>
  }

  export type NestedEnumCallParticipantStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallParticipantState | EnumCallParticipantStateFieldRefInput<$PrismaModel>
    in?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CallParticipantState[] | ListEnumCallParticipantStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCallParticipantStateWithAggregatesFilter<$PrismaModel> | $Enums.CallParticipantState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCallParticipantStateFilter<$PrismaModel>
    _max?: NestedEnumCallParticipantStateFilter<$PrismaModel>
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

  export type CallParticipantCreateWithoutCallInput = {
    id: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallParticipantUncheckedCreateWithoutCallInput = {
    id: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallParticipantCreateOrConnectWithoutCallInput = {
    where: CallParticipantWhereUniqueInput
    create: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput>
  }

  export type CallParticipantCreateManyCallInputEnvelope = {
    data: CallParticipantCreateManyCallInput | CallParticipantCreateManyCallInput[]
    skipDuplicates?: boolean
  }

  export type CallParticipantUpsertWithWhereUniqueWithoutCallInput = {
    where: CallParticipantWhereUniqueInput
    update: XOR<CallParticipantUpdateWithoutCallInput, CallParticipantUncheckedUpdateWithoutCallInput>
    create: XOR<CallParticipantCreateWithoutCallInput, CallParticipantUncheckedCreateWithoutCallInput>
  }

  export type CallParticipantUpdateWithWhereUniqueWithoutCallInput = {
    where: CallParticipantWhereUniqueInput
    data: XOR<CallParticipantUpdateWithoutCallInput, CallParticipantUncheckedUpdateWithoutCallInput>
  }

  export type CallParticipantUpdateManyWithWhereWithoutCallInput = {
    where: CallParticipantScalarWhereInput
    data: XOR<CallParticipantUpdateManyMutationInput, CallParticipantUncheckedUpdateManyWithoutCallInput>
  }

  export type CallParticipantScalarWhereInput = {
    AND?: CallParticipantScalarWhereInput | CallParticipantScalarWhereInput[]
    OR?: CallParticipantScalarWhereInput[]
    NOT?: CallParticipantScalarWhereInput | CallParticipantScalarWhereInput[]
    id?: StringFilter<"CallParticipant"> | string
    callId?: StringFilter<"CallParticipant"> | string
    userId?: StringFilter<"CallParticipant"> | string
    role?: EnumCallParticipantRoleFilter<"CallParticipant"> | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFilter<"CallParticipant"> | $Enums.CallParticipantState
    joinedAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"CallParticipant"> | Date | string | null
    createdAt?: DateTimeFilter<"CallParticipant"> | Date | string
    updatedAt?: DateTimeFilter<"CallParticipant"> | Date | string
  }

  export type CallSessionCreateWithoutParticipantsInput = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType?: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date | string
    ringingAt?: Date | string | null
    acceptedAt?: Date | string | null
    activeAt?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    timelineMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallSessionUncheckedCreateWithoutParticipantsInput = {
    id: string
    chatId: string
    initiatorUserId: string
    receiverUserId: string
    callType?: $Enums.CallType
    state: $Enums.CallState
    startedAt: Date | string
    ringingAt?: Date | string | null
    acceptedAt?: Date | string | null
    activeAt?: Date | string | null
    endedAt?: Date | string | null
    endReason?: string | null
    timelineMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallSessionCreateOrConnectWithoutParticipantsInput = {
    where: CallSessionWhereUniqueInput
    create: XOR<CallSessionCreateWithoutParticipantsInput, CallSessionUncheckedCreateWithoutParticipantsInput>
  }

  export type CallSessionUpsertWithoutParticipantsInput = {
    update: XOR<CallSessionUpdateWithoutParticipantsInput, CallSessionUncheckedUpdateWithoutParticipantsInput>
    create: XOR<CallSessionCreateWithoutParticipantsInput, CallSessionUncheckedCreateWithoutParticipantsInput>
    where?: CallSessionWhereInput
  }

  export type CallSessionUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: CallSessionWhereInput
    data: XOR<CallSessionUpdateWithoutParticipantsInput, CallSessionUncheckedUpdateWithoutParticipantsInput>
  }

  export type CallSessionUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallSessionUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    receiverUserId?: StringFieldUpdateOperationsInput | string
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType
    state?: EnumCallStateFieldUpdateOperationsInput | $Enums.CallState
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ringingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    timelineMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantCreateManyCallInput = {
    id: string
    userId: string
    role: $Enums.CallParticipantRole
    state: $Enums.CallParticipantState
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallParticipantUpdateWithoutCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantUncheckedUpdateWithoutCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallParticipantUncheckedUpdateManyWithoutCallInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumCallParticipantRoleFieldUpdateOperationsInput | $Enums.CallParticipantRole
    state?: EnumCallParticipantStateFieldUpdateOperationsInput | $Enums.CallParticipantState
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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