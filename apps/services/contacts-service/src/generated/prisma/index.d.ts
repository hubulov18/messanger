
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
 * Model ContactBook
 * 
 */
export type ContactBook = $Result.DefaultSelection<Prisma.$ContactBookPayload>
/**
 * Model ImportedContact
 * 
 */
export type ImportedContact = $Result.DefaultSelection<Prisma.$ImportedContactPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ContactBooks
 * const contactBooks = await prisma.contactBook.findMany()
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
   * // Fetch zero or more ContactBooks
   * const contactBooks = await prisma.contactBook.findMany()
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
   * `prisma.contactBook`: Exposes CRUD operations for the **ContactBook** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactBooks
    * const contactBooks = await prisma.contactBook.findMany()
    * ```
    */
  get contactBook(): Prisma.ContactBookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importedContact`: Exposes CRUD operations for the **ImportedContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportedContacts
    * const importedContacts = await prisma.importedContact.findMany()
    * ```
    */
  get importedContact(): Prisma.ImportedContactDelegate<ExtArgs, ClientOptions>;

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
    ContactBook: 'ContactBook',
    ImportedContact: 'ImportedContact',
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
      modelProps: "contactBook" | "importedContact" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ContactBook: {
        payload: Prisma.$ContactBookPayload<ExtArgs>
        fields: Prisma.ContactBookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactBookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactBookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          findFirst: {
            args: Prisma.ContactBookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactBookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          findMany: {
            args: Prisma.ContactBookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>[]
          }
          create: {
            args: Prisma.ContactBookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          createMany: {
            args: Prisma.ContactBookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactBookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>[]
          }
          delete: {
            args: Prisma.ContactBookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          update: {
            args: Prisma.ContactBookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          deleteMany: {
            args: Prisma.ContactBookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactBookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactBookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>[]
          }
          upsert: {
            args: Prisma.ContactBookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactBookPayload>
          }
          aggregate: {
            args: Prisma.ContactBookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactBook>
          }
          groupBy: {
            args: Prisma.ContactBookGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactBookGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactBookCountArgs<ExtArgs>
            result: $Utils.Optional<ContactBookCountAggregateOutputType> | number
          }
        }
      }
      ImportedContact: {
        payload: Prisma.$ImportedContactPayload<ExtArgs>
        fields: Prisma.ImportedContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportedContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportedContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          findFirst: {
            args: Prisma.ImportedContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportedContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          findMany: {
            args: Prisma.ImportedContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>[]
          }
          create: {
            args: Prisma.ImportedContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          createMany: {
            args: Prisma.ImportedContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportedContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>[]
          }
          delete: {
            args: Prisma.ImportedContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          update: {
            args: Prisma.ImportedContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          deleteMany: {
            args: Prisma.ImportedContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportedContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportedContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>[]
          }
          upsert: {
            args: Prisma.ImportedContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportedContactPayload>
          }
          aggregate: {
            args: Prisma.ImportedContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportedContact>
          }
          groupBy: {
            args: Prisma.ImportedContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportedContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportedContactCountArgs<ExtArgs>
            result: $Utils.Optional<ImportedContactCountAggregateOutputType> | number
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
    contactBook?: ContactBookOmit
    importedContact?: ImportedContactOmit
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
   * Count Type ContactBookCountOutputType
   */

  export type ContactBookCountOutputType = {
    importedContacts: number
  }

  export type ContactBookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    importedContacts?: boolean | ContactBookCountOutputTypeCountImportedContactsArgs
  }

  // Custom InputTypes
  /**
   * ContactBookCountOutputType without action
   */
  export type ContactBookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBookCountOutputType
     */
    select?: ContactBookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactBookCountOutputType without action
   */
  export type ContactBookCountOutputTypeCountImportedContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportedContactWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ContactBook
   */

  export type AggregateContactBook = {
    _count: ContactBookCountAggregateOutputType | null
    _avg: ContactBookAvgAggregateOutputType | null
    _sum: ContactBookSumAggregateOutputType | null
    _min: ContactBookMinAggregateOutputType | null
    _max: ContactBookMaxAggregateOutputType | null
  }

  export type ContactBookAvgAggregateOutputType = {
    version: number | null
  }

  export type ContactBookSumAggregateOutputType = {
    version: number | null
  }

  export type ContactBookMinAggregateOutputType = {
    ownerUserId: string | null
    lastImportedAt: Date | null
    version: number | null
  }

  export type ContactBookMaxAggregateOutputType = {
    ownerUserId: string | null
    lastImportedAt: Date | null
    version: number | null
  }

  export type ContactBookCountAggregateOutputType = {
    ownerUserId: number
    lastImportedAt: number
    version: number
    _all: number
  }


  export type ContactBookAvgAggregateInputType = {
    version?: true
  }

  export type ContactBookSumAggregateInputType = {
    version?: true
  }

  export type ContactBookMinAggregateInputType = {
    ownerUserId?: true
    lastImportedAt?: true
    version?: true
  }

  export type ContactBookMaxAggregateInputType = {
    ownerUserId?: true
    lastImportedAt?: true
    version?: true
  }

  export type ContactBookCountAggregateInputType = {
    ownerUserId?: true
    lastImportedAt?: true
    version?: true
    _all?: true
  }

  export type ContactBookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactBook to aggregate.
     */
    where?: ContactBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactBooks to fetch.
     */
    orderBy?: ContactBookOrderByWithRelationInput | ContactBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactBooks
    **/
    _count?: true | ContactBookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactBookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactBookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactBookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactBookMaxAggregateInputType
  }

  export type GetContactBookAggregateType<T extends ContactBookAggregateArgs> = {
        [P in keyof T & keyof AggregateContactBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactBook[P]>
      : GetScalarType<T[P], AggregateContactBook[P]>
  }




  export type ContactBookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactBookWhereInput
    orderBy?: ContactBookOrderByWithAggregationInput | ContactBookOrderByWithAggregationInput[]
    by: ContactBookScalarFieldEnum[] | ContactBookScalarFieldEnum
    having?: ContactBookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactBookCountAggregateInputType | true
    _avg?: ContactBookAvgAggregateInputType
    _sum?: ContactBookSumAggregateInputType
    _min?: ContactBookMinAggregateInputType
    _max?: ContactBookMaxAggregateInputType
  }

  export type ContactBookGroupByOutputType = {
    ownerUserId: string
    lastImportedAt: Date | null
    version: number
    _count: ContactBookCountAggregateOutputType | null
    _avg: ContactBookAvgAggregateOutputType | null
    _sum: ContactBookSumAggregateOutputType | null
    _min: ContactBookMinAggregateOutputType | null
    _max: ContactBookMaxAggregateOutputType | null
  }

  type GetContactBookGroupByPayload<T extends ContactBookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactBookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactBookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactBookGroupByOutputType[P]>
            : GetScalarType<T[P], ContactBookGroupByOutputType[P]>
        }
      >
    >


  export type ContactBookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerUserId?: boolean
    lastImportedAt?: boolean
    version?: boolean
    importedContacts?: boolean | ContactBook$importedContactsArgs<ExtArgs>
    _count?: boolean | ContactBookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactBook"]>

  export type ContactBookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerUserId?: boolean
    lastImportedAt?: boolean
    version?: boolean
  }, ExtArgs["result"]["contactBook"]>

  export type ContactBookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownerUserId?: boolean
    lastImportedAt?: boolean
    version?: boolean
  }, ExtArgs["result"]["contactBook"]>

  export type ContactBookSelectScalar = {
    ownerUserId?: boolean
    lastImportedAt?: boolean
    version?: boolean
  }

  export type ContactBookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ownerUserId" | "lastImportedAt" | "version", ExtArgs["result"]["contactBook"]>
  export type ContactBookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    importedContacts?: boolean | ContactBook$importedContactsArgs<ExtArgs>
    _count?: boolean | ContactBookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactBookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContactBookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContactBookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactBook"
    objects: {
      importedContacts: Prisma.$ImportedContactPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      ownerUserId: string
      lastImportedAt: Date | null
      version: number
    }, ExtArgs["result"]["contactBook"]>
    composites: {}
  }

  type ContactBookGetPayload<S extends boolean | null | undefined | ContactBookDefaultArgs> = $Result.GetResult<Prisma.$ContactBookPayload, S>

  type ContactBookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactBookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactBookCountAggregateInputType | true
    }

  export interface ContactBookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactBook'], meta: { name: 'ContactBook' } }
    /**
     * Find zero or one ContactBook that matches the filter.
     * @param {ContactBookFindUniqueArgs} args - Arguments to find a ContactBook
     * @example
     * // Get one ContactBook
     * const contactBook = await prisma.contactBook.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactBookFindUniqueArgs>(args: SelectSubset<T, ContactBookFindUniqueArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactBook that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactBookFindUniqueOrThrowArgs} args - Arguments to find a ContactBook
     * @example
     * // Get one ContactBook
     * const contactBook = await prisma.contactBook.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactBookFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactBookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactBook that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookFindFirstArgs} args - Arguments to find a ContactBook
     * @example
     * // Get one ContactBook
     * const contactBook = await prisma.contactBook.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactBookFindFirstArgs>(args?: SelectSubset<T, ContactBookFindFirstArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactBook that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookFindFirstOrThrowArgs} args - Arguments to find a ContactBook
     * @example
     * // Get one ContactBook
     * const contactBook = await prisma.contactBook.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactBookFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactBookFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactBooks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactBooks
     * const contactBooks = await prisma.contactBook.findMany()
     * 
     * // Get first 10 ContactBooks
     * const contactBooks = await prisma.contactBook.findMany({ take: 10 })
     * 
     * // Only select the `ownerUserId`
     * const contactBookWithOwnerUserIdOnly = await prisma.contactBook.findMany({ select: { ownerUserId: true } })
     * 
     */
    findMany<T extends ContactBookFindManyArgs>(args?: SelectSubset<T, ContactBookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactBook.
     * @param {ContactBookCreateArgs} args - Arguments to create a ContactBook.
     * @example
     * // Create one ContactBook
     * const ContactBook = await prisma.contactBook.create({
     *   data: {
     *     // ... data to create a ContactBook
     *   }
     * })
     * 
     */
    create<T extends ContactBookCreateArgs>(args: SelectSubset<T, ContactBookCreateArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactBooks.
     * @param {ContactBookCreateManyArgs} args - Arguments to create many ContactBooks.
     * @example
     * // Create many ContactBooks
     * const contactBook = await prisma.contactBook.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactBookCreateManyArgs>(args?: SelectSubset<T, ContactBookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactBooks and returns the data saved in the database.
     * @param {ContactBookCreateManyAndReturnArgs} args - Arguments to create many ContactBooks.
     * @example
     * // Create many ContactBooks
     * const contactBook = await prisma.contactBook.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactBooks and only return the `ownerUserId`
     * const contactBookWithOwnerUserIdOnly = await prisma.contactBook.createManyAndReturn({
     *   select: { ownerUserId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactBookCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactBookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContactBook.
     * @param {ContactBookDeleteArgs} args - Arguments to delete one ContactBook.
     * @example
     * // Delete one ContactBook
     * const ContactBook = await prisma.contactBook.delete({
     *   where: {
     *     // ... filter to delete one ContactBook
     *   }
     * })
     * 
     */
    delete<T extends ContactBookDeleteArgs>(args: SelectSubset<T, ContactBookDeleteArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactBook.
     * @param {ContactBookUpdateArgs} args - Arguments to update one ContactBook.
     * @example
     * // Update one ContactBook
     * const contactBook = await prisma.contactBook.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactBookUpdateArgs>(args: SelectSubset<T, ContactBookUpdateArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactBooks.
     * @param {ContactBookDeleteManyArgs} args - Arguments to filter ContactBooks to delete.
     * @example
     * // Delete a few ContactBooks
     * const { count } = await prisma.contactBook.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactBookDeleteManyArgs>(args?: SelectSubset<T, ContactBookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactBooks
     * const contactBook = await prisma.contactBook.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactBookUpdateManyArgs>(args: SelectSubset<T, ContactBookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactBooks and returns the data updated in the database.
     * @param {ContactBookUpdateManyAndReturnArgs} args - Arguments to update many ContactBooks.
     * @example
     * // Update many ContactBooks
     * const contactBook = await prisma.contactBook.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactBooks and only return the `ownerUserId`
     * const contactBookWithOwnerUserIdOnly = await prisma.contactBook.updateManyAndReturn({
     *   select: { ownerUserId: true },
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
    updateManyAndReturn<T extends ContactBookUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactBookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContactBook.
     * @param {ContactBookUpsertArgs} args - Arguments to update or create a ContactBook.
     * @example
     * // Update or create a ContactBook
     * const contactBook = await prisma.contactBook.upsert({
     *   create: {
     *     // ... data to create a ContactBook
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactBook we want to update
     *   }
     * })
     */
    upsert<T extends ContactBookUpsertArgs>(args: SelectSubset<T, ContactBookUpsertArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactBooks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookCountArgs} args - Arguments to filter ContactBooks to count.
     * @example
     * // Count the number of ContactBooks
     * const count = await prisma.contactBook.count({
     *   where: {
     *     // ... the filter for the ContactBooks we want to count
     *   }
     * })
    **/
    count<T extends ContactBookCountArgs>(
      args?: Subset<T, ContactBookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactBookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactBookAggregateArgs>(args: Subset<T, ContactBookAggregateArgs>): Prisma.PrismaPromise<GetContactBookAggregateType<T>>

    /**
     * Group by ContactBook.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactBookGroupByArgs} args - Group by arguments.
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
      T extends ContactBookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactBookGroupByArgs['orderBy'] }
        : { orderBy?: ContactBookGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactBookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactBook model
   */
  readonly fields: ContactBookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactBook.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactBookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    importedContacts<T extends ContactBook$importedContactsArgs<ExtArgs> = {}>(args?: Subset<T, ContactBook$importedContactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ContactBook model
   */
  interface ContactBookFieldRefs {
    readonly ownerUserId: FieldRef<"ContactBook", 'String'>
    readonly lastImportedAt: FieldRef<"ContactBook", 'DateTime'>
    readonly version: FieldRef<"ContactBook", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ContactBook findUnique
   */
  export type ContactBookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter, which ContactBook to fetch.
     */
    where: ContactBookWhereUniqueInput
  }

  /**
   * ContactBook findUniqueOrThrow
   */
  export type ContactBookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter, which ContactBook to fetch.
     */
    where: ContactBookWhereUniqueInput
  }

  /**
   * ContactBook findFirst
   */
  export type ContactBookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter, which ContactBook to fetch.
     */
    where?: ContactBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactBooks to fetch.
     */
    orderBy?: ContactBookOrderByWithRelationInput | ContactBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactBooks.
     */
    cursor?: ContactBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactBooks.
     */
    distinct?: ContactBookScalarFieldEnum | ContactBookScalarFieldEnum[]
  }

  /**
   * ContactBook findFirstOrThrow
   */
  export type ContactBookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter, which ContactBook to fetch.
     */
    where?: ContactBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactBooks to fetch.
     */
    orderBy?: ContactBookOrderByWithRelationInput | ContactBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactBooks.
     */
    cursor?: ContactBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactBooks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactBooks.
     */
    distinct?: ContactBookScalarFieldEnum | ContactBookScalarFieldEnum[]
  }

  /**
   * ContactBook findMany
   */
  export type ContactBookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter, which ContactBooks to fetch.
     */
    where?: ContactBookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactBooks to fetch.
     */
    orderBy?: ContactBookOrderByWithRelationInput | ContactBookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactBooks.
     */
    cursor?: ContactBookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactBooks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactBooks.
     */
    skip?: number
    distinct?: ContactBookScalarFieldEnum | ContactBookScalarFieldEnum[]
  }

  /**
   * ContactBook create
   */
  export type ContactBookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactBook.
     */
    data: XOR<ContactBookCreateInput, ContactBookUncheckedCreateInput>
  }

  /**
   * ContactBook createMany
   */
  export type ContactBookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactBooks.
     */
    data: ContactBookCreateManyInput | ContactBookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactBook createManyAndReturn
   */
  export type ContactBookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * The data used to create many ContactBooks.
     */
    data: ContactBookCreateManyInput | ContactBookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactBook update
   */
  export type ContactBookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactBook.
     */
    data: XOR<ContactBookUpdateInput, ContactBookUncheckedUpdateInput>
    /**
     * Choose, which ContactBook to update.
     */
    where: ContactBookWhereUniqueInput
  }

  /**
   * ContactBook updateMany
   */
  export type ContactBookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactBooks.
     */
    data: XOR<ContactBookUpdateManyMutationInput, ContactBookUncheckedUpdateManyInput>
    /**
     * Filter which ContactBooks to update
     */
    where?: ContactBookWhereInput
    /**
     * Limit how many ContactBooks to update.
     */
    limit?: number
  }

  /**
   * ContactBook updateManyAndReturn
   */
  export type ContactBookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * The data used to update ContactBooks.
     */
    data: XOR<ContactBookUpdateManyMutationInput, ContactBookUncheckedUpdateManyInput>
    /**
     * Filter which ContactBooks to update
     */
    where?: ContactBookWhereInput
    /**
     * Limit how many ContactBooks to update.
     */
    limit?: number
  }

  /**
   * ContactBook upsert
   */
  export type ContactBookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactBook to update in case it exists.
     */
    where: ContactBookWhereUniqueInput
    /**
     * In case the ContactBook found by the `where` argument doesn't exist, create a new ContactBook with this data.
     */
    create: XOR<ContactBookCreateInput, ContactBookUncheckedCreateInput>
    /**
     * In case the ContactBook was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactBookUpdateInput, ContactBookUncheckedUpdateInput>
  }

  /**
   * ContactBook delete
   */
  export type ContactBookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
    /**
     * Filter which ContactBook to delete.
     */
    where: ContactBookWhereUniqueInput
  }

  /**
   * ContactBook deleteMany
   */
  export type ContactBookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactBooks to delete
     */
    where?: ContactBookWhereInput
    /**
     * Limit how many ContactBooks to delete.
     */
    limit?: number
  }

  /**
   * ContactBook.importedContacts
   */
  export type ContactBook$importedContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    where?: ImportedContactWhereInput
    orderBy?: ImportedContactOrderByWithRelationInput | ImportedContactOrderByWithRelationInput[]
    cursor?: ImportedContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportedContactScalarFieldEnum | ImportedContactScalarFieldEnum[]
  }

  /**
   * ContactBook without action
   */
  export type ContactBookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactBook
     */
    select?: ContactBookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactBook
     */
    omit?: ContactBookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactBookInclude<ExtArgs> | null
  }


  /**
   * Model ImportedContact
   */

  export type AggregateImportedContact = {
    _count: ImportedContactCountAggregateOutputType | null
    _min: ImportedContactMinAggregateOutputType | null
    _max: ImportedContactMaxAggregateOutputType | null
  }

  export type ImportedContactMinAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    normalizedHash: string | null
    phoneNumber: string | null
    displayName: string | null
    matchedUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImportedContactMaxAggregateOutputType = {
    id: string | null
    ownerUserId: string | null
    normalizedHash: string | null
    phoneNumber: string | null
    displayName: string | null
    matchedUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImportedContactCountAggregateOutputType = {
    id: number
    ownerUserId: number
    normalizedHash: number
    phoneNumber: number
    displayName: number
    matchedUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ImportedContactMinAggregateInputType = {
    id?: true
    ownerUserId?: true
    normalizedHash?: true
    phoneNumber?: true
    displayName?: true
    matchedUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImportedContactMaxAggregateInputType = {
    id?: true
    ownerUserId?: true
    normalizedHash?: true
    phoneNumber?: true
    displayName?: true
    matchedUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImportedContactCountAggregateInputType = {
    id?: true
    ownerUserId?: true
    normalizedHash?: true
    phoneNumber?: true
    displayName?: true
    matchedUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ImportedContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportedContact to aggregate.
     */
    where?: ImportedContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportedContacts to fetch.
     */
    orderBy?: ImportedContactOrderByWithRelationInput | ImportedContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportedContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportedContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportedContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportedContacts
    **/
    _count?: true | ImportedContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportedContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportedContactMaxAggregateInputType
  }

  export type GetImportedContactAggregateType<T extends ImportedContactAggregateArgs> = {
        [P in keyof T & keyof AggregateImportedContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportedContact[P]>
      : GetScalarType<T[P], AggregateImportedContact[P]>
  }




  export type ImportedContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportedContactWhereInput
    orderBy?: ImportedContactOrderByWithAggregationInput | ImportedContactOrderByWithAggregationInput[]
    by: ImportedContactScalarFieldEnum[] | ImportedContactScalarFieldEnum
    having?: ImportedContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportedContactCountAggregateInputType | true
    _min?: ImportedContactMinAggregateInputType
    _max?: ImportedContactMaxAggregateInputType
  }

  export type ImportedContactGroupByOutputType = {
    id: string
    ownerUserId: string
    normalizedHash: string
    phoneNumber: string | null
    displayName: string
    matchedUserId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ImportedContactCountAggregateOutputType | null
    _min: ImportedContactMinAggregateOutputType | null
    _max: ImportedContactMaxAggregateOutputType | null
  }

  type GetImportedContactGroupByPayload<T extends ImportedContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportedContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportedContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportedContactGroupByOutputType[P]>
            : GetScalarType<T[P], ImportedContactGroupByOutputType[P]>
        }
      >
    >


  export type ImportedContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    normalizedHash?: boolean
    phoneNumber?: boolean
    displayName?: boolean
    matchedUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importedContact"]>

  export type ImportedContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    normalizedHash?: boolean
    phoneNumber?: boolean
    displayName?: boolean
    matchedUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importedContact"]>

  export type ImportedContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerUserId?: boolean
    normalizedHash?: boolean
    phoneNumber?: boolean
    displayName?: boolean
    matchedUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importedContact"]>

  export type ImportedContactSelectScalar = {
    id?: boolean
    ownerUserId?: boolean
    normalizedHash?: boolean
    phoneNumber?: boolean
    displayName?: boolean
    matchedUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ImportedContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerUserId" | "normalizedHash" | "phoneNumber" | "displayName" | "matchedUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["importedContact"]>
  export type ImportedContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }
  export type ImportedContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }
  export type ImportedContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contactBook?: boolean | ContactBookDefaultArgs<ExtArgs>
  }

  export type $ImportedContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportedContact"
    objects: {
      contactBook: Prisma.$ContactBookPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerUserId: string
      normalizedHash: string
      phoneNumber: string | null
      displayName: string
      matchedUserId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["importedContact"]>
    composites: {}
  }

  type ImportedContactGetPayload<S extends boolean | null | undefined | ImportedContactDefaultArgs> = $Result.GetResult<Prisma.$ImportedContactPayload, S>

  type ImportedContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportedContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportedContactCountAggregateInputType | true
    }

  export interface ImportedContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportedContact'], meta: { name: 'ImportedContact' } }
    /**
     * Find zero or one ImportedContact that matches the filter.
     * @param {ImportedContactFindUniqueArgs} args - Arguments to find a ImportedContact
     * @example
     * // Get one ImportedContact
     * const importedContact = await prisma.importedContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportedContactFindUniqueArgs>(args: SelectSubset<T, ImportedContactFindUniqueArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportedContact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportedContactFindUniqueOrThrowArgs} args - Arguments to find a ImportedContact
     * @example
     * // Get one ImportedContact
     * const importedContact = await prisma.importedContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportedContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportedContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportedContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactFindFirstArgs} args - Arguments to find a ImportedContact
     * @example
     * // Get one ImportedContact
     * const importedContact = await prisma.importedContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportedContactFindFirstArgs>(args?: SelectSubset<T, ImportedContactFindFirstArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportedContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactFindFirstOrThrowArgs} args - Arguments to find a ImportedContact
     * @example
     * // Get one ImportedContact
     * const importedContact = await prisma.importedContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportedContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportedContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportedContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportedContacts
     * const importedContacts = await prisma.importedContact.findMany()
     * 
     * // Get first 10 ImportedContacts
     * const importedContacts = await prisma.importedContact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importedContactWithIdOnly = await prisma.importedContact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportedContactFindManyArgs>(args?: SelectSubset<T, ImportedContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportedContact.
     * @param {ImportedContactCreateArgs} args - Arguments to create a ImportedContact.
     * @example
     * // Create one ImportedContact
     * const ImportedContact = await prisma.importedContact.create({
     *   data: {
     *     // ... data to create a ImportedContact
     *   }
     * })
     * 
     */
    create<T extends ImportedContactCreateArgs>(args: SelectSubset<T, ImportedContactCreateArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportedContacts.
     * @param {ImportedContactCreateManyArgs} args - Arguments to create many ImportedContacts.
     * @example
     * // Create many ImportedContacts
     * const importedContact = await prisma.importedContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportedContactCreateManyArgs>(args?: SelectSubset<T, ImportedContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImportedContacts and returns the data saved in the database.
     * @param {ImportedContactCreateManyAndReturnArgs} args - Arguments to create many ImportedContacts.
     * @example
     * // Create many ImportedContacts
     * const importedContact = await prisma.importedContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImportedContacts and only return the `id`
     * const importedContactWithIdOnly = await prisma.importedContact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportedContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportedContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImportedContact.
     * @param {ImportedContactDeleteArgs} args - Arguments to delete one ImportedContact.
     * @example
     * // Delete one ImportedContact
     * const ImportedContact = await prisma.importedContact.delete({
     *   where: {
     *     // ... filter to delete one ImportedContact
     *   }
     * })
     * 
     */
    delete<T extends ImportedContactDeleteArgs>(args: SelectSubset<T, ImportedContactDeleteArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportedContact.
     * @param {ImportedContactUpdateArgs} args - Arguments to update one ImportedContact.
     * @example
     * // Update one ImportedContact
     * const importedContact = await prisma.importedContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportedContactUpdateArgs>(args: SelectSubset<T, ImportedContactUpdateArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportedContacts.
     * @param {ImportedContactDeleteManyArgs} args - Arguments to filter ImportedContacts to delete.
     * @example
     * // Delete a few ImportedContacts
     * const { count } = await prisma.importedContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportedContactDeleteManyArgs>(args?: SelectSubset<T, ImportedContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportedContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportedContacts
     * const importedContact = await prisma.importedContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportedContactUpdateManyArgs>(args: SelectSubset<T, ImportedContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportedContacts and returns the data updated in the database.
     * @param {ImportedContactUpdateManyAndReturnArgs} args - Arguments to update many ImportedContacts.
     * @example
     * // Update many ImportedContacts
     * const importedContact = await prisma.importedContact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImportedContacts and only return the `id`
     * const importedContactWithIdOnly = await prisma.importedContact.updateManyAndReturn({
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
    updateManyAndReturn<T extends ImportedContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportedContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImportedContact.
     * @param {ImportedContactUpsertArgs} args - Arguments to update or create a ImportedContact.
     * @example
     * // Update or create a ImportedContact
     * const importedContact = await prisma.importedContact.upsert({
     *   create: {
     *     // ... data to create a ImportedContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportedContact we want to update
     *   }
     * })
     */
    upsert<T extends ImportedContactUpsertArgs>(args: SelectSubset<T, ImportedContactUpsertArgs<ExtArgs>>): Prisma__ImportedContactClient<$Result.GetResult<Prisma.$ImportedContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImportedContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactCountArgs} args - Arguments to filter ImportedContacts to count.
     * @example
     * // Count the number of ImportedContacts
     * const count = await prisma.importedContact.count({
     *   where: {
     *     // ... the filter for the ImportedContacts we want to count
     *   }
     * })
    **/
    count<T extends ImportedContactCountArgs>(
      args?: Subset<T, ImportedContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportedContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportedContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ImportedContactAggregateArgs>(args: Subset<T, ImportedContactAggregateArgs>): Prisma.PrismaPromise<GetImportedContactAggregateType<T>>

    /**
     * Group by ImportedContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportedContactGroupByArgs} args - Group by arguments.
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
      T extends ImportedContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportedContactGroupByArgs['orderBy'] }
        : { orderBy?: ImportedContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ImportedContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportedContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportedContact model
   */
  readonly fields: ImportedContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportedContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportedContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contactBook<T extends ContactBookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContactBookDefaultArgs<ExtArgs>>): Prisma__ContactBookClient<$Result.GetResult<Prisma.$ContactBookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ImportedContact model
   */
  interface ImportedContactFieldRefs {
    readonly id: FieldRef<"ImportedContact", 'String'>
    readonly ownerUserId: FieldRef<"ImportedContact", 'String'>
    readonly normalizedHash: FieldRef<"ImportedContact", 'String'>
    readonly phoneNumber: FieldRef<"ImportedContact", 'String'>
    readonly displayName: FieldRef<"ImportedContact", 'String'>
    readonly matchedUserId: FieldRef<"ImportedContact", 'String'>
    readonly createdAt: FieldRef<"ImportedContact", 'DateTime'>
    readonly updatedAt: FieldRef<"ImportedContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImportedContact findUnique
   */
  export type ImportedContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter, which ImportedContact to fetch.
     */
    where: ImportedContactWhereUniqueInput
  }

  /**
   * ImportedContact findUniqueOrThrow
   */
  export type ImportedContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter, which ImportedContact to fetch.
     */
    where: ImportedContactWhereUniqueInput
  }

  /**
   * ImportedContact findFirst
   */
  export type ImportedContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter, which ImportedContact to fetch.
     */
    where?: ImportedContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportedContacts to fetch.
     */
    orderBy?: ImportedContactOrderByWithRelationInput | ImportedContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportedContacts.
     */
    cursor?: ImportedContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportedContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportedContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportedContacts.
     */
    distinct?: ImportedContactScalarFieldEnum | ImportedContactScalarFieldEnum[]
  }

  /**
   * ImportedContact findFirstOrThrow
   */
  export type ImportedContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter, which ImportedContact to fetch.
     */
    where?: ImportedContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportedContacts to fetch.
     */
    orderBy?: ImportedContactOrderByWithRelationInput | ImportedContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportedContacts.
     */
    cursor?: ImportedContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportedContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportedContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportedContacts.
     */
    distinct?: ImportedContactScalarFieldEnum | ImportedContactScalarFieldEnum[]
  }

  /**
   * ImportedContact findMany
   */
  export type ImportedContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter, which ImportedContacts to fetch.
     */
    where?: ImportedContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportedContacts to fetch.
     */
    orderBy?: ImportedContactOrderByWithRelationInput | ImportedContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportedContacts.
     */
    cursor?: ImportedContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportedContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportedContacts.
     */
    skip?: number
    distinct?: ImportedContactScalarFieldEnum | ImportedContactScalarFieldEnum[]
  }

  /**
   * ImportedContact create
   */
  export type ImportedContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * The data needed to create a ImportedContact.
     */
    data: XOR<ImportedContactCreateInput, ImportedContactUncheckedCreateInput>
  }

  /**
   * ImportedContact createMany
   */
  export type ImportedContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportedContacts.
     */
    data: ImportedContactCreateManyInput | ImportedContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImportedContact createManyAndReturn
   */
  export type ImportedContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * The data used to create many ImportedContacts.
     */
    data: ImportedContactCreateManyInput | ImportedContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportedContact update
   */
  export type ImportedContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * The data needed to update a ImportedContact.
     */
    data: XOR<ImportedContactUpdateInput, ImportedContactUncheckedUpdateInput>
    /**
     * Choose, which ImportedContact to update.
     */
    where: ImportedContactWhereUniqueInput
  }

  /**
   * ImportedContact updateMany
   */
  export type ImportedContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportedContacts.
     */
    data: XOR<ImportedContactUpdateManyMutationInput, ImportedContactUncheckedUpdateManyInput>
    /**
     * Filter which ImportedContacts to update
     */
    where?: ImportedContactWhereInput
    /**
     * Limit how many ImportedContacts to update.
     */
    limit?: number
  }

  /**
   * ImportedContact updateManyAndReturn
   */
  export type ImportedContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * The data used to update ImportedContacts.
     */
    data: XOR<ImportedContactUpdateManyMutationInput, ImportedContactUncheckedUpdateManyInput>
    /**
     * Filter which ImportedContacts to update
     */
    where?: ImportedContactWhereInput
    /**
     * Limit how many ImportedContacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportedContact upsert
   */
  export type ImportedContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * The filter to search for the ImportedContact to update in case it exists.
     */
    where: ImportedContactWhereUniqueInput
    /**
     * In case the ImportedContact found by the `where` argument doesn't exist, create a new ImportedContact with this data.
     */
    create: XOR<ImportedContactCreateInput, ImportedContactUncheckedCreateInput>
    /**
     * In case the ImportedContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportedContactUpdateInput, ImportedContactUncheckedUpdateInput>
  }

  /**
   * ImportedContact delete
   */
  export type ImportedContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
    /**
     * Filter which ImportedContact to delete.
     */
    where: ImportedContactWhereUniqueInput
  }

  /**
   * ImportedContact deleteMany
   */
  export type ImportedContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportedContacts to delete
     */
    where?: ImportedContactWhereInput
    /**
     * Limit how many ImportedContacts to delete.
     */
    limit?: number
  }

  /**
   * ImportedContact without action
   */
  export type ImportedContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportedContact
     */
    select?: ImportedContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportedContact
     */
    omit?: ImportedContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportedContactInclude<ExtArgs> | null
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


  export const ContactBookScalarFieldEnum: {
    ownerUserId: 'ownerUserId',
    lastImportedAt: 'lastImportedAt',
    version: 'version'
  };

  export type ContactBookScalarFieldEnum = (typeof ContactBookScalarFieldEnum)[keyof typeof ContactBookScalarFieldEnum]


  export const ImportedContactScalarFieldEnum: {
    id: 'id',
    ownerUserId: 'ownerUserId',
    normalizedHash: 'normalizedHash',
    phoneNumber: 'phoneNumber',
    displayName: 'displayName',
    matchedUserId: 'matchedUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ImportedContactScalarFieldEnum = (typeof ImportedContactScalarFieldEnum)[keyof typeof ImportedContactScalarFieldEnum]


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


  export type ContactBookWhereInput = {
    AND?: ContactBookWhereInput | ContactBookWhereInput[]
    OR?: ContactBookWhereInput[]
    NOT?: ContactBookWhereInput | ContactBookWhereInput[]
    ownerUserId?: StringFilter<"ContactBook"> | string
    lastImportedAt?: DateTimeNullableFilter<"ContactBook"> | Date | string | null
    version?: IntFilter<"ContactBook"> | number
    importedContacts?: ImportedContactListRelationFilter
  }

  export type ContactBookOrderByWithRelationInput = {
    ownerUserId?: SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    importedContacts?: ImportedContactOrderByRelationAggregateInput
  }

  export type ContactBookWhereUniqueInput = Prisma.AtLeast<{
    ownerUserId?: string
    AND?: ContactBookWhereInput | ContactBookWhereInput[]
    OR?: ContactBookWhereInput[]
    NOT?: ContactBookWhereInput | ContactBookWhereInput[]
    lastImportedAt?: DateTimeNullableFilter<"ContactBook"> | Date | string | null
    version?: IntFilter<"ContactBook"> | number
    importedContacts?: ImportedContactListRelationFilter
  }, "ownerUserId">

  export type ContactBookOrderByWithAggregationInput = {
    ownerUserId?: SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    _count?: ContactBookCountOrderByAggregateInput
    _avg?: ContactBookAvgOrderByAggregateInput
    _max?: ContactBookMaxOrderByAggregateInput
    _min?: ContactBookMinOrderByAggregateInput
    _sum?: ContactBookSumOrderByAggregateInput
  }

  export type ContactBookScalarWhereWithAggregatesInput = {
    AND?: ContactBookScalarWhereWithAggregatesInput | ContactBookScalarWhereWithAggregatesInput[]
    OR?: ContactBookScalarWhereWithAggregatesInput[]
    NOT?: ContactBookScalarWhereWithAggregatesInput | ContactBookScalarWhereWithAggregatesInput[]
    ownerUserId?: StringWithAggregatesFilter<"ContactBook"> | string
    lastImportedAt?: DateTimeNullableWithAggregatesFilter<"ContactBook"> | Date | string | null
    version?: IntWithAggregatesFilter<"ContactBook"> | number
  }

  export type ImportedContactWhereInput = {
    AND?: ImportedContactWhereInput | ImportedContactWhereInput[]
    OR?: ImportedContactWhereInput[]
    NOT?: ImportedContactWhereInput | ImportedContactWhereInput[]
    id?: StringFilter<"ImportedContact"> | string
    ownerUserId?: StringFilter<"ImportedContact"> | string
    normalizedHash?: StringFilter<"ImportedContact"> | string
    phoneNumber?: StringNullableFilter<"ImportedContact"> | string | null
    displayName?: StringFilter<"ImportedContact"> | string
    matchedUserId?: StringNullableFilter<"ImportedContact"> | string | null
    createdAt?: DateTimeFilter<"ImportedContact"> | Date | string
    updatedAt?: DateTimeFilter<"ImportedContact"> | Date | string
    contactBook?: XOR<ContactBookScalarRelationFilter, ContactBookWhereInput>
  }

  export type ImportedContactOrderByWithRelationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    normalizedHash?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    displayName?: SortOrder
    matchedUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contactBook?: ContactBookOrderByWithRelationInput
  }

  export type ImportedContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ownerUserId_normalizedHash?: ImportedContactOwnerUserIdNormalizedHashCompoundUniqueInput
    AND?: ImportedContactWhereInput | ImportedContactWhereInput[]
    OR?: ImportedContactWhereInput[]
    NOT?: ImportedContactWhereInput | ImportedContactWhereInput[]
    ownerUserId?: StringFilter<"ImportedContact"> | string
    normalizedHash?: StringFilter<"ImportedContact"> | string
    phoneNumber?: StringNullableFilter<"ImportedContact"> | string | null
    displayName?: StringFilter<"ImportedContact"> | string
    matchedUserId?: StringNullableFilter<"ImportedContact"> | string | null
    createdAt?: DateTimeFilter<"ImportedContact"> | Date | string
    updatedAt?: DateTimeFilter<"ImportedContact"> | Date | string
    contactBook?: XOR<ContactBookScalarRelationFilter, ContactBookWhereInput>
  }, "id" | "ownerUserId_normalizedHash">

  export type ImportedContactOrderByWithAggregationInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    normalizedHash?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    displayName?: SortOrder
    matchedUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ImportedContactCountOrderByAggregateInput
    _max?: ImportedContactMaxOrderByAggregateInput
    _min?: ImportedContactMinOrderByAggregateInput
  }

  export type ImportedContactScalarWhereWithAggregatesInput = {
    AND?: ImportedContactScalarWhereWithAggregatesInput | ImportedContactScalarWhereWithAggregatesInput[]
    OR?: ImportedContactScalarWhereWithAggregatesInput[]
    NOT?: ImportedContactScalarWhereWithAggregatesInput | ImportedContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImportedContact"> | string
    ownerUserId?: StringWithAggregatesFilter<"ImportedContact"> | string
    normalizedHash?: StringWithAggregatesFilter<"ImportedContact"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"ImportedContact"> | string | null
    displayName?: StringWithAggregatesFilter<"ImportedContact"> | string
    matchedUserId?: StringNullableWithAggregatesFilter<"ImportedContact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ImportedContact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ImportedContact"> | Date | string
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

  export type ContactBookCreateInput = {
    ownerUserId: string
    lastImportedAt?: Date | string | null
    version?: number
    importedContacts?: ImportedContactCreateNestedManyWithoutContactBookInput
  }

  export type ContactBookUncheckedCreateInput = {
    ownerUserId: string
    lastImportedAt?: Date | string | null
    version?: number
    importedContacts?: ImportedContactUncheckedCreateNestedManyWithoutContactBookInput
  }

  export type ContactBookUpdateInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    importedContacts?: ImportedContactUpdateManyWithoutContactBookNestedInput
  }

  export type ContactBookUncheckedUpdateInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    importedContacts?: ImportedContactUncheckedUpdateManyWithoutContactBookNestedInput
  }

  export type ContactBookCreateManyInput = {
    ownerUserId: string
    lastImportedAt?: Date | string | null
    version?: number
  }

  export type ContactBookUpdateManyMutationInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
  }

  export type ContactBookUncheckedUpdateManyInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
  }

  export type ImportedContactCreateInput = {
    id: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contactBook: ContactBookCreateNestedOneWithoutImportedContactsInput
  }

  export type ImportedContactUncheckedCreateInput = {
    id: string
    ownerUserId: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportedContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contactBook?: ContactBookUpdateOneRequiredWithoutImportedContactsNestedInput
  }

  export type ImportedContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportedContactCreateManyInput = {
    id: string
    ownerUserId: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportedContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportedContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerUserId?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type ImportedContactListRelationFilter = {
    every?: ImportedContactWhereInput
    some?: ImportedContactWhereInput
    none?: ImportedContactWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ImportedContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactBookCountOrderByAggregateInput = {
    ownerUserId?: SortOrder
    lastImportedAt?: SortOrder
    version?: SortOrder
  }

  export type ContactBookAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ContactBookMaxOrderByAggregateInput = {
    ownerUserId?: SortOrder
    lastImportedAt?: SortOrder
    version?: SortOrder
  }

  export type ContactBookMinOrderByAggregateInput = {
    ownerUserId?: SortOrder
    lastImportedAt?: SortOrder
    version?: SortOrder
  }

  export type ContactBookSumOrderByAggregateInput = {
    version?: SortOrder
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

  export type ContactBookScalarRelationFilter = {
    is?: ContactBookWhereInput
    isNot?: ContactBookWhereInput
  }

  export type ImportedContactOwnerUserIdNormalizedHashCompoundUniqueInput = {
    ownerUserId: string
    normalizedHash: string
  }

  export type ImportedContactCountOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    normalizedHash?: SortOrder
    phoneNumber?: SortOrder
    displayName?: SortOrder
    matchedUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportedContactMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    normalizedHash?: SortOrder
    phoneNumber?: SortOrder
    displayName?: SortOrder
    matchedUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportedContactMinOrderByAggregateInput = {
    id?: SortOrder
    ownerUserId?: SortOrder
    normalizedHash?: SortOrder
    phoneNumber?: SortOrder
    displayName?: SortOrder
    matchedUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type ImportedContactCreateNestedManyWithoutContactBookInput = {
    create?: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput> | ImportedContactCreateWithoutContactBookInput[] | ImportedContactUncheckedCreateWithoutContactBookInput[]
    connectOrCreate?: ImportedContactCreateOrConnectWithoutContactBookInput | ImportedContactCreateOrConnectWithoutContactBookInput[]
    createMany?: ImportedContactCreateManyContactBookInputEnvelope
    connect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
  }

  export type ImportedContactUncheckedCreateNestedManyWithoutContactBookInput = {
    create?: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput> | ImportedContactCreateWithoutContactBookInput[] | ImportedContactUncheckedCreateWithoutContactBookInput[]
    connectOrCreate?: ImportedContactCreateOrConnectWithoutContactBookInput | ImportedContactCreateOrConnectWithoutContactBookInput[]
    createMany?: ImportedContactCreateManyContactBookInputEnvelope
    connect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ImportedContactUpdateManyWithoutContactBookNestedInput = {
    create?: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput> | ImportedContactCreateWithoutContactBookInput[] | ImportedContactUncheckedCreateWithoutContactBookInput[]
    connectOrCreate?: ImportedContactCreateOrConnectWithoutContactBookInput | ImportedContactCreateOrConnectWithoutContactBookInput[]
    upsert?: ImportedContactUpsertWithWhereUniqueWithoutContactBookInput | ImportedContactUpsertWithWhereUniqueWithoutContactBookInput[]
    createMany?: ImportedContactCreateManyContactBookInputEnvelope
    set?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    disconnect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    delete?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    connect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    update?: ImportedContactUpdateWithWhereUniqueWithoutContactBookInput | ImportedContactUpdateWithWhereUniqueWithoutContactBookInput[]
    updateMany?: ImportedContactUpdateManyWithWhereWithoutContactBookInput | ImportedContactUpdateManyWithWhereWithoutContactBookInput[]
    deleteMany?: ImportedContactScalarWhereInput | ImportedContactScalarWhereInput[]
  }

  export type ImportedContactUncheckedUpdateManyWithoutContactBookNestedInput = {
    create?: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput> | ImportedContactCreateWithoutContactBookInput[] | ImportedContactUncheckedCreateWithoutContactBookInput[]
    connectOrCreate?: ImportedContactCreateOrConnectWithoutContactBookInput | ImportedContactCreateOrConnectWithoutContactBookInput[]
    upsert?: ImportedContactUpsertWithWhereUniqueWithoutContactBookInput | ImportedContactUpsertWithWhereUniqueWithoutContactBookInput[]
    createMany?: ImportedContactCreateManyContactBookInputEnvelope
    set?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    disconnect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    delete?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    connect?: ImportedContactWhereUniqueInput | ImportedContactWhereUniqueInput[]
    update?: ImportedContactUpdateWithWhereUniqueWithoutContactBookInput | ImportedContactUpdateWithWhereUniqueWithoutContactBookInput[]
    updateMany?: ImportedContactUpdateManyWithWhereWithoutContactBookInput | ImportedContactUpdateManyWithWhereWithoutContactBookInput[]
    deleteMany?: ImportedContactScalarWhereInput | ImportedContactScalarWhereInput[]
  }

  export type ContactBookCreateNestedOneWithoutImportedContactsInput = {
    create?: XOR<ContactBookCreateWithoutImportedContactsInput, ContactBookUncheckedCreateWithoutImportedContactsInput>
    connectOrCreate?: ContactBookCreateOrConnectWithoutImportedContactsInput
    connect?: ContactBookWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ContactBookUpdateOneRequiredWithoutImportedContactsNestedInput = {
    create?: XOR<ContactBookCreateWithoutImportedContactsInput, ContactBookUncheckedCreateWithoutImportedContactsInput>
    connectOrCreate?: ContactBookCreateOrConnectWithoutImportedContactsInput
    upsert?: ContactBookUpsertWithoutImportedContactsInput
    connect?: ContactBookWhereUniqueInput
    update?: XOR<XOR<ContactBookUpdateToOneWithWhereWithoutImportedContactsInput, ContactBookUpdateWithoutImportedContactsInput>, ContactBookUncheckedUpdateWithoutImportedContactsInput>
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

  export type ImportedContactCreateWithoutContactBookInput = {
    id: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportedContactUncheckedCreateWithoutContactBookInput = {
    id: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportedContactCreateOrConnectWithoutContactBookInput = {
    where: ImportedContactWhereUniqueInput
    create: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput>
  }

  export type ImportedContactCreateManyContactBookInputEnvelope = {
    data: ImportedContactCreateManyContactBookInput | ImportedContactCreateManyContactBookInput[]
    skipDuplicates?: boolean
  }

  export type ImportedContactUpsertWithWhereUniqueWithoutContactBookInput = {
    where: ImportedContactWhereUniqueInput
    update: XOR<ImportedContactUpdateWithoutContactBookInput, ImportedContactUncheckedUpdateWithoutContactBookInput>
    create: XOR<ImportedContactCreateWithoutContactBookInput, ImportedContactUncheckedCreateWithoutContactBookInput>
  }

  export type ImportedContactUpdateWithWhereUniqueWithoutContactBookInput = {
    where: ImportedContactWhereUniqueInput
    data: XOR<ImportedContactUpdateWithoutContactBookInput, ImportedContactUncheckedUpdateWithoutContactBookInput>
  }

  export type ImportedContactUpdateManyWithWhereWithoutContactBookInput = {
    where: ImportedContactScalarWhereInput
    data: XOR<ImportedContactUpdateManyMutationInput, ImportedContactUncheckedUpdateManyWithoutContactBookInput>
  }

  export type ImportedContactScalarWhereInput = {
    AND?: ImportedContactScalarWhereInput | ImportedContactScalarWhereInput[]
    OR?: ImportedContactScalarWhereInput[]
    NOT?: ImportedContactScalarWhereInput | ImportedContactScalarWhereInput[]
    id?: StringFilter<"ImportedContact"> | string
    ownerUserId?: StringFilter<"ImportedContact"> | string
    normalizedHash?: StringFilter<"ImportedContact"> | string
    phoneNumber?: StringNullableFilter<"ImportedContact"> | string | null
    displayName?: StringFilter<"ImportedContact"> | string
    matchedUserId?: StringNullableFilter<"ImportedContact"> | string | null
    createdAt?: DateTimeFilter<"ImportedContact"> | Date | string
    updatedAt?: DateTimeFilter<"ImportedContact"> | Date | string
  }

  export type ContactBookCreateWithoutImportedContactsInput = {
    ownerUserId: string
    lastImportedAt?: Date | string | null
    version?: number
  }

  export type ContactBookUncheckedCreateWithoutImportedContactsInput = {
    ownerUserId: string
    lastImportedAt?: Date | string | null
    version?: number
  }

  export type ContactBookCreateOrConnectWithoutImportedContactsInput = {
    where: ContactBookWhereUniqueInput
    create: XOR<ContactBookCreateWithoutImportedContactsInput, ContactBookUncheckedCreateWithoutImportedContactsInput>
  }

  export type ContactBookUpsertWithoutImportedContactsInput = {
    update: XOR<ContactBookUpdateWithoutImportedContactsInput, ContactBookUncheckedUpdateWithoutImportedContactsInput>
    create: XOR<ContactBookCreateWithoutImportedContactsInput, ContactBookUncheckedCreateWithoutImportedContactsInput>
    where?: ContactBookWhereInput
  }

  export type ContactBookUpdateToOneWithWhereWithoutImportedContactsInput = {
    where?: ContactBookWhereInput
    data: XOR<ContactBookUpdateWithoutImportedContactsInput, ContactBookUncheckedUpdateWithoutImportedContactsInput>
  }

  export type ContactBookUpdateWithoutImportedContactsInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
  }

  export type ContactBookUncheckedUpdateWithoutImportedContactsInput = {
    ownerUserId?: StringFieldUpdateOperationsInput | string
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
  }

  export type ImportedContactCreateManyContactBookInput = {
    id: string
    normalizedHash: string
    phoneNumber?: string | null
    displayName: string
    matchedUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportedContactUpdateWithoutContactBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportedContactUncheckedUpdateWithoutContactBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportedContactUncheckedUpdateManyWithoutContactBookInput = {
    id?: StringFieldUpdateOperationsInput | string
    normalizedHash?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    matchedUserId?: NullableStringFieldUpdateOperationsInput | string | null
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