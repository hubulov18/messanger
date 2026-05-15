
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
 * Model Chat
 * 
 */
export type Chat = $Result.DefaultSelection<Prisma.$ChatPayload>
/**
 * Model ChatMember
 * 
 */
export type ChatMember = $Result.DefaultSelection<Prisma.$ChatMemberPayload>
/**
 * Model ChatPermission
 * 
 */
export type ChatPermission = $Result.DefaultSelection<Prisma.$ChatPermissionPayload>
/**
 * Model InviteLink
 * 
 */
export type InviteLink = $Result.DefaultSelection<Prisma.$InviteLinkPayload>
/**
 * Model JoinRequest
 * 
 */
export type JoinRequest = $Result.DefaultSelection<Prisma.$JoinRequestPayload>
/**
 * Model ModerationLog
 * 
 */
export type ModerationLog = $Result.DefaultSelection<Prisma.$ModerationLogPayload>
/**
 * Model ChatPin
 * 
 */
export type ChatPin = $Result.DefaultSelection<Prisma.$ChatPinPayload>
/**
 * Model ChatMute
 * 
 */
export type ChatMute = $Result.DefaultSelection<Prisma.$ChatMutePayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>
/**
 * Model ChatMembershipProjection
 * 
 */
export type ChatMembershipProjection = $Result.DefaultSelection<Prisma.$ChatMembershipProjectionPayload>
/**
 * Model ChatMembershipProjectionEvent
 * 
 */
export type ChatMembershipProjectionEvent = $Result.DefaultSelection<Prisma.$ChatMembershipProjectionEventPayload>
/**
 * Model ChatMembershipProjectionOffset
 * 
 */
export type ChatMembershipProjectionOffset = $Result.DefaultSelection<Prisma.$ChatMembershipProjectionOffsetPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ChatType: {
  direct: 'direct',
  group: 'group',
  channel: 'channel'
};

export type ChatType = (typeof ChatType)[keyof typeof ChatType]


export const ChatMemberRole: {
  owner: 'owner',
  admin: 'admin',
  member: 'member'
};

export type ChatMemberRole = (typeof ChatMemberRole)[keyof typeof ChatMemberRole]


export const ChatMemberStatus: {
  active: 'active',
  invited: 'invited',
  requested: 'requested',
  banned: 'banned',
  left: 'left',
  removed: 'removed'
};

export type ChatMemberStatus = (typeof ChatMemberStatus)[keyof typeof ChatMemberStatus]


export const JoinMode: {
  open: 'open',
  approval_required: 'approval_required',
  invite_only: 'invite_only'
};

export type JoinMode = (typeof JoinMode)[keyof typeof JoinMode]


export const HistoryVisibility: {
  visible_to_all: 'visible_to_all',
  visible_from_join: 'visible_from_join'
};

export type HistoryVisibility = (typeof HistoryVisibility)[keyof typeof HistoryVisibility]


export const JoinRequestStatus: {
  pending: 'pending',
  approved: 'approved',
  declined: 'declined'
};

export type JoinRequestStatus = (typeof JoinRequestStatus)[keyof typeof JoinRequestStatus]


export const OutboxEventStatus: {
  pending: 'pending',
  published: 'published',
  failed: 'failed'
};

export type OutboxEventStatus = (typeof OutboxEventStatus)[keyof typeof OutboxEventStatus]

}

export type ChatType = $Enums.ChatType

export const ChatType: typeof $Enums.ChatType

export type ChatMemberRole = $Enums.ChatMemberRole

export const ChatMemberRole: typeof $Enums.ChatMemberRole

export type ChatMemberStatus = $Enums.ChatMemberStatus

export const ChatMemberStatus: typeof $Enums.ChatMemberStatus

export type JoinMode = $Enums.JoinMode

export const JoinMode: typeof $Enums.JoinMode

export type HistoryVisibility = $Enums.HistoryVisibility

export const HistoryVisibility: typeof $Enums.HistoryVisibility

export type JoinRequestStatus = $Enums.JoinRequestStatus

export const JoinRequestStatus: typeof $Enums.JoinRequestStatus

export type OutboxEventStatus = $Enums.OutboxEventStatus

export const OutboxEventStatus: typeof $Enums.OutboxEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Chats
 * const chats = await prisma.chat.findMany()
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
   * // Fetch zero or more Chats
   * const chats = await prisma.chat.findMany()
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
   * `prisma.chat`: Exposes CRUD operations for the **Chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.ChatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMember`: Exposes CRUD operations for the **ChatMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMembers
    * const chatMembers = await prisma.chatMember.findMany()
    * ```
    */
  get chatMember(): Prisma.ChatMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatPermission`: Exposes CRUD operations for the **ChatPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatPermissions
    * const chatPermissions = await prisma.chatPermission.findMany()
    * ```
    */
  get chatPermission(): Prisma.ChatPermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inviteLink`: Exposes CRUD operations for the **InviteLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InviteLinks
    * const inviteLinks = await prisma.inviteLink.findMany()
    * ```
    */
  get inviteLink(): Prisma.InviteLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.joinRequest`: Exposes CRUD operations for the **JoinRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JoinRequests
    * const joinRequests = await prisma.joinRequest.findMany()
    * ```
    */
  get joinRequest(): Prisma.JoinRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moderationLog`: Exposes CRUD operations for the **ModerationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModerationLogs
    * const moderationLogs = await prisma.moderationLog.findMany()
    * ```
    */
  get moderationLog(): Prisma.ModerationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatPin`: Exposes CRUD operations for the **ChatPin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatPins
    * const chatPins = await prisma.chatPin.findMany()
    * ```
    */
  get chatPin(): Prisma.ChatPinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMute`: Exposes CRUD operations for the **ChatMute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMutes
    * const chatMutes = await prisma.chatMute.findMany()
    * ```
    */
  get chatMute(): Prisma.ChatMuteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMembershipProjection`: Exposes CRUD operations for the **ChatMembershipProjection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMembershipProjections
    * const chatMembershipProjections = await prisma.chatMembershipProjection.findMany()
    * ```
    */
  get chatMembershipProjection(): Prisma.ChatMembershipProjectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMembershipProjectionEvent`: Exposes CRUD operations for the **ChatMembershipProjectionEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMembershipProjectionEvents
    * const chatMembershipProjectionEvents = await prisma.chatMembershipProjectionEvent.findMany()
    * ```
    */
  get chatMembershipProjectionEvent(): Prisma.ChatMembershipProjectionEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMembershipProjectionOffset`: Exposes CRUD operations for the **ChatMembershipProjectionOffset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMembershipProjectionOffsets
    * const chatMembershipProjectionOffsets = await prisma.chatMembershipProjectionOffset.findMany()
    * ```
    */
  get chatMembershipProjectionOffset(): Prisma.ChatMembershipProjectionOffsetDelegate<ExtArgs, ClientOptions>;
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
    Chat: 'Chat',
    ChatMember: 'ChatMember',
    ChatPermission: 'ChatPermission',
    InviteLink: 'InviteLink',
    JoinRequest: 'JoinRequest',
    ModerationLog: 'ModerationLog',
    ChatPin: 'ChatPin',
    ChatMute: 'ChatMute',
    OutboxEvent: 'OutboxEvent',
    ChatMembershipProjection: 'ChatMembershipProjection',
    ChatMembershipProjectionEvent: 'ChatMembershipProjectionEvent',
    ChatMembershipProjectionOffset: 'ChatMembershipProjectionOffset'
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
      modelProps: "chat" | "chatMember" | "chatPermission" | "inviteLink" | "joinRequest" | "moderationLog" | "chatPin" | "chatMute" | "outboxEvent" | "chatMembershipProjection" | "chatMembershipProjectionEvent" | "chatMembershipProjectionOffset"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Chat: {
        payload: Prisma.$ChatPayload<ExtArgs>
        fields: Prisma.ChatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findFirst: {
            args: Prisma.ChatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findMany: {
            args: Prisma.ChatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          create: {
            args: Prisma.ChatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          createMany: {
            args: Prisma.ChatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          delete: {
            args: Prisma.ChatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          update: {
            args: Prisma.ChatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          deleteMany: {
            args: Prisma.ChatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          upsert: {
            args: Prisma.ChatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat>
          }
          groupBy: {
            args: Prisma.ChatGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatCountArgs<ExtArgs>
            result: $Utils.Optional<ChatCountAggregateOutputType> | number
          }
        }
      }
      ChatMember: {
        payload: Prisma.$ChatMemberPayload<ExtArgs>
        fields: Prisma.ChatMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          findFirst: {
            args: Prisma.ChatMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          findMany: {
            args: Prisma.ChatMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          create: {
            args: Prisma.ChatMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          createMany: {
            args: Prisma.ChatMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          delete: {
            args: Prisma.ChatMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          update: {
            args: Prisma.ChatMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          deleteMany: {
            args: Prisma.ChatMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>[]
          }
          upsert: {
            args: Prisma.ChatMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMemberPayload>
          }
          aggregate: {
            args: Prisma.ChatMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMember>
          }
          groupBy: {
            args: Prisma.ChatMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMemberCountAggregateOutputType> | number
          }
        }
      }
      ChatPermission: {
        payload: Prisma.$ChatPermissionPayload<ExtArgs>
        fields: Prisma.ChatPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          findFirst: {
            args: Prisma.ChatPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          findMany: {
            args: Prisma.ChatPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>[]
          }
          create: {
            args: Prisma.ChatPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          createMany: {
            args: Prisma.ChatPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>[]
          }
          delete: {
            args: Prisma.ChatPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          update: {
            args: Prisma.ChatPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          deleteMany: {
            args: Prisma.ChatPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>[]
          }
          upsert: {
            args: Prisma.ChatPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPermissionPayload>
          }
          aggregate: {
            args: Prisma.ChatPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatPermission>
          }
          groupBy: {
            args: Prisma.ChatPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<ChatPermissionCountAggregateOutputType> | number
          }
        }
      }
      InviteLink: {
        payload: Prisma.$InviteLinkPayload<ExtArgs>
        fields: Prisma.InviteLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InviteLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InviteLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          findFirst: {
            args: Prisma.InviteLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InviteLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          findMany: {
            args: Prisma.InviteLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>[]
          }
          create: {
            args: Prisma.InviteLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          createMany: {
            args: Prisma.InviteLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InviteLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>[]
          }
          delete: {
            args: Prisma.InviteLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          update: {
            args: Prisma.InviteLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          deleteMany: {
            args: Prisma.InviteLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InviteLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InviteLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>[]
          }
          upsert: {
            args: Prisma.InviteLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InviteLinkPayload>
          }
          aggregate: {
            args: Prisma.InviteLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInviteLink>
          }
          groupBy: {
            args: Prisma.InviteLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<InviteLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.InviteLinkCountArgs<ExtArgs>
            result: $Utils.Optional<InviteLinkCountAggregateOutputType> | number
          }
        }
      }
      JoinRequest: {
        payload: Prisma.$JoinRequestPayload<ExtArgs>
        fields: Prisma.JoinRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JoinRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JoinRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          findFirst: {
            args: Prisma.JoinRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JoinRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          findMany: {
            args: Prisma.JoinRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>[]
          }
          create: {
            args: Prisma.JoinRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          createMany: {
            args: Prisma.JoinRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JoinRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>[]
          }
          delete: {
            args: Prisma.JoinRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          update: {
            args: Prisma.JoinRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          deleteMany: {
            args: Prisma.JoinRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JoinRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JoinRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>[]
          }
          upsert: {
            args: Prisma.JoinRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoinRequestPayload>
          }
          aggregate: {
            args: Prisma.JoinRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJoinRequest>
          }
          groupBy: {
            args: Prisma.JoinRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<JoinRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.JoinRequestCountArgs<ExtArgs>
            result: $Utils.Optional<JoinRequestCountAggregateOutputType> | number
          }
        }
      }
      ModerationLog: {
        payload: Prisma.$ModerationLogPayload<ExtArgs>
        fields: Prisma.ModerationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModerationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModerationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          findFirst: {
            args: Prisma.ModerationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModerationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          findMany: {
            args: Prisma.ModerationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>[]
          }
          create: {
            args: Prisma.ModerationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          createMany: {
            args: Prisma.ModerationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModerationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>[]
          }
          delete: {
            args: Prisma.ModerationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          update: {
            args: Prisma.ModerationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          deleteMany: {
            args: Prisma.ModerationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModerationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModerationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>[]
          }
          upsert: {
            args: Prisma.ModerationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationLogPayload>
          }
          aggregate: {
            args: Prisma.ModerationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModerationLog>
          }
          groupBy: {
            args: Prisma.ModerationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModerationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModerationLogCountArgs<ExtArgs>
            result: $Utils.Optional<ModerationLogCountAggregateOutputType> | number
          }
        }
      }
      ChatPin: {
        payload: Prisma.$ChatPinPayload<ExtArgs>
        fields: Prisma.ChatPinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatPinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatPinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          findFirst: {
            args: Prisma.ChatPinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatPinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          findMany: {
            args: Prisma.ChatPinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>[]
          }
          create: {
            args: Prisma.ChatPinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          createMany: {
            args: Prisma.ChatPinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatPinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>[]
          }
          delete: {
            args: Prisma.ChatPinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          update: {
            args: Prisma.ChatPinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          deleteMany: {
            args: Prisma.ChatPinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatPinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatPinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>[]
          }
          upsert: {
            args: Prisma.ChatPinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPinPayload>
          }
          aggregate: {
            args: Prisma.ChatPinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatPin>
          }
          groupBy: {
            args: Prisma.ChatPinGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatPinGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatPinCountArgs<ExtArgs>
            result: $Utils.Optional<ChatPinCountAggregateOutputType> | number
          }
        }
      }
      ChatMute: {
        payload: Prisma.$ChatMutePayload<ExtArgs>
        fields: Prisma.ChatMuteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMuteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMuteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          findFirst: {
            args: Prisma.ChatMuteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMuteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          findMany: {
            args: Prisma.ChatMuteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>[]
          }
          create: {
            args: Prisma.ChatMuteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          createMany: {
            args: Prisma.ChatMuteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMuteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>[]
          }
          delete: {
            args: Prisma.ChatMuteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          update: {
            args: Prisma.ChatMuteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          deleteMany: {
            args: Prisma.ChatMuteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMuteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMuteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>[]
          }
          upsert: {
            args: Prisma.ChatMuteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMutePayload>
          }
          aggregate: {
            args: Prisma.ChatMuteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMute>
          }
          groupBy: {
            args: Prisma.ChatMuteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMuteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMuteCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMuteCountAggregateOutputType> | number
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
      ChatMembershipProjection: {
        payload: Prisma.$ChatMembershipProjectionPayload<ExtArgs>
        fields: Prisma.ChatMembershipProjectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMembershipProjectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMembershipProjectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          findFirst: {
            args: Prisma.ChatMembershipProjectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMembershipProjectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          findMany: {
            args: Prisma.ChatMembershipProjectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>[]
          }
          create: {
            args: Prisma.ChatMembershipProjectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          createMany: {
            args: Prisma.ChatMembershipProjectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMembershipProjectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>[]
          }
          delete: {
            args: Prisma.ChatMembershipProjectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          update: {
            args: Prisma.ChatMembershipProjectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          deleteMany: {
            args: Prisma.ChatMembershipProjectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMembershipProjectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMembershipProjectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>[]
          }
          upsert: {
            args: Prisma.ChatMembershipProjectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionPayload>
          }
          aggregate: {
            args: Prisma.ChatMembershipProjectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMembershipProjection>
          }
          groupBy: {
            args: Prisma.ChatMembershipProjectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMembershipProjectionCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionCountAggregateOutputType> | number
          }
        }
      }
      ChatMembershipProjectionEvent: {
        payload: Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>
        fields: Prisma.ChatMembershipProjectionEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMembershipProjectionEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMembershipProjectionEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          findFirst: {
            args: Prisma.ChatMembershipProjectionEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMembershipProjectionEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          findMany: {
            args: Prisma.ChatMembershipProjectionEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>[]
          }
          create: {
            args: Prisma.ChatMembershipProjectionEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          createMany: {
            args: Prisma.ChatMembershipProjectionEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMembershipProjectionEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>[]
          }
          delete: {
            args: Prisma.ChatMembershipProjectionEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          update: {
            args: Prisma.ChatMembershipProjectionEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          deleteMany: {
            args: Prisma.ChatMembershipProjectionEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMembershipProjectionEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMembershipProjectionEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>[]
          }
          upsert: {
            args: Prisma.ChatMembershipProjectionEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionEventPayload>
          }
          aggregate: {
            args: Prisma.ChatMembershipProjectionEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMembershipProjectionEvent>
          }
          groupBy: {
            args: Prisma.ChatMembershipProjectionEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMembershipProjectionEventCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionEventCountAggregateOutputType> | number
          }
        }
      }
      ChatMembershipProjectionOffset: {
        payload: Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>
        fields: Prisma.ChatMembershipProjectionOffsetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMembershipProjectionOffsetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMembershipProjectionOffsetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          findFirst: {
            args: Prisma.ChatMembershipProjectionOffsetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMembershipProjectionOffsetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          findMany: {
            args: Prisma.ChatMembershipProjectionOffsetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>[]
          }
          create: {
            args: Prisma.ChatMembershipProjectionOffsetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          createMany: {
            args: Prisma.ChatMembershipProjectionOffsetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMembershipProjectionOffsetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>[]
          }
          delete: {
            args: Prisma.ChatMembershipProjectionOffsetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          update: {
            args: Prisma.ChatMembershipProjectionOffsetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          deleteMany: {
            args: Prisma.ChatMembershipProjectionOffsetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMembershipProjectionOffsetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMembershipProjectionOffsetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>[]
          }
          upsert: {
            args: Prisma.ChatMembershipProjectionOffsetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMembershipProjectionOffsetPayload>
          }
          aggregate: {
            args: Prisma.ChatMembershipProjectionOffsetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMembershipProjectionOffset>
          }
          groupBy: {
            args: Prisma.ChatMembershipProjectionOffsetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionOffsetGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMembershipProjectionOffsetCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMembershipProjectionOffsetCountAggregateOutputType> | number
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
    chat?: ChatOmit
    chatMember?: ChatMemberOmit
    chatPermission?: ChatPermissionOmit
    inviteLink?: InviteLinkOmit
    joinRequest?: JoinRequestOmit
    moderationLog?: ModerationLogOmit
    chatPin?: ChatPinOmit
    chatMute?: ChatMuteOmit
    outboxEvent?: OutboxEventOmit
    chatMembershipProjection?: ChatMembershipProjectionOmit
    chatMembershipProjectionEvent?: ChatMembershipProjectionEventOmit
    chatMembershipProjectionOffset?: ChatMembershipProjectionOffsetOmit
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
   * Count Type ChatCountOutputType
   */

  export type ChatCountOutputType = {
    members: number
    inviteLinks: number
    chatPins: number
    chatMutes: number
    joinRequests: number
    moderationLogs: number
  }

  export type ChatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ChatCountOutputTypeCountMembersArgs
    inviteLinks?: boolean | ChatCountOutputTypeCountInviteLinksArgs
    chatPins?: boolean | ChatCountOutputTypeCountChatPinsArgs
    chatMutes?: boolean | ChatCountOutputTypeCountChatMutesArgs
    joinRequests?: boolean | ChatCountOutputTypeCountJoinRequestsArgs
    moderationLogs?: boolean | ChatCountOutputTypeCountModerationLogsArgs
  }

  // Custom InputTypes
  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatCountOutputType
     */
    select?: ChatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMemberWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountInviteLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InviteLinkWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountChatPinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatPinWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountChatMutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMuteWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountJoinRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoinRequestWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountModerationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationLogWhereInput
  }


  /**
   * Count Type InviteLinkCountOutputType
   */

  export type InviteLinkCountOutputType = {
    joinRequests: number
  }

  export type InviteLinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    joinRequests?: boolean | InviteLinkCountOutputTypeCountJoinRequestsArgs
  }

  // Custom InputTypes
  /**
   * InviteLinkCountOutputType without action
   */
  export type InviteLinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLinkCountOutputType
     */
    select?: InviteLinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InviteLinkCountOutputType without action
   */
  export type InviteLinkCountOutputTypeCountJoinRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoinRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatMinAggregateOutputType = {
    id: string | null
    type: $Enums.ChatType | null
    title: string | null
    description: string | null
    photoMediaId: string | null
    createdByUserId: string | null
    isArchived: boolean | null
    joinMode: $Enums.JoinMode | null
    isPublic: boolean | null
    historyVisibility: $Enums.HistoryVisibility | null
    allowMemberInvites: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ChatType | null
    title: string | null
    description: string | null
    photoMediaId: string | null
    createdByUserId: string | null
    isArchived: boolean | null
    joinMode: $Enums.JoinMode | null
    isPublic: boolean | null
    historyVisibility: $Enums.HistoryVisibility | null
    allowMemberInvites: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    type: number
    title: number
    description: number
    photoMediaId: number
    createdByUserId: number
    isArchived: number
    joinMode: number
    isPublic: number
    historyVisibility: number
    allowMemberInvites: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMinAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    photoMediaId?: true
    createdByUserId?: true
    isArchived?: true
    joinMode?: true
    isPublic?: true
    historyVisibility?: true
    allowMemberInvites?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    photoMediaId?: true
    createdByUserId?: true
    isArchived?: true
    joinMode?: true
    isPublic?: true
    historyVisibility?: true
    allowMemberInvites?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    type?: true
    title?: true
    description?: true
    photoMediaId?: true
    createdByUserId?: true
    isArchived?: true
    joinMode?: true
    isPublic?: true
    historyVisibility?: true
    allowMemberInvites?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chat to aggregate.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type ChatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWhereInput
    orderBy?: ChatOrderByWithAggregationInput | ChatOrderByWithAggregationInput[]
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum
    having?: ChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: string
    type: $Enums.ChatType
    title: string | null
    description: string | null
    photoMediaId: string | null
    createdByUserId: string
    isArchived: boolean
    joinMode: $Enums.JoinMode
    isPublic: boolean
    historyVisibility: $Enums.HistoryVisibility
    allowMemberInvites: boolean
    createdAt: Date
    updatedAt: Date
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends ChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type ChatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    photoMediaId?: boolean
    createdByUserId?: boolean
    isArchived?: boolean
    joinMode?: boolean
    isPublic?: boolean
    historyVisibility?: boolean
    allowMemberInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Chat$membersArgs<ExtArgs>
    permissions?: boolean | Chat$permissionsArgs<ExtArgs>
    inviteLinks?: boolean | Chat$inviteLinksArgs<ExtArgs>
    chatPins?: boolean | Chat$chatPinsArgs<ExtArgs>
    chatMutes?: boolean | Chat$chatMutesArgs<ExtArgs>
    joinRequests?: boolean | Chat$joinRequestsArgs<ExtArgs>
    moderationLogs?: boolean | Chat$moderationLogsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    photoMediaId?: boolean
    createdByUserId?: boolean
    isArchived?: boolean
    joinMode?: boolean
    isPublic?: boolean
    historyVisibility?: boolean
    allowMemberInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    photoMediaId?: boolean
    createdByUserId?: boolean
    isArchived?: boolean
    joinMode?: boolean
    isPublic?: boolean
    historyVisibility?: boolean
    allowMemberInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectScalar = {
    id?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    photoMediaId?: boolean
    createdByUserId?: boolean
    isArchived?: boolean
    joinMode?: boolean
    isPublic?: boolean
    historyVisibility?: boolean
    allowMemberInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "title" | "description" | "photoMediaId" | "createdByUserId" | "isArchived" | "joinMode" | "isPublic" | "historyVisibility" | "allowMemberInvites" | "createdAt" | "updatedAt", ExtArgs["result"]["chat"]>
  export type ChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Chat$membersArgs<ExtArgs>
    permissions?: boolean | Chat$permissionsArgs<ExtArgs>
    inviteLinks?: boolean | Chat$inviteLinksArgs<ExtArgs>
    chatPins?: boolean | Chat$chatPinsArgs<ExtArgs>
    chatMutes?: boolean | Chat$chatMutesArgs<ExtArgs>
    joinRequests?: boolean | Chat$joinRequestsArgs<ExtArgs>
    moderationLogs?: boolean | Chat$moderationLogsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chat"
    objects: {
      members: Prisma.$ChatMemberPayload<ExtArgs>[]
      permissions: Prisma.$ChatPermissionPayload<ExtArgs> | null
      inviteLinks: Prisma.$InviteLinkPayload<ExtArgs>[]
      chatPins: Prisma.$ChatPinPayload<ExtArgs>[]
      chatMutes: Prisma.$ChatMutePayload<ExtArgs>[]
      joinRequests: Prisma.$JoinRequestPayload<ExtArgs>[]
      moderationLogs: Prisma.$ModerationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ChatType
      title: string | null
      description: string | null
      photoMediaId: string | null
      createdByUserId: string
      isArchived: boolean
      joinMode: $Enums.JoinMode
      isPublic: boolean
      historyVisibility: $Enums.HistoryVisibility
      allowMemberInvites: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chat"]>
    composites: {}
  }

  type ChatGetPayload<S extends boolean | null | undefined | ChatDefaultArgs> = $Result.GetResult<Prisma.$ChatPayload, S>

  type ChatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatCountAggregateInputType | true
    }

  export interface ChatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chat'], meta: { name: 'Chat' } }
    /**
     * Find zero or one Chat that matches the filter.
     * @param {ChatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatFindUniqueArgs>(args: SelectSubset<T, ChatFindUniqueArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatFindFirstArgs>(args?: SelectSubset<T, ChatFindFirstArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatFindManyArgs>(args?: SelectSubset<T, ChatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat.
     * @param {ChatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
     */
    create<T extends ChatCreateArgs>(args: SelectSubset<T, ChatCreateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {ChatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatCreateManyArgs>(args?: SelectSubset<T, ChatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {ChatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat.
     * @param {ChatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
     */
    delete<T extends ChatDeleteArgs>(args: SelectSubset<T, ChatDeleteArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat.
     * @param {ChatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatUpdateArgs>(args: SelectSubset<T, ChatUpdateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {ChatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatDeleteManyArgs>(args?: SelectSubset<T, ChatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatUpdateManyArgs>(args: SelectSubset<T, ChatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {ChatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat.
     * @param {ChatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends ChatUpsertArgs>(args: SelectSubset<T, ChatUpsertArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends ChatCountArgs>(
      args?: Subset<T, ChatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatGroupByArgs} args - Group by arguments.
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
      T extends ChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatGroupByArgs['orderBy'] }
        : { orderBy?: ChatGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chat model
   */
  readonly fields: ChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Chat$membersArgs<ExtArgs> = {}>(args?: Subset<T, Chat$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Chat$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Chat$permissionsArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    inviteLinks<T extends Chat$inviteLinksArgs<ExtArgs> = {}>(args?: Subset<T, Chat$inviteLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatPins<T extends Chat$chatPinsArgs<ExtArgs> = {}>(args?: Subset<T, Chat$chatPinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatMutes<T extends Chat$chatMutesArgs<ExtArgs> = {}>(args?: Subset<T, Chat$chatMutesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    joinRequests<T extends Chat$joinRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Chat$joinRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    moderationLogs<T extends Chat$moderationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Chat$moderationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Chat model
   */
  interface ChatFieldRefs {
    readonly id: FieldRef<"Chat", 'String'>
    readonly type: FieldRef<"Chat", 'ChatType'>
    readonly title: FieldRef<"Chat", 'String'>
    readonly description: FieldRef<"Chat", 'String'>
    readonly photoMediaId: FieldRef<"Chat", 'String'>
    readonly createdByUserId: FieldRef<"Chat", 'String'>
    readonly isArchived: FieldRef<"Chat", 'Boolean'>
    readonly joinMode: FieldRef<"Chat", 'JoinMode'>
    readonly isPublic: FieldRef<"Chat", 'Boolean'>
    readonly historyVisibility: FieldRef<"Chat", 'HistoryVisibility'>
    readonly allowMemberInvites: FieldRef<"Chat", 'Boolean'>
    readonly createdAt: FieldRef<"Chat", 'DateTime'>
    readonly updatedAt: FieldRef<"Chat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chat findUnique
   */
  export type ChatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findUniqueOrThrow
   */
  export type ChatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findFirst
   */
  export type ChatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findFirstOrThrow
   */
  export type ChatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findMany
   */
  export type ChatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat create
   */
  export type ChatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to create a Chat.
     */
    data: XOR<ChatCreateInput, ChatUncheckedCreateInput>
  }

  /**
   * Chat createMany
   */
  export type ChatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chat createManyAndReturn
   */
  export type ChatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chat update
   */
  export type ChatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to update a Chat.
     */
    data: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
    /**
     * Choose, which Chat to update.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat updateMany
   */
  export type ChatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chat updateManyAndReturn
   */
  export type ChatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chat upsert
   */
  export type ChatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The filter to search for the Chat to update in case it exists.
     */
    where: ChatWhereUniqueInput
    /**
     * In case the Chat found by the `where` argument doesn't exist, create a new Chat with this data.
     */
    create: XOR<ChatCreateInput, ChatUncheckedCreateInput>
    /**
     * In case the Chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
  }

  /**
   * Chat delete
   */
  export type ChatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter which Chat to delete.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat deleteMany
   */
  export type ChatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chats to delete
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to delete.
     */
    limit?: number
  }

  /**
   * Chat.members
   */
  export type Chat$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    where?: ChatMemberWhereInput
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    cursor?: ChatMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * Chat.permissions
   */
  export type Chat$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    where?: ChatPermissionWhereInput
  }

  /**
   * Chat.inviteLinks
   */
  export type Chat$inviteLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    where?: InviteLinkWhereInput
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    cursor?: InviteLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * Chat.chatPins
   */
  export type Chat$chatPinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    where?: ChatPinWhereInput
    orderBy?: ChatPinOrderByWithRelationInput | ChatPinOrderByWithRelationInput[]
    cursor?: ChatPinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatPinScalarFieldEnum | ChatPinScalarFieldEnum[]
  }

  /**
   * Chat.chatMutes
   */
  export type Chat$chatMutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    where?: ChatMuteWhereInput
    orderBy?: ChatMuteOrderByWithRelationInput | ChatMuteOrderByWithRelationInput[]
    cursor?: ChatMuteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMuteScalarFieldEnum | ChatMuteScalarFieldEnum[]
  }

  /**
   * Chat.joinRequests
   */
  export type Chat$joinRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    where?: JoinRequestWhereInput
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    cursor?: JoinRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JoinRequestScalarFieldEnum | JoinRequestScalarFieldEnum[]
  }

  /**
   * Chat.moderationLogs
   */
  export type Chat$moderationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    where?: ModerationLogWhereInput
    orderBy?: ModerationLogOrderByWithRelationInput | ModerationLogOrderByWithRelationInput[]
    cursor?: ModerationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModerationLogScalarFieldEnum | ModerationLogScalarFieldEnum[]
  }

  /**
   * Chat without action
   */
  export type ChatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
  }


  /**
   * Model ChatMember
   */

  export type AggregateChatMember = {
    _count: ChatMemberCountAggregateOutputType | null
    _min: ChatMemberMinAggregateOutputType | null
    _max: ChatMemberMaxAggregateOutputType | null
  }

  export type ChatMemberMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    role: $Enums.ChatMemberRole | null
    status: $Enums.ChatMemberStatus | null
    invitedByUserId: string | null
    joinedAt: Date | null
    leftAt: Date | null
    restrictionUntil: Date | null
    restrictedByUserId: string | null
    restrictedAt: Date | null
    bannedByUserId: string | null
    bannedAt: Date | null
    bannedReason: string | null
    promotedByUserId: string | null
    promotedAt: Date | null
  }

  export type ChatMemberMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    role: $Enums.ChatMemberRole | null
    status: $Enums.ChatMemberStatus | null
    invitedByUserId: string | null
    joinedAt: Date | null
    leftAt: Date | null
    restrictionUntil: Date | null
    restrictedByUserId: string | null
    restrictedAt: Date | null
    bannedByUserId: string | null
    bannedAt: Date | null
    bannedReason: string | null
    promotedByUserId: string | null
    promotedAt: Date | null
  }

  export type ChatMemberCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    role: number
    status: number
    invitedByUserId: number
    joinedAt: number
    leftAt: number
    adminPermissions: number
    restriction: number
    restrictionUntil: number
    restrictedByUserId: number
    restrictedAt: number
    bannedByUserId: number
    bannedAt: number
    bannedReason: number
    promotedByUserId: number
    promotedAt: number
    _all: number
  }


  export type ChatMemberMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    status?: true
    invitedByUserId?: true
    joinedAt?: true
    leftAt?: true
    restrictionUntil?: true
    restrictedByUserId?: true
    restrictedAt?: true
    bannedByUserId?: true
    bannedAt?: true
    bannedReason?: true
    promotedByUserId?: true
    promotedAt?: true
  }

  export type ChatMemberMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    status?: true
    invitedByUserId?: true
    joinedAt?: true
    leftAt?: true
    restrictionUntil?: true
    restrictedByUserId?: true
    restrictedAt?: true
    bannedByUserId?: true
    bannedAt?: true
    bannedReason?: true
    promotedByUserId?: true
    promotedAt?: true
  }

  export type ChatMemberCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    status?: true
    invitedByUserId?: true
    joinedAt?: true
    leftAt?: true
    adminPermissions?: true
    restriction?: true
    restrictionUntil?: true
    restrictedByUserId?: true
    restrictedAt?: true
    bannedByUserId?: true
    bannedAt?: true
    bannedReason?: true
    promotedByUserId?: true
    promotedAt?: true
    _all?: true
  }

  export type ChatMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMember to aggregate.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMembers
    **/
    _count?: true | ChatMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMemberMaxAggregateInputType
  }

  export type GetChatMemberAggregateType<T extends ChatMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMember[P]>
      : GetScalarType<T[P], AggregateChatMember[P]>
  }




  export type ChatMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMemberWhereInput
    orderBy?: ChatMemberOrderByWithAggregationInput | ChatMemberOrderByWithAggregationInput[]
    by: ChatMemberScalarFieldEnum[] | ChatMemberScalarFieldEnum
    having?: ChatMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMemberCountAggregateInputType | true
    _min?: ChatMemberMinAggregateInputType
    _max?: ChatMemberMaxAggregateInputType
  }

  export type ChatMemberGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId: string | null
    joinedAt: Date | null
    leftAt: Date | null
    adminPermissions: JsonValue | null
    restriction: JsonValue | null
    restrictionUntil: Date | null
    restrictedByUserId: string | null
    restrictedAt: Date | null
    bannedByUserId: string | null
    bannedAt: Date | null
    bannedReason: string | null
    promotedByUserId: string | null
    promotedAt: Date | null
    _count: ChatMemberCountAggregateOutputType | null
    _min: ChatMemberMinAggregateOutputType | null
    _max: ChatMemberMaxAggregateOutputType | null
  }

  type GetChatMemberGroupByPayload<T extends ChatMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMemberGroupByOutputType[P]>
        }
      >
    >


  export type ChatMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    invitedByUserId?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    adminPermissions?: boolean
    restriction?: boolean
    restrictionUntil?: boolean
    restrictedByUserId?: boolean
    restrictedAt?: boolean
    bannedByUserId?: boolean
    bannedAt?: boolean
    bannedReason?: boolean
    promotedByUserId?: boolean
    promotedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    invitedByUserId?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    adminPermissions?: boolean
    restriction?: boolean
    restrictionUntil?: boolean
    restrictedByUserId?: boolean
    restrictedAt?: boolean
    bannedByUserId?: boolean
    bannedAt?: boolean
    bannedReason?: boolean
    promotedByUserId?: boolean
    promotedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    invitedByUserId?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    adminPermissions?: boolean
    restriction?: boolean
    restrictionUntil?: boolean
    restrictedByUserId?: boolean
    restrictedAt?: boolean
    bannedByUserId?: boolean
    bannedAt?: boolean
    bannedReason?: boolean
    promotedByUserId?: boolean
    promotedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMember"]>

  export type ChatMemberSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    invitedByUserId?: boolean
    joinedAt?: boolean
    leftAt?: boolean
    adminPermissions?: boolean
    restriction?: boolean
    restrictionUntil?: boolean
    restrictedByUserId?: boolean
    restrictedAt?: boolean
    bannedByUserId?: boolean
    bannedAt?: boolean
    bannedReason?: boolean
    promotedByUserId?: boolean
    promotedAt?: boolean
  }

  export type ChatMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "role" | "status" | "invitedByUserId" | "joinedAt" | "leftAt" | "adminPermissions" | "restriction" | "restrictionUntil" | "restrictedByUserId" | "restrictedAt" | "bannedByUserId" | "bannedAt" | "bannedReason" | "promotedByUserId" | "promotedAt", ExtArgs["result"]["chatMember"]>
  export type ChatMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $ChatMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMember"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      role: $Enums.ChatMemberRole
      status: $Enums.ChatMemberStatus
      invitedByUserId: string | null
      joinedAt: Date | null
      leftAt: Date | null
      adminPermissions: Prisma.JsonValue | null
      restriction: Prisma.JsonValue | null
      restrictionUntil: Date | null
      restrictedByUserId: string | null
      restrictedAt: Date | null
      bannedByUserId: string | null
      bannedAt: Date | null
      bannedReason: string | null
      promotedByUserId: string | null
      promotedAt: Date | null
    }, ExtArgs["result"]["chatMember"]>
    composites: {}
  }

  type ChatMemberGetPayload<S extends boolean | null | undefined | ChatMemberDefaultArgs> = $Result.GetResult<Prisma.$ChatMemberPayload, S>

  type ChatMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMemberCountAggregateInputType | true
    }

  export interface ChatMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMember'], meta: { name: 'ChatMember' } }
    /**
     * Find zero or one ChatMember that matches the filter.
     * @param {ChatMemberFindUniqueArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMemberFindUniqueArgs>(args: SelectSubset<T, ChatMemberFindUniqueArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMemberFindUniqueOrThrowArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindFirstArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMemberFindFirstArgs>(args?: SelectSubset<T, ChatMemberFindFirstArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindFirstOrThrowArgs} args - Arguments to find a ChatMember
     * @example
     * // Get one ChatMember
     * const chatMember = await prisma.chatMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMembers
     * const chatMembers = await prisma.chatMember.findMany()
     * 
     * // Get first 10 ChatMembers
     * const chatMembers = await prisma.chatMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMemberFindManyArgs>(args?: SelectSubset<T, ChatMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMember.
     * @param {ChatMemberCreateArgs} args - Arguments to create a ChatMember.
     * @example
     * // Create one ChatMember
     * const ChatMember = await prisma.chatMember.create({
     *   data: {
     *     // ... data to create a ChatMember
     *   }
     * })
     * 
     */
    create<T extends ChatMemberCreateArgs>(args: SelectSubset<T, ChatMemberCreateArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMembers.
     * @param {ChatMemberCreateManyArgs} args - Arguments to create many ChatMembers.
     * @example
     * // Create many ChatMembers
     * const chatMember = await prisma.chatMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMemberCreateManyArgs>(args?: SelectSubset<T, ChatMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMembers and returns the data saved in the database.
     * @param {ChatMemberCreateManyAndReturnArgs} args - Arguments to create many ChatMembers.
     * @example
     * // Create many ChatMembers
     * const chatMember = await prisma.chatMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMembers and only return the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMember.
     * @param {ChatMemberDeleteArgs} args - Arguments to delete one ChatMember.
     * @example
     * // Delete one ChatMember
     * const ChatMember = await prisma.chatMember.delete({
     *   where: {
     *     // ... filter to delete one ChatMember
     *   }
     * })
     * 
     */
    delete<T extends ChatMemberDeleteArgs>(args: SelectSubset<T, ChatMemberDeleteArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMember.
     * @param {ChatMemberUpdateArgs} args - Arguments to update one ChatMember.
     * @example
     * // Update one ChatMember
     * const chatMember = await prisma.chatMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMemberUpdateArgs>(args: SelectSubset<T, ChatMemberUpdateArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMembers.
     * @param {ChatMemberDeleteManyArgs} args - Arguments to filter ChatMembers to delete.
     * @example
     * // Delete a few ChatMembers
     * const { count } = await prisma.chatMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMemberDeleteManyArgs>(args?: SelectSubset<T, ChatMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMembers
     * const chatMember = await prisma.chatMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMemberUpdateManyArgs>(args: SelectSubset<T, ChatMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembers and returns the data updated in the database.
     * @param {ChatMemberUpdateManyAndReturnArgs} args - Arguments to update many ChatMembers.
     * @example
     * // Update many ChatMembers
     * const chatMember = await prisma.chatMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMembers and only return the `id`
     * const chatMemberWithIdOnly = await prisma.chatMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMember.
     * @param {ChatMemberUpsertArgs} args - Arguments to update or create a ChatMember.
     * @example
     * // Update or create a ChatMember
     * const chatMember = await prisma.chatMember.upsert({
     *   create: {
     *     // ... data to create a ChatMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMember we want to update
     *   }
     * })
     */
    upsert<T extends ChatMemberUpsertArgs>(args: SelectSubset<T, ChatMemberUpsertArgs<ExtArgs>>): Prisma__ChatMemberClient<$Result.GetResult<Prisma.$ChatMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberCountArgs} args - Arguments to filter ChatMembers to count.
     * @example
     * // Count the number of ChatMembers
     * const count = await prisma.chatMember.count({
     *   where: {
     *     // ... the filter for the ChatMembers we want to count
     *   }
     * })
    **/
    count<T extends ChatMemberCountArgs>(
      args?: Subset<T, ChatMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMemberAggregateArgs>(args: Subset<T, ChatMemberAggregateArgs>): Prisma.PrismaPromise<GetChatMemberAggregateType<T>>

    /**
     * Group by ChatMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMemberGroupByArgs} args - Group by arguments.
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
      T extends ChatMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMemberGroupByArgs['orderBy'] }
        : { orderBy?: ChatMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMember model
   */
  readonly fields: ChatMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatMember model
   */
  interface ChatMemberFieldRefs {
    readonly id: FieldRef<"ChatMember", 'String'>
    readonly chatId: FieldRef<"ChatMember", 'String'>
    readonly userId: FieldRef<"ChatMember", 'String'>
    readonly role: FieldRef<"ChatMember", 'ChatMemberRole'>
    readonly status: FieldRef<"ChatMember", 'ChatMemberStatus'>
    readonly invitedByUserId: FieldRef<"ChatMember", 'String'>
    readonly joinedAt: FieldRef<"ChatMember", 'DateTime'>
    readonly leftAt: FieldRef<"ChatMember", 'DateTime'>
    readonly adminPermissions: FieldRef<"ChatMember", 'Json'>
    readonly restriction: FieldRef<"ChatMember", 'Json'>
    readonly restrictionUntil: FieldRef<"ChatMember", 'DateTime'>
    readonly restrictedByUserId: FieldRef<"ChatMember", 'String'>
    readonly restrictedAt: FieldRef<"ChatMember", 'DateTime'>
    readonly bannedByUserId: FieldRef<"ChatMember", 'String'>
    readonly bannedAt: FieldRef<"ChatMember", 'DateTime'>
    readonly bannedReason: FieldRef<"ChatMember", 'String'>
    readonly promotedByUserId: FieldRef<"ChatMember", 'String'>
    readonly promotedAt: FieldRef<"ChatMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMember findUnique
   */
  export type ChatMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember findUniqueOrThrow
   */
  export type ChatMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember findFirst
   */
  export type ChatMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembers.
     */
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember findFirstOrThrow
   */
  export type ChatMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMember to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembers.
     */
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember findMany
   */
  export type ChatMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter, which ChatMembers to fetch.
     */
    where?: ChatMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembers to fetch.
     */
    orderBy?: ChatMemberOrderByWithRelationInput | ChatMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMembers.
     */
    cursor?: ChatMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembers.
     */
    skip?: number
    distinct?: ChatMemberScalarFieldEnum | ChatMemberScalarFieldEnum[]
  }

  /**
   * ChatMember create
   */
  export type ChatMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMember.
     */
    data: XOR<ChatMemberCreateInput, ChatMemberUncheckedCreateInput>
  }

  /**
   * ChatMember createMany
   */
  export type ChatMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMembers.
     */
    data: ChatMemberCreateManyInput | ChatMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMember createManyAndReturn
   */
  export type ChatMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMembers.
     */
    data: ChatMemberCreateManyInput | ChatMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMember update
   */
  export type ChatMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMember.
     */
    data: XOR<ChatMemberUpdateInput, ChatMemberUncheckedUpdateInput>
    /**
     * Choose, which ChatMember to update.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember updateMany
   */
  export type ChatMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMembers.
     */
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembers to update
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to update.
     */
    limit?: number
  }

  /**
   * ChatMember updateManyAndReturn
   */
  export type ChatMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * The data used to update ChatMembers.
     */
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembers to update
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMember upsert
   */
  export type ChatMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMember to update in case it exists.
     */
    where: ChatMemberWhereUniqueInput
    /**
     * In case the ChatMember found by the `where` argument doesn't exist, create a new ChatMember with this data.
     */
    create: XOR<ChatMemberCreateInput, ChatMemberUncheckedCreateInput>
    /**
     * In case the ChatMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMemberUpdateInput, ChatMemberUncheckedUpdateInput>
  }

  /**
   * ChatMember delete
   */
  export type ChatMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
    /**
     * Filter which ChatMember to delete.
     */
    where: ChatMemberWhereUniqueInput
  }

  /**
   * ChatMember deleteMany
   */
  export type ChatMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembers to delete
     */
    where?: ChatMemberWhereInput
    /**
     * Limit how many ChatMembers to delete.
     */
    limit?: number
  }

  /**
   * ChatMember without action
   */
  export type ChatMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMember
     */
    select?: ChatMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMember
     */
    omit?: ChatMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMemberInclude<ExtArgs> | null
  }


  /**
   * Model ChatPermission
   */

  export type AggregateChatPermission = {
    _count: ChatPermissionCountAggregateOutputType | null
    _min: ChatPermissionMinAggregateOutputType | null
    _max: ChatPermissionMaxAggregateOutputType | null
  }

  export type ChatPermissionMinAggregateOutputType = {
    chatId: string | null
    canSendMessages: boolean | null
    canAddMembers: boolean | null
    canPinMessages: boolean | null
    updatedAt: Date | null
  }

  export type ChatPermissionMaxAggregateOutputType = {
    chatId: string | null
    canSendMessages: boolean | null
    canAddMembers: boolean | null
    canPinMessages: boolean | null
    updatedAt: Date | null
  }

  export type ChatPermissionCountAggregateOutputType = {
    chatId: number
    canSendMessages: number
    canAddMembers: number
    canPinMessages: number
    updatedAt: number
    _all: number
  }


  export type ChatPermissionMinAggregateInputType = {
    chatId?: true
    canSendMessages?: true
    canAddMembers?: true
    canPinMessages?: true
    updatedAt?: true
  }

  export type ChatPermissionMaxAggregateInputType = {
    chatId?: true
    canSendMessages?: true
    canAddMembers?: true
    canPinMessages?: true
    updatedAt?: true
  }

  export type ChatPermissionCountAggregateInputType = {
    chatId?: true
    canSendMessages?: true
    canAddMembers?: true
    canPinMessages?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatPermission to aggregate.
     */
    where?: ChatPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPermissions to fetch.
     */
    orderBy?: ChatPermissionOrderByWithRelationInput | ChatPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatPermissions
    **/
    _count?: true | ChatPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatPermissionMaxAggregateInputType
  }

  export type GetChatPermissionAggregateType<T extends ChatPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateChatPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatPermission[P]>
      : GetScalarType<T[P], AggregateChatPermission[P]>
  }




  export type ChatPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatPermissionWhereInput
    orderBy?: ChatPermissionOrderByWithAggregationInput | ChatPermissionOrderByWithAggregationInput[]
    by: ChatPermissionScalarFieldEnum[] | ChatPermissionScalarFieldEnum
    having?: ChatPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatPermissionCountAggregateInputType | true
    _min?: ChatPermissionMinAggregateInputType
    _max?: ChatPermissionMaxAggregateInputType
  }

  export type ChatPermissionGroupByOutputType = {
    chatId: string
    canSendMessages: boolean
    canAddMembers: boolean
    canPinMessages: boolean
    updatedAt: Date
    _count: ChatPermissionCountAggregateOutputType | null
    _min: ChatPermissionMinAggregateOutputType | null
    _max: ChatPermissionMaxAggregateOutputType | null
  }

  type GetChatPermissionGroupByPayload<T extends ChatPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], ChatPermissionGroupByOutputType[P]>
        }
      >
    >


  export type ChatPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPermission"]>

  export type ChatPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPermission"]>

  export type ChatPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPermission"]>

  export type ChatPermissionSelectScalar = {
    chatId?: boolean
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: boolean
  }

  export type ChatPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "canSendMessages" | "canAddMembers" | "canPinMessages" | "updatedAt", ExtArgs["result"]["chatPermission"]>
  export type ChatPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $ChatPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatPermission"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      chatId: string
      canSendMessages: boolean
      canAddMembers: boolean
      canPinMessages: boolean
      updatedAt: Date
    }, ExtArgs["result"]["chatPermission"]>
    composites: {}
  }

  type ChatPermissionGetPayload<S extends boolean | null | undefined | ChatPermissionDefaultArgs> = $Result.GetResult<Prisma.$ChatPermissionPayload, S>

  type ChatPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatPermissionCountAggregateInputType | true
    }

  export interface ChatPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatPermission'], meta: { name: 'ChatPermission' } }
    /**
     * Find zero or one ChatPermission that matches the filter.
     * @param {ChatPermissionFindUniqueArgs} args - Arguments to find a ChatPermission
     * @example
     * // Get one ChatPermission
     * const chatPermission = await prisma.chatPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatPermissionFindUniqueArgs>(args: SelectSubset<T, ChatPermissionFindUniqueArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatPermissionFindUniqueOrThrowArgs} args - Arguments to find a ChatPermission
     * @example
     * // Get one ChatPermission
     * const chatPermission = await prisma.chatPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionFindFirstArgs} args - Arguments to find a ChatPermission
     * @example
     * // Get one ChatPermission
     * const chatPermission = await prisma.chatPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatPermissionFindFirstArgs>(args?: SelectSubset<T, ChatPermissionFindFirstArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionFindFirstOrThrowArgs} args - Arguments to find a ChatPermission
     * @example
     * // Get one ChatPermission
     * const chatPermission = await prisma.chatPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatPermissions
     * const chatPermissions = await prisma.chatPermission.findMany()
     * 
     * // Get first 10 ChatPermissions
     * const chatPermissions = await prisma.chatPermission.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const chatPermissionWithChatIdOnly = await prisma.chatPermission.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends ChatPermissionFindManyArgs>(args?: SelectSubset<T, ChatPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatPermission.
     * @param {ChatPermissionCreateArgs} args - Arguments to create a ChatPermission.
     * @example
     * // Create one ChatPermission
     * const ChatPermission = await prisma.chatPermission.create({
     *   data: {
     *     // ... data to create a ChatPermission
     *   }
     * })
     * 
     */
    create<T extends ChatPermissionCreateArgs>(args: SelectSubset<T, ChatPermissionCreateArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatPermissions.
     * @param {ChatPermissionCreateManyArgs} args - Arguments to create many ChatPermissions.
     * @example
     * // Create many ChatPermissions
     * const chatPermission = await prisma.chatPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatPermissionCreateManyArgs>(args?: SelectSubset<T, ChatPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatPermissions and returns the data saved in the database.
     * @param {ChatPermissionCreateManyAndReturnArgs} args - Arguments to create many ChatPermissions.
     * @example
     * // Create many ChatPermissions
     * const chatPermission = await prisma.chatPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatPermissions and only return the `chatId`
     * const chatPermissionWithChatIdOnly = await prisma.chatPermission.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatPermission.
     * @param {ChatPermissionDeleteArgs} args - Arguments to delete one ChatPermission.
     * @example
     * // Delete one ChatPermission
     * const ChatPermission = await prisma.chatPermission.delete({
     *   where: {
     *     // ... filter to delete one ChatPermission
     *   }
     * })
     * 
     */
    delete<T extends ChatPermissionDeleteArgs>(args: SelectSubset<T, ChatPermissionDeleteArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatPermission.
     * @param {ChatPermissionUpdateArgs} args - Arguments to update one ChatPermission.
     * @example
     * // Update one ChatPermission
     * const chatPermission = await prisma.chatPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatPermissionUpdateArgs>(args: SelectSubset<T, ChatPermissionUpdateArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatPermissions.
     * @param {ChatPermissionDeleteManyArgs} args - Arguments to filter ChatPermissions to delete.
     * @example
     * // Delete a few ChatPermissions
     * const { count } = await prisma.chatPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatPermissionDeleteManyArgs>(args?: SelectSubset<T, ChatPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatPermissions
     * const chatPermission = await prisma.chatPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatPermissionUpdateManyArgs>(args: SelectSubset<T, ChatPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatPermissions and returns the data updated in the database.
     * @param {ChatPermissionUpdateManyAndReturnArgs} args - Arguments to update many ChatPermissions.
     * @example
     * // Update many ChatPermissions
     * const chatPermission = await prisma.chatPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatPermissions and only return the `chatId`
     * const chatPermissionWithChatIdOnly = await prisma.chatPermission.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatPermission.
     * @param {ChatPermissionUpsertArgs} args - Arguments to update or create a ChatPermission.
     * @example
     * // Update or create a ChatPermission
     * const chatPermission = await prisma.chatPermission.upsert({
     *   create: {
     *     // ... data to create a ChatPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatPermission we want to update
     *   }
     * })
     */
    upsert<T extends ChatPermissionUpsertArgs>(args: SelectSubset<T, ChatPermissionUpsertArgs<ExtArgs>>): Prisma__ChatPermissionClient<$Result.GetResult<Prisma.$ChatPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionCountArgs} args - Arguments to filter ChatPermissions to count.
     * @example
     * // Count the number of ChatPermissions
     * const count = await prisma.chatPermission.count({
     *   where: {
     *     // ... the filter for the ChatPermissions we want to count
     *   }
     * })
    **/
    count<T extends ChatPermissionCountArgs>(
      args?: Subset<T, ChatPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatPermissionAggregateArgs>(args: Subset<T, ChatPermissionAggregateArgs>): Prisma.PrismaPromise<GetChatPermissionAggregateType<T>>

    /**
     * Group by ChatPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPermissionGroupByArgs} args - Group by arguments.
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
      T extends ChatPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatPermissionGroupByArgs['orderBy'] }
        : { orderBy?: ChatPermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatPermission model
   */
  readonly fields: ChatPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatPermission model
   */
  interface ChatPermissionFieldRefs {
    readonly chatId: FieldRef<"ChatPermission", 'String'>
    readonly canSendMessages: FieldRef<"ChatPermission", 'Boolean'>
    readonly canAddMembers: FieldRef<"ChatPermission", 'Boolean'>
    readonly canPinMessages: FieldRef<"ChatPermission", 'Boolean'>
    readonly updatedAt: FieldRef<"ChatPermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatPermission findUnique
   */
  export type ChatPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter, which ChatPermission to fetch.
     */
    where: ChatPermissionWhereUniqueInput
  }

  /**
   * ChatPermission findUniqueOrThrow
   */
  export type ChatPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter, which ChatPermission to fetch.
     */
    where: ChatPermissionWhereUniqueInput
  }

  /**
   * ChatPermission findFirst
   */
  export type ChatPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter, which ChatPermission to fetch.
     */
    where?: ChatPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPermissions to fetch.
     */
    orderBy?: ChatPermissionOrderByWithRelationInput | ChatPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatPermissions.
     */
    cursor?: ChatPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatPermissions.
     */
    distinct?: ChatPermissionScalarFieldEnum | ChatPermissionScalarFieldEnum[]
  }

  /**
   * ChatPermission findFirstOrThrow
   */
  export type ChatPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter, which ChatPermission to fetch.
     */
    where?: ChatPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPermissions to fetch.
     */
    orderBy?: ChatPermissionOrderByWithRelationInput | ChatPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatPermissions.
     */
    cursor?: ChatPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatPermissions.
     */
    distinct?: ChatPermissionScalarFieldEnum | ChatPermissionScalarFieldEnum[]
  }

  /**
   * ChatPermission findMany
   */
  export type ChatPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter, which ChatPermissions to fetch.
     */
    where?: ChatPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPermissions to fetch.
     */
    orderBy?: ChatPermissionOrderByWithRelationInput | ChatPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatPermissions.
     */
    cursor?: ChatPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPermissions.
     */
    skip?: number
    distinct?: ChatPermissionScalarFieldEnum | ChatPermissionScalarFieldEnum[]
  }

  /**
   * ChatPermission create
   */
  export type ChatPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatPermission.
     */
    data: XOR<ChatPermissionCreateInput, ChatPermissionUncheckedCreateInput>
  }

  /**
   * ChatPermission createMany
   */
  export type ChatPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatPermissions.
     */
    data: ChatPermissionCreateManyInput | ChatPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatPermission createManyAndReturn
   */
  export type ChatPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many ChatPermissions.
     */
    data: ChatPermissionCreateManyInput | ChatPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatPermission update
   */
  export type ChatPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatPermission.
     */
    data: XOR<ChatPermissionUpdateInput, ChatPermissionUncheckedUpdateInput>
    /**
     * Choose, which ChatPermission to update.
     */
    where: ChatPermissionWhereUniqueInput
  }

  /**
   * ChatPermission updateMany
   */
  export type ChatPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatPermissions.
     */
    data: XOR<ChatPermissionUpdateManyMutationInput, ChatPermissionUncheckedUpdateManyInput>
    /**
     * Filter which ChatPermissions to update
     */
    where?: ChatPermissionWhereInput
    /**
     * Limit how many ChatPermissions to update.
     */
    limit?: number
  }

  /**
   * ChatPermission updateManyAndReturn
   */
  export type ChatPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * The data used to update ChatPermissions.
     */
    data: XOR<ChatPermissionUpdateManyMutationInput, ChatPermissionUncheckedUpdateManyInput>
    /**
     * Filter which ChatPermissions to update
     */
    where?: ChatPermissionWhereInput
    /**
     * Limit how many ChatPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatPermission upsert
   */
  export type ChatPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatPermission to update in case it exists.
     */
    where: ChatPermissionWhereUniqueInput
    /**
     * In case the ChatPermission found by the `where` argument doesn't exist, create a new ChatPermission with this data.
     */
    create: XOR<ChatPermissionCreateInput, ChatPermissionUncheckedCreateInput>
    /**
     * In case the ChatPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatPermissionUpdateInput, ChatPermissionUncheckedUpdateInput>
  }

  /**
   * ChatPermission delete
   */
  export type ChatPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
    /**
     * Filter which ChatPermission to delete.
     */
    where: ChatPermissionWhereUniqueInput
  }

  /**
   * ChatPermission deleteMany
   */
  export type ChatPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatPermissions to delete
     */
    where?: ChatPermissionWhereInput
    /**
     * Limit how many ChatPermissions to delete.
     */
    limit?: number
  }

  /**
   * ChatPermission without action
   */
  export type ChatPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPermission
     */
    select?: ChatPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPermission
     */
    omit?: ChatPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPermissionInclude<ExtArgs> | null
  }


  /**
   * Model InviteLink
   */

  export type AggregateInviteLink = {
    _count: InviteLinkCountAggregateOutputType | null
    _avg: InviteLinkAvgAggregateOutputType | null
    _sum: InviteLinkSumAggregateOutputType | null
    _min: InviteLinkMinAggregateOutputType | null
    _max: InviteLinkMaxAggregateOutputType | null
  }

  export type InviteLinkAvgAggregateOutputType = {
    maxUses: number | null
    usedCount: number | null
  }

  export type InviteLinkSumAggregateOutputType = {
    maxUses: number | null
    usedCount: number | null
  }

  export type InviteLinkMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    tokenHash: string | null
    createdByUserId: string | null
    expiresAt: Date | null
    maxUses: number | null
    usedCount: number | null
    revokedAt: Date | null
    requiresApproval: boolean | null
    isPrimary: boolean | null
    createdAt: Date | null
  }

  export type InviteLinkMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    tokenHash: string | null
    createdByUserId: string | null
    expiresAt: Date | null
    maxUses: number | null
    usedCount: number | null
    revokedAt: Date | null
    requiresApproval: boolean | null
    isPrimary: boolean | null
    createdAt: Date | null
  }

  export type InviteLinkCountAggregateOutputType = {
    id: number
    chatId: number
    tokenHash: number
    createdByUserId: number
    expiresAt: number
    maxUses: number
    usedCount: number
    revokedAt: number
    requiresApproval: number
    isPrimary: number
    createdAt: number
    _all: number
  }


  export type InviteLinkAvgAggregateInputType = {
    maxUses?: true
    usedCount?: true
  }

  export type InviteLinkSumAggregateInputType = {
    maxUses?: true
    usedCount?: true
  }

  export type InviteLinkMinAggregateInputType = {
    id?: true
    chatId?: true
    tokenHash?: true
    createdByUserId?: true
    expiresAt?: true
    maxUses?: true
    usedCount?: true
    revokedAt?: true
    requiresApproval?: true
    isPrimary?: true
    createdAt?: true
  }

  export type InviteLinkMaxAggregateInputType = {
    id?: true
    chatId?: true
    tokenHash?: true
    createdByUserId?: true
    expiresAt?: true
    maxUses?: true
    usedCount?: true
    revokedAt?: true
    requiresApproval?: true
    isPrimary?: true
    createdAt?: true
  }

  export type InviteLinkCountAggregateInputType = {
    id?: true
    chatId?: true
    tokenHash?: true
    createdByUserId?: true
    expiresAt?: true
    maxUses?: true
    usedCount?: true
    revokedAt?: true
    requiresApproval?: true
    isPrimary?: true
    createdAt?: true
    _all?: true
  }

  export type InviteLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InviteLink to aggregate.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InviteLinks
    **/
    _count?: true | InviteLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InviteLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InviteLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InviteLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InviteLinkMaxAggregateInputType
  }

  export type GetInviteLinkAggregateType<T extends InviteLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateInviteLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInviteLink[P]>
      : GetScalarType<T[P], AggregateInviteLink[P]>
  }




  export type InviteLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InviteLinkWhereInput
    orderBy?: InviteLinkOrderByWithAggregationInput | InviteLinkOrderByWithAggregationInput[]
    by: InviteLinkScalarFieldEnum[] | InviteLinkScalarFieldEnum
    having?: InviteLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InviteLinkCountAggregateInputType | true
    _avg?: InviteLinkAvgAggregateInputType
    _sum?: InviteLinkSumAggregateInputType
    _min?: InviteLinkMinAggregateInputType
    _max?: InviteLinkMaxAggregateInputType
  }

  export type InviteLinkGroupByOutputType = {
    id: string
    chatId: string
    tokenHash: string
    createdByUserId: string
    expiresAt: Date | null
    maxUses: number | null
    usedCount: number
    revokedAt: Date | null
    requiresApproval: boolean
    isPrimary: boolean
    createdAt: Date
    _count: InviteLinkCountAggregateOutputType | null
    _avg: InviteLinkAvgAggregateOutputType | null
    _sum: InviteLinkSumAggregateOutputType | null
    _min: InviteLinkMinAggregateOutputType | null
    _max: InviteLinkMaxAggregateOutputType | null
  }

  type GetInviteLinkGroupByPayload<T extends InviteLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InviteLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InviteLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InviteLinkGroupByOutputType[P]>
            : GetScalarType<T[P], InviteLinkGroupByOutputType[P]>
        }
      >
    >


  export type InviteLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    tokenHash?: boolean
    createdByUserId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    usedCount?: boolean
    revokedAt?: boolean
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    joinRequests?: boolean | InviteLink$joinRequestsArgs<ExtArgs>
    _count?: boolean | InviteLinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inviteLink"]>

  export type InviteLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    tokenHash?: boolean
    createdByUserId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    usedCount?: boolean
    revokedAt?: boolean
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inviteLink"]>

  export type InviteLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    tokenHash?: boolean
    createdByUserId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    usedCount?: boolean
    revokedAt?: boolean
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inviteLink"]>

  export type InviteLinkSelectScalar = {
    id?: boolean
    chatId?: boolean
    tokenHash?: boolean
    createdByUserId?: boolean
    expiresAt?: boolean
    maxUses?: boolean
    usedCount?: boolean
    revokedAt?: boolean
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: boolean
  }

  export type InviteLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "tokenHash" | "createdByUserId" | "expiresAt" | "maxUses" | "usedCount" | "revokedAt" | "requiresApproval" | "isPrimary" | "createdAt", ExtArgs["result"]["inviteLink"]>
  export type InviteLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    joinRequests?: boolean | InviteLink$joinRequestsArgs<ExtArgs>
    _count?: boolean | InviteLinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InviteLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type InviteLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $InviteLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InviteLink"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
      joinRequests: Prisma.$JoinRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      tokenHash: string
      createdByUserId: string
      expiresAt: Date | null
      maxUses: number | null
      usedCount: number
      revokedAt: Date | null
      requiresApproval: boolean
      isPrimary: boolean
      createdAt: Date
    }, ExtArgs["result"]["inviteLink"]>
    composites: {}
  }

  type InviteLinkGetPayload<S extends boolean | null | undefined | InviteLinkDefaultArgs> = $Result.GetResult<Prisma.$InviteLinkPayload, S>

  type InviteLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InviteLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InviteLinkCountAggregateInputType | true
    }

  export interface InviteLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InviteLink'], meta: { name: 'InviteLink' } }
    /**
     * Find zero or one InviteLink that matches the filter.
     * @param {InviteLinkFindUniqueArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InviteLinkFindUniqueArgs>(args: SelectSubset<T, InviteLinkFindUniqueArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InviteLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InviteLinkFindUniqueOrThrowArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InviteLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, InviteLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InviteLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindFirstArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InviteLinkFindFirstArgs>(args?: SelectSubset<T, InviteLinkFindFirstArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InviteLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindFirstOrThrowArgs} args - Arguments to find a InviteLink
     * @example
     * // Get one InviteLink
     * const inviteLink = await prisma.inviteLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InviteLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, InviteLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InviteLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InviteLinks
     * const inviteLinks = await prisma.inviteLink.findMany()
     * 
     * // Get first 10 InviteLinks
     * const inviteLinks = await prisma.inviteLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inviteLinkWithIdOnly = await prisma.inviteLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InviteLinkFindManyArgs>(args?: SelectSubset<T, InviteLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InviteLink.
     * @param {InviteLinkCreateArgs} args - Arguments to create a InviteLink.
     * @example
     * // Create one InviteLink
     * const InviteLink = await prisma.inviteLink.create({
     *   data: {
     *     // ... data to create a InviteLink
     *   }
     * })
     * 
     */
    create<T extends InviteLinkCreateArgs>(args: SelectSubset<T, InviteLinkCreateArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InviteLinks.
     * @param {InviteLinkCreateManyArgs} args - Arguments to create many InviteLinks.
     * @example
     * // Create many InviteLinks
     * const inviteLink = await prisma.inviteLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InviteLinkCreateManyArgs>(args?: SelectSubset<T, InviteLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InviteLinks and returns the data saved in the database.
     * @param {InviteLinkCreateManyAndReturnArgs} args - Arguments to create many InviteLinks.
     * @example
     * // Create many InviteLinks
     * const inviteLink = await prisma.inviteLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InviteLinks and only return the `id`
     * const inviteLinkWithIdOnly = await prisma.inviteLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InviteLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, InviteLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InviteLink.
     * @param {InviteLinkDeleteArgs} args - Arguments to delete one InviteLink.
     * @example
     * // Delete one InviteLink
     * const InviteLink = await prisma.inviteLink.delete({
     *   where: {
     *     // ... filter to delete one InviteLink
     *   }
     * })
     * 
     */
    delete<T extends InviteLinkDeleteArgs>(args: SelectSubset<T, InviteLinkDeleteArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InviteLink.
     * @param {InviteLinkUpdateArgs} args - Arguments to update one InviteLink.
     * @example
     * // Update one InviteLink
     * const inviteLink = await prisma.inviteLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InviteLinkUpdateArgs>(args: SelectSubset<T, InviteLinkUpdateArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InviteLinks.
     * @param {InviteLinkDeleteManyArgs} args - Arguments to filter InviteLinks to delete.
     * @example
     * // Delete a few InviteLinks
     * const { count } = await prisma.inviteLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InviteLinkDeleteManyArgs>(args?: SelectSubset<T, InviteLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InviteLinks
     * const inviteLink = await prisma.inviteLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InviteLinkUpdateManyArgs>(args: SelectSubset<T, InviteLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteLinks and returns the data updated in the database.
     * @param {InviteLinkUpdateManyAndReturnArgs} args - Arguments to update many InviteLinks.
     * @example
     * // Update many InviteLinks
     * const inviteLink = await prisma.inviteLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InviteLinks and only return the `id`
     * const inviteLinkWithIdOnly = await prisma.inviteLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends InviteLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, InviteLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InviteLink.
     * @param {InviteLinkUpsertArgs} args - Arguments to update or create a InviteLink.
     * @example
     * // Update or create a InviteLink
     * const inviteLink = await prisma.inviteLink.upsert({
     *   create: {
     *     // ... data to create a InviteLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InviteLink we want to update
     *   }
     * })
     */
    upsert<T extends InviteLinkUpsertArgs>(args: SelectSubset<T, InviteLinkUpsertArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InviteLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkCountArgs} args - Arguments to filter InviteLinks to count.
     * @example
     * // Count the number of InviteLinks
     * const count = await prisma.inviteLink.count({
     *   where: {
     *     // ... the filter for the InviteLinks we want to count
     *   }
     * })
    **/
    count<T extends InviteLinkCountArgs>(
      args?: Subset<T, InviteLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InviteLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InviteLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InviteLinkAggregateArgs>(args: Subset<T, InviteLinkAggregateArgs>): Prisma.PrismaPromise<GetInviteLinkAggregateType<T>>

    /**
     * Group by InviteLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteLinkGroupByArgs} args - Group by arguments.
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
      T extends InviteLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InviteLinkGroupByArgs['orderBy'] }
        : { orderBy?: InviteLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InviteLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInviteLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InviteLink model
   */
  readonly fields: InviteLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InviteLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InviteLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    joinRequests<T extends InviteLink$joinRequestsArgs<ExtArgs> = {}>(args?: Subset<T, InviteLink$joinRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the InviteLink model
   */
  interface InviteLinkFieldRefs {
    readonly id: FieldRef<"InviteLink", 'String'>
    readonly chatId: FieldRef<"InviteLink", 'String'>
    readonly tokenHash: FieldRef<"InviteLink", 'String'>
    readonly createdByUserId: FieldRef<"InviteLink", 'String'>
    readonly expiresAt: FieldRef<"InviteLink", 'DateTime'>
    readonly maxUses: FieldRef<"InviteLink", 'Int'>
    readonly usedCount: FieldRef<"InviteLink", 'Int'>
    readonly revokedAt: FieldRef<"InviteLink", 'DateTime'>
    readonly requiresApproval: FieldRef<"InviteLink", 'Boolean'>
    readonly isPrimary: FieldRef<"InviteLink", 'Boolean'>
    readonly createdAt: FieldRef<"InviteLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InviteLink findUnique
   */
  export type InviteLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink findUniqueOrThrow
   */
  export type InviteLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink findFirst
   */
  export type InviteLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteLinks.
     */
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink findFirstOrThrow
   */
  export type InviteLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLink to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteLinks.
     */
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink findMany
   */
  export type InviteLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter, which InviteLinks to fetch.
     */
    where?: InviteLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteLinks to fetch.
     */
    orderBy?: InviteLinkOrderByWithRelationInput | InviteLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InviteLinks.
     */
    cursor?: InviteLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteLinks.
     */
    skip?: number
    distinct?: InviteLinkScalarFieldEnum | InviteLinkScalarFieldEnum[]
  }

  /**
   * InviteLink create
   */
  export type InviteLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a InviteLink.
     */
    data: XOR<InviteLinkCreateInput, InviteLinkUncheckedCreateInput>
  }

  /**
   * InviteLink createMany
   */
  export type InviteLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InviteLinks.
     */
    data: InviteLinkCreateManyInput | InviteLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InviteLink createManyAndReturn
   */
  export type InviteLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * The data used to create many InviteLinks.
     */
    data: InviteLinkCreateManyInput | InviteLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InviteLink update
   */
  export type InviteLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a InviteLink.
     */
    data: XOR<InviteLinkUpdateInput, InviteLinkUncheckedUpdateInput>
    /**
     * Choose, which InviteLink to update.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink updateMany
   */
  export type InviteLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InviteLinks.
     */
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyInput>
    /**
     * Filter which InviteLinks to update
     */
    where?: InviteLinkWhereInput
    /**
     * Limit how many InviteLinks to update.
     */
    limit?: number
  }

  /**
   * InviteLink updateManyAndReturn
   */
  export type InviteLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * The data used to update InviteLinks.
     */
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyInput>
    /**
     * Filter which InviteLinks to update
     */
    where?: InviteLinkWhereInput
    /**
     * Limit how many InviteLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InviteLink upsert
   */
  export type InviteLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the InviteLink to update in case it exists.
     */
    where: InviteLinkWhereUniqueInput
    /**
     * In case the InviteLink found by the `where` argument doesn't exist, create a new InviteLink with this data.
     */
    create: XOR<InviteLinkCreateInput, InviteLinkUncheckedCreateInput>
    /**
     * In case the InviteLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InviteLinkUpdateInput, InviteLinkUncheckedUpdateInput>
  }

  /**
   * InviteLink delete
   */
  export type InviteLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    /**
     * Filter which InviteLink to delete.
     */
    where: InviteLinkWhereUniqueInput
  }

  /**
   * InviteLink deleteMany
   */
  export type InviteLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InviteLinks to delete
     */
    where?: InviteLinkWhereInput
    /**
     * Limit how many InviteLinks to delete.
     */
    limit?: number
  }

  /**
   * InviteLink.joinRequests
   */
  export type InviteLink$joinRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    where?: JoinRequestWhereInput
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    cursor?: JoinRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JoinRequestScalarFieldEnum | JoinRequestScalarFieldEnum[]
  }

  /**
   * InviteLink without action
   */
  export type InviteLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
  }


  /**
   * Model JoinRequest
   */

  export type AggregateJoinRequest = {
    _count: JoinRequestCountAggregateOutputType | null
    _min: JoinRequestMinAggregateOutputType | null
    _max: JoinRequestMaxAggregateOutputType | null
  }

  export type JoinRequestMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    inviteLinkId: string | null
    status: $Enums.JoinRequestStatus | null
    reviewedByUserId: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type JoinRequestMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    inviteLinkId: string | null
    status: $Enums.JoinRequestStatus | null
    reviewedByUserId: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type JoinRequestCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    inviteLinkId: number
    status: number
    reviewedByUserId: number
    reviewedAt: number
    createdAt: number
    _all: number
  }


  export type JoinRequestMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    inviteLinkId?: true
    status?: true
    reviewedByUserId?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type JoinRequestMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    inviteLinkId?: true
    status?: true
    reviewedByUserId?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type JoinRequestCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    inviteLinkId?: true
    status?: true
    reviewedByUserId?: true
    reviewedAt?: true
    createdAt?: true
    _all?: true
  }

  export type JoinRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JoinRequest to aggregate.
     */
    where?: JoinRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JoinRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JoinRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JoinRequests
    **/
    _count?: true | JoinRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JoinRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JoinRequestMaxAggregateInputType
  }

  export type GetJoinRequestAggregateType<T extends JoinRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateJoinRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJoinRequest[P]>
      : GetScalarType<T[P], AggregateJoinRequest[P]>
  }




  export type JoinRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoinRequestWhereInput
    orderBy?: JoinRequestOrderByWithAggregationInput | JoinRequestOrderByWithAggregationInput[]
    by: JoinRequestScalarFieldEnum[] | JoinRequestScalarFieldEnum
    having?: JoinRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JoinRequestCountAggregateInputType | true
    _min?: JoinRequestMinAggregateInputType
    _max?: JoinRequestMaxAggregateInputType
  }

  export type JoinRequestGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    inviteLinkId: string | null
    status: $Enums.JoinRequestStatus
    reviewedByUserId: string | null
    reviewedAt: Date | null
    createdAt: Date
    _count: JoinRequestCountAggregateOutputType | null
    _min: JoinRequestMinAggregateOutputType | null
    _max: JoinRequestMaxAggregateOutputType | null
  }

  type GetJoinRequestGroupByPayload<T extends JoinRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JoinRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JoinRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JoinRequestGroupByOutputType[P]>
            : GetScalarType<T[P], JoinRequestGroupByOutputType[P]>
        }
      >
    >


  export type JoinRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    inviteLinkId?: boolean
    status?: boolean
    reviewedByUserId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }, ExtArgs["result"]["joinRequest"]>

  export type JoinRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    inviteLinkId?: boolean
    status?: boolean
    reviewedByUserId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }, ExtArgs["result"]["joinRequest"]>

  export type JoinRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    inviteLinkId?: boolean
    status?: boolean
    reviewedByUserId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }, ExtArgs["result"]["joinRequest"]>

  export type JoinRequestSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    inviteLinkId?: boolean
    status?: boolean
    reviewedByUserId?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }

  export type JoinRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "inviteLinkId" | "status" | "reviewedByUserId" | "reviewedAt" | "createdAt", ExtArgs["result"]["joinRequest"]>
  export type JoinRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }
  export type JoinRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }
  export type JoinRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
    inviteLink?: boolean | JoinRequest$inviteLinkArgs<ExtArgs>
  }

  export type $JoinRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JoinRequest"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
      inviteLink: Prisma.$InviteLinkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      inviteLinkId: string | null
      status: $Enums.JoinRequestStatus
      reviewedByUserId: string | null
      reviewedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["joinRequest"]>
    composites: {}
  }

  type JoinRequestGetPayload<S extends boolean | null | undefined | JoinRequestDefaultArgs> = $Result.GetResult<Prisma.$JoinRequestPayload, S>

  type JoinRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JoinRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JoinRequestCountAggregateInputType | true
    }

  export interface JoinRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JoinRequest'], meta: { name: 'JoinRequest' } }
    /**
     * Find zero or one JoinRequest that matches the filter.
     * @param {JoinRequestFindUniqueArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JoinRequestFindUniqueArgs>(args: SelectSubset<T, JoinRequestFindUniqueArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JoinRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JoinRequestFindUniqueOrThrowArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JoinRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, JoinRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JoinRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindFirstArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JoinRequestFindFirstArgs>(args?: SelectSubset<T, JoinRequestFindFirstArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JoinRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindFirstOrThrowArgs} args - Arguments to find a JoinRequest
     * @example
     * // Get one JoinRequest
     * const joinRequest = await prisma.joinRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JoinRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, JoinRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JoinRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JoinRequests
     * const joinRequests = await prisma.joinRequest.findMany()
     * 
     * // Get first 10 JoinRequests
     * const joinRequests = await prisma.joinRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JoinRequestFindManyArgs>(args?: SelectSubset<T, JoinRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JoinRequest.
     * @param {JoinRequestCreateArgs} args - Arguments to create a JoinRequest.
     * @example
     * // Create one JoinRequest
     * const JoinRequest = await prisma.joinRequest.create({
     *   data: {
     *     // ... data to create a JoinRequest
     *   }
     * })
     * 
     */
    create<T extends JoinRequestCreateArgs>(args: SelectSubset<T, JoinRequestCreateArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JoinRequests.
     * @param {JoinRequestCreateManyArgs} args - Arguments to create many JoinRequests.
     * @example
     * // Create many JoinRequests
     * const joinRequest = await prisma.joinRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JoinRequestCreateManyArgs>(args?: SelectSubset<T, JoinRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JoinRequests and returns the data saved in the database.
     * @param {JoinRequestCreateManyAndReturnArgs} args - Arguments to create many JoinRequests.
     * @example
     * // Create many JoinRequests
     * const joinRequest = await prisma.joinRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JoinRequests and only return the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JoinRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, JoinRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JoinRequest.
     * @param {JoinRequestDeleteArgs} args - Arguments to delete one JoinRequest.
     * @example
     * // Delete one JoinRequest
     * const JoinRequest = await prisma.joinRequest.delete({
     *   where: {
     *     // ... filter to delete one JoinRequest
     *   }
     * })
     * 
     */
    delete<T extends JoinRequestDeleteArgs>(args: SelectSubset<T, JoinRequestDeleteArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JoinRequest.
     * @param {JoinRequestUpdateArgs} args - Arguments to update one JoinRequest.
     * @example
     * // Update one JoinRequest
     * const joinRequest = await prisma.joinRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JoinRequestUpdateArgs>(args: SelectSubset<T, JoinRequestUpdateArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JoinRequests.
     * @param {JoinRequestDeleteManyArgs} args - Arguments to filter JoinRequests to delete.
     * @example
     * // Delete a few JoinRequests
     * const { count } = await prisma.joinRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JoinRequestDeleteManyArgs>(args?: SelectSubset<T, JoinRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JoinRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JoinRequests
     * const joinRequest = await prisma.joinRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JoinRequestUpdateManyArgs>(args: SelectSubset<T, JoinRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JoinRequests and returns the data updated in the database.
     * @param {JoinRequestUpdateManyAndReturnArgs} args - Arguments to update many JoinRequests.
     * @example
     * // Update many JoinRequests
     * const joinRequest = await prisma.joinRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JoinRequests and only return the `id`
     * const joinRequestWithIdOnly = await prisma.joinRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends JoinRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, JoinRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JoinRequest.
     * @param {JoinRequestUpsertArgs} args - Arguments to update or create a JoinRequest.
     * @example
     * // Update or create a JoinRequest
     * const joinRequest = await prisma.joinRequest.upsert({
     *   create: {
     *     // ... data to create a JoinRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JoinRequest we want to update
     *   }
     * })
     */
    upsert<T extends JoinRequestUpsertArgs>(args: SelectSubset<T, JoinRequestUpsertArgs<ExtArgs>>): Prisma__JoinRequestClient<$Result.GetResult<Prisma.$JoinRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JoinRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestCountArgs} args - Arguments to filter JoinRequests to count.
     * @example
     * // Count the number of JoinRequests
     * const count = await prisma.joinRequest.count({
     *   where: {
     *     // ... the filter for the JoinRequests we want to count
     *   }
     * })
    **/
    count<T extends JoinRequestCountArgs>(
      args?: Subset<T, JoinRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JoinRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JoinRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JoinRequestAggregateArgs>(args: Subset<T, JoinRequestAggregateArgs>): Prisma.PrismaPromise<GetJoinRequestAggregateType<T>>

    /**
     * Group by JoinRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoinRequestGroupByArgs} args - Group by arguments.
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
      T extends JoinRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JoinRequestGroupByArgs['orderBy'] }
        : { orderBy?: JoinRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JoinRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJoinRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JoinRequest model
   */
  readonly fields: JoinRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JoinRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JoinRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    inviteLink<T extends JoinRequest$inviteLinkArgs<ExtArgs> = {}>(args?: Subset<T, JoinRequest$inviteLinkArgs<ExtArgs>>): Prisma__InviteLinkClient<$Result.GetResult<Prisma.$InviteLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the JoinRequest model
   */
  interface JoinRequestFieldRefs {
    readonly id: FieldRef<"JoinRequest", 'String'>
    readonly chatId: FieldRef<"JoinRequest", 'String'>
    readonly userId: FieldRef<"JoinRequest", 'String'>
    readonly inviteLinkId: FieldRef<"JoinRequest", 'String'>
    readonly status: FieldRef<"JoinRequest", 'JoinRequestStatus'>
    readonly reviewedByUserId: FieldRef<"JoinRequest", 'String'>
    readonly reviewedAt: FieldRef<"JoinRequest", 'DateTime'>
    readonly createdAt: FieldRef<"JoinRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JoinRequest findUnique
   */
  export type JoinRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter, which JoinRequest to fetch.
     */
    where: JoinRequestWhereUniqueInput
  }

  /**
   * JoinRequest findUniqueOrThrow
   */
  export type JoinRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter, which JoinRequest to fetch.
     */
    where: JoinRequestWhereUniqueInput
  }

  /**
   * JoinRequest findFirst
   */
  export type JoinRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter, which JoinRequest to fetch.
     */
    where?: JoinRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JoinRequests.
     */
    cursor?: JoinRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JoinRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JoinRequests.
     */
    distinct?: JoinRequestScalarFieldEnum | JoinRequestScalarFieldEnum[]
  }

  /**
   * JoinRequest findFirstOrThrow
   */
  export type JoinRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter, which JoinRequest to fetch.
     */
    where?: JoinRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JoinRequests.
     */
    cursor?: JoinRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JoinRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JoinRequests.
     */
    distinct?: JoinRequestScalarFieldEnum | JoinRequestScalarFieldEnum[]
  }

  /**
   * JoinRequest findMany
   */
  export type JoinRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter, which JoinRequests to fetch.
     */
    where?: JoinRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JoinRequests to fetch.
     */
    orderBy?: JoinRequestOrderByWithRelationInput | JoinRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JoinRequests.
     */
    cursor?: JoinRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JoinRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JoinRequests.
     */
    skip?: number
    distinct?: JoinRequestScalarFieldEnum | JoinRequestScalarFieldEnum[]
  }

  /**
   * JoinRequest create
   */
  export type JoinRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a JoinRequest.
     */
    data: XOR<JoinRequestCreateInput, JoinRequestUncheckedCreateInput>
  }

  /**
   * JoinRequest createMany
   */
  export type JoinRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JoinRequests.
     */
    data: JoinRequestCreateManyInput | JoinRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JoinRequest createManyAndReturn
   */
  export type JoinRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * The data used to create many JoinRequests.
     */
    data: JoinRequestCreateManyInput | JoinRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JoinRequest update
   */
  export type JoinRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a JoinRequest.
     */
    data: XOR<JoinRequestUpdateInput, JoinRequestUncheckedUpdateInput>
    /**
     * Choose, which JoinRequest to update.
     */
    where: JoinRequestWhereUniqueInput
  }

  /**
   * JoinRequest updateMany
   */
  export type JoinRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JoinRequests.
     */
    data: XOR<JoinRequestUpdateManyMutationInput, JoinRequestUncheckedUpdateManyInput>
    /**
     * Filter which JoinRequests to update
     */
    where?: JoinRequestWhereInput
    /**
     * Limit how many JoinRequests to update.
     */
    limit?: number
  }

  /**
   * JoinRequest updateManyAndReturn
   */
  export type JoinRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * The data used to update JoinRequests.
     */
    data: XOR<JoinRequestUpdateManyMutationInput, JoinRequestUncheckedUpdateManyInput>
    /**
     * Filter which JoinRequests to update
     */
    where?: JoinRequestWhereInput
    /**
     * Limit how many JoinRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JoinRequest upsert
   */
  export type JoinRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the JoinRequest to update in case it exists.
     */
    where: JoinRequestWhereUniqueInput
    /**
     * In case the JoinRequest found by the `where` argument doesn't exist, create a new JoinRequest with this data.
     */
    create: XOR<JoinRequestCreateInput, JoinRequestUncheckedCreateInput>
    /**
     * In case the JoinRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JoinRequestUpdateInput, JoinRequestUncheckedUpdateInput>
  }

  /**
   * JoinRequest delete
   */
  export type JoinRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
    /**
     * Filter which JoinRequest to delete.
     */
    where: JoinRequestWhereUniqueInput
  }

  /**
   * JoinRequest deleteMany
   */
  export type JoinRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JoinRequests to delete
     */
    where?: JoinRequestWhereInput
    /**
     * Limit how many JoinRequests to delete.
     */
    limit?: number
  }

  /**
   * JoinRequest.inviteLink
   */
  export type JoinRequest$inviteLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InviteLink
     */
    select?: InviteLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InviteLink
     */
    omit?: InviteLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InviteLinkInclude<ExtArgs> | null
    where?: InviteLinkWhereInput
  }

  /**
   * JoinRequest without action
   */
  export type JoinRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JoinRequest
     */
    select?: JoinRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JoinRequest
     */
    omit?: JoinRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoinRequestInclude<ExtArgs> | null
  }


  /**
   * Model ModerationLog
   */

  export type AggregateModerationLog = {
    _count: ModerationLogCountAggregateOutputType | null
    _min: ModerationLogMinAggregateOutputType | null
    _max: ModerationLogMaxAggregateOutputType | null
  }

  export type ModerationLogMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    performedByUserId: string | null
    targetUserId: string | null
    targetMessageId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type ModerationLogMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    performedByUserId: string | null
    targetUserId: string | null
    targetMessageId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type ModerationLogCountAggregateOutputType = {
    id: number
    chatId: number
    performedByUserId: number
    targetUserId: number
    targetMessageId: number
    action: number
    meta: number
    createdAt: number
    _all: number
  }


  export type ModerationLogMinAggregateInputType = {
    id?: true
    chatId?: true
    performedByUserId?: true
    targetUserId?: true
    targetMessageId?: true
    action?: true
    createdAt?: true
  }

  export type ModerationLogMaxAggregateInputType = {
    id?: true
    chatId?: true
    performedByUserId?: true
    targetUserId?: true
    targetMessageId?: true
    action?: true
    createdAt?: true
  }

  export type ModerationLogCountAggregateInputType = {
    id?: true
    chatId?: true
    performedByUserId?: true
    targetUserId?: true
    targetMessageId?: true
    action?: true
    meta?: true
    createdAt?: true
    _all?: true
  }

  export type ModerationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationLog to aggregate.
     */
    where?: ModerationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationLogs to fetch.
     */
    orderBy?: ModerationLogOrderByWithRelationInput | ModerationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModerationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModerationLogs
    **/
    _count?: true | ModerationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModerationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModerationLogMaxAggregateInputType
  }

  export type GetModerationLogAggregateType<T extends ModerationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateModerationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModerationLog[P]>
      : GetScalarType<T[P], AggregateModerationLog[P]>
  }




  export type ModerationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationLogWhereInput
    orderBy?: ModerationLogOrderByWithAggregationInput | ModerationLogOrderByWithAggregationInput[]
    by: ModerationLogScalarFieldEnum[] | ModerationLogScalarFieldEnum
    having?: ModerationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModerationLogCountAggregateInputType | true
    _min?: ModerationLogMinAggregateInputType
    _max?: ModerationLogMaxAggregateInputType
  }

  export type ModerationLogGroupByOutputType = {
    id: string
    chatId: string
    performedByUserId: string
    targetUserId: string | null
    targetMessageId: string | null
    action: string
    meta: JsonValue | null
    createdAt: Date
    _count: ModerationLogCountAggregateOutputType | null
    _min: ModerationLogMinAggregateOutputType | null
    _max: ModerationLogMaxAggregateOutputType | null
  }

  type GetModerationLogGroupByPayload<T extends ModerationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModerationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModerationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModerationLogGroupByOutputType[P]>
            : GetScalarType<T[P], ModerationLogGroupByOutputType[P]>
        }
      >
    >


  export type ModerationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    performedByUserId?: boolean
    targetUserId?: boolean
    targetMessageId?: boolean
    action?: boolean
    meta?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moderationLog"]>

  export type ModerationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    performedByUserId?: boolean
    targetUserId?: boolean
    targetMessageId?: boolean
    action?: boolean
    meta?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moderationLog"]>

  export type ModerationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    performedByUserId?: boolean
    targetUserId?: boolean
    targetMessageId?: boolean
    action?: boolean
    meta?: boolean
    createdAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moderationLog"]>

  export type ModerationLogSelectScalar = {
    id?: boolean
    chatId?: boolean
    performedByUserId?: boolean
    targetUserId?: boolean
    targetMessageId?: boolean
    action?: boolean
    meta?: boolean
    createdAt?: boolean
  }

  export type ModerationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "performedByUserId" | "targetUserId" | "targetMessageId" | "action" | "meta" | "createdAt", ExtArgs["result"]["moderationLog"]>
  export type ModerationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ModerationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ModerationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $ModerationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModerationLog"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      performedByUserId: string
      targetUserId: string | null
      targetMessageId: string | null
      action: string
      meta: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["moderationLog"]>
    composites: {}
  }

  type ModerationLogGetPayload<S extends boolean | null | undefined | ModerationLogDefaultArgs> = $Result.GetResult<Prisma.$ModerationLogPayload, S>

  type ModerationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModerationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModerationLogCountAggregateInputType | true
    }

  export interface ModerationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModerationLog'], meta: { name: 'ModerationLog' } }
    /**
     * Find zero or one ModerationLog that matches the filter.
     * @param {ModerationLogFindUniqueArgs} args - Arguments to find a ModerationLog
     * @example
     * // Get one ModerationLog
     * const moderationLog = await prisma.moderationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModerationLogFindUniqueArgs>(args: SelectSubset<T, ModerationLogFindUniqueArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModerationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModerationLogFindUniqueOrThrowArgs} args - Arguments to find a ModerationLog
     * @example
     * // Get one ModerationLog
     * const moderationLog = await prisma.moderationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModerationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ModerationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogFindFirstArgs} args - Arguments to find a ModerationLog
     * @example
     * // Get one ModerationLog
     * const moderationLog = await prisma.moderationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModerationLogFindFirstArgs>(args?: SelectSubset<T, ModerationLogFindFirstArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogFindFirstOrThrowArgs} args - Arguments to find a ModerationLog
     * @example
     * // Get one ModerationLog
     * const moderationLog = await prisma.moderationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModerationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ModerationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModerationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModerationLogs
     * const moderationLogs = await prisma.moderationLog.findMany()
     * 
     * // Get first 10 ModerationLogs
     * const moderationLogs = await prisma.moderationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moderationLogWithIdOnly = await prisma.moderationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModerationLogFindManyArgs>(args?: SelectSubset<T, ModerationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModerationLog.
     * @param {ModerationLogCreateArgs} args - Arguments to create a ModerationLog.
     * @example
     * // Create one ModerationLog
     * const ModerationLog = await prisma.moderationLog.create({
     *   data: {
     *     // ... data to create a ModerationLog
     *   }
     * })
     * 
     */
    create<T extends ModerationLogCreateArgs>(args: SelectSubset<T, ModerationLogCreateArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModerationLogs.
     * @param {ModerationLogCreateManyArgs} args - Arguments to create many ModerationLogs.
     * @example
     * // Create many ModerationLogs
     * const moderationLog = await prisma.moderationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModerationLogCreateManyArgs>(args?: SelectSubset<T, ModerationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModerationLogs and returns the data saved in the database.
     * @param {ModerationLogCreateManyAndReturnArgs} args - Arguments to create many ModerationLogs.
     * @example
     * // Create many ModerationLogs
     * const moderationLog = await prisma.moderationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModerationLogs and only return the `id`
     * const moderationLogWithIdOnly = await prisma.moderationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModerationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ModerationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModerationLog.
     * @param {ModerationLogDeleteArgs} args - Arguments to delete one ModerationLog.
     * @example
     * // Delete one ModerationLog
     * const ModerationLog = await prisma.moderationLog.delete({
     *   where: {
     *     // ... filter to delete one ModerationLog
     *   }
     * })
     * 
     */
    delete<T extends ModerationLogDeleteArgs>(args: SelectSubset<T, ModerationLogDeleteArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModerationLog.
     * @param {ModerationLogUpdateArgs} args - Arguments to update one ModerationLog.
     * @example
     * // Update one ModerationLog
     * const moderationLog = await prisma.moderationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModerationLogUpdateArgs>(args: SelectSubset<T, ModerationLogUpdateArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModerationLogs.
     * @param {ModerationLogDeleteManyArgs} args - Arguments to filter ModerationLogs to delete.
     * @example
     * // Delete a few ModerationLogs
     * const { count } = await prisma.moderationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModerationLogDeleteManyArgs>(args?: SelectSubset<T, ModerationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModerationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModerationLogs
     * const moderationLog = await prisma.moderationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModerationLogUpdateManyArgs>(args: SelectSubset<T, ModerationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModerationLogs and returns the data updated in the database.
     * @param {ModerationLogUpdateManyAndReturnArgs} args - Arguments to update many ModerationLogs.
     * @example
     * // Update many ModerationLogs
     * const moderationLog = await prisma.moderationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModerationLogs and only return the `id`
     * const moderationLogWithIdOnly = await prisma.moderationLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ModerationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ModerationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModerationLog.
     * @param {ModerationLogUpsertArgs} args - Arguments to update or create a ModerationLog.
     * @example
     * // Update or create a ModerationLog
     * const moderationLog = await prisma.moderationLog.upsert({
     *   create: {
     *     // ... data to create a ModerationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModerationLog we want to update
     *   }
     * })
     */
    upsert<T extends ModerationLogUpsertArgs>(args: SelectSubset<T, ModerationLogUpsertArgs<ExtArgs>>): Prisma__ModerationLogClient<$Result.GetResult<Prisma.$ModerationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModerationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogCountArgs} args - Arguments to filter ModerationLogs to count.
     * @example
     * // Count the number of ModerationLogs
     * const count = await prisma.moderationLog.count({
     *   where: {
     *     // ... the filter for the ModerationLogs we want to count
     *   }
     * })
    **/
    count<T extends ModerationLogCountArgs>(
      args?: Subset<T, ModerationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModerationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModerationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModerationLogAggregateArgs>(args: Subset<T, ModerationLogAggregateArgs>): Prisma.PrismaPromise<GetModerationLogAggregateType<T>>

    /**
     * Group by ModerationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationLogGroupByArgs} args - Group by arguments.
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
      T extends ModerationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModerationLogGroupByArgs['orderBy'] }
        : { orderBy?: ModerationLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ModerationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModerationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModerationLog model
   */
  readonly fields: ModerationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModerationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModerationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ModerationLog model
   */
  interface ModerationLogFieldRefs {
    readonly id: FieldRef<"ModerationLog", 'String'>
    readonly chatId: FieldRef<"ModerationLog", 'String'>
    readonly performedByUserId: FieldRef<"ModerationLog", 'String'>
    readonly targetUserId: FieldRef<"ModerationLog", 'String'>
    readonly targetMessageId: FieldRef<"ModerationLog", 'String'>
    readonly action: FieldRef<"ModerationLog", 'String'>
    readonly meta: FieldRef<"ModerationLog", 'Json'>
    readonly createdAt: FieldRef<"ModerationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModerationLog findUnique
   */
  export type ModerationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter, which ModerationLog to fetch.
     */
    where: ModerationLogWhereUniqueInput
  }

  /**
   * ModerationLog findUniqueOrThrow
   */
  export type ModerationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter, which ModerationLog to fetch.
     */
    where: ModerationLogWhereUniqueInput
  }

  /**
   * ModerationLog findFirst
   */
  export type ModerationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter, which ModerationLog to fetch.
     */
    where?: ModerationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationLogs to fetch.
     */
    orderBy?: ModerationLogOrderByWithRelationInput | ModerationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationLogs.
     */
    cursor?: ModerationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationLogs.
     */
    distinct?: ModerationLogScalarFieldEnum | ModerationLogScalarFieldEnum[]
  }

  /**
   * ModerationLog findFirstOrThrow
   */
  export type ModerationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter, which ModerationLog to fetch.
     */
    where?: ModerationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationLogs to fetch.
     */
    orderBy?: ModerationLogOrderByWithRelationInput | ModerationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationLogs.
     */
    cursor?: ModerationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationLogs.
     */
    distinct?: ModerationLogScalarFieldEnum | ModerationLogScalarFieldEnum[]
  }

  /**
   * ModerationLog findMany
   */
  export type ModerationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter, which ModerationLogs to fetch.
     */
    where?: ModerationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationLogs to fetch.
     */
    orderBy?: ModerationLogOrderByWithRelationInput | ModerationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModerationLogs.
     */
    cursor?: ModerationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationLogs.
     */
    skip?: number
    distinct?: ModerationLogScalarFieldEnum | ModerationLogScalarFieldEnum[]
  }

  /**
   * ModerationLog create
   */
  export type ModerationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ModerationLog.
     */
    data: XOR<ModerationLogCreateInput, ModerationLogUncheckedCreateInput>
  }

  /**
   * ModerationLog createMany
   */
  export type ModerationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModerationLogs.
     */
    data: ModerationLogCreateManyInput | ModerationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModerationLog createManyAndReturn
   */
  export type ModerationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * The data used to create many ModerationLogs.
     */
    data: ModerationLogCreateManyInput | ModerationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModerationLog update
   */
  export type ModerationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ModerationLog.
     */
    data: XOR<ModerationLogUpdateInput, ModerationLogUncheckedUpdateInput>
    /**
     * Choose, which ModerationLog to update.
     */
    where: ModerationLogWhereUniqueInput
  }

  /**
   * ModerationLog updateMany
   */
  export type ModerationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModerationLogs.
     */
    data: XOR<ModerationLogUpdateManyMutationInput, ModerationLogUncheckedUpdateManyInput>
    /**
     * Filter which ModerationLogs to update
     */
    where?: ModerationLogWhereInput
    /**
     * Limit how many ModerationLogs to update.
     */
    limit?: number
  }

  /**
   * ModerationLog updateManyAndReturn
   */
  export type ModerationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * The data used to update ModerationLogs.
     */
    data: XOR<ModerationLogUpdateManyMutationInput, ModerationLogUncheckedUpdateManyInput>
    /**
     * Filter which ModerationLogs to update
     */
    where?: ModerationLogWhereInput
    /**
     * Limit how many ModerationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModerationLog upsert
   */
  export type ModerationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ModerationLog to update in case it exists.
     */
    where: ModerationLogWhereUniqueInput
    /**
     * In case the ModerationLog found by the `where` argument doesn't exist, create a new ModerationLog with this data.
     */
    create: XOR<ModerationLogCreateInput, ModerationLogUncheckedCreateInput>
    /**
     * In case the ModerationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModerationLogUpdateInput, ModerationLogUncheckedUpdateInput>
  }

  /**
   * ModerationLog delete
   */
  export type ModerationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
    /**
     * Filter which ModerationLog to delete.
     */
    where: ModerationLogWhereUniqueInput
  }

  /**
   * ModerationLog deleteMany
   */
  export type ModerationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationLogs to delete
     */
    where?: ModerationLogWhereInput
    /**
     * Limit how many ModerationLogs to delete.
     */
    limit?: number
  }

  /**
   * ModerationLog without action
   */
  export type ModerationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationLog
     */
    select?: ModerationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationLog
     */
    omit?: ModerationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationLogInclude<ExtArgs> | null
  }


  /**
   * Model ChatPin
   */

  export type AggregateChatPin = {
    _count: ChatPinCountAggregateOutputType | null
    _min: ChatPinMinAggregateOutputType | null
    _max: ChatPinMaxAggregateOutputType | null
  }

  export type ChatPinMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    pinnedAt: Date | null
  }

  export type ChatPinMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    pinnedAt: Date | null
  }

  export type ChatPinCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    pinnedAt: number
    _all: number
  }


  export type ChatPinMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    pinnedAt?: true
  }

  export type ChatPinMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    pinnedAt?: true
  }

  export type ChatPinCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    pinnedAt?: true
    _all?: true
  }

  export type ChatPinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatPin to aggregate.
     */
    where?: ChatPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPins to fetch.
     */
    orderBy?: ChatPinOrderByWithRelationInput | ChatPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatPins
    **/
    _count?: true | ChatPinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatPinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatPinMaxAggregateInputType
  }

  export type GetChatPinAggregateType<T extends ChatPinAggregateArgs> = {
        [P in keyof T & keyof AggregateChatPin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatPin[P]>
      : GetScalarType<T[P], AggregateChatPin[P]>
  }




  export type ChatPinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatPinWhereInput
    orderBy?: ChatPinOrderByWithAggregationInput | ChatPinOrderByWithAggregationInput[]
    by: ChatPinScalarFieldEnum[] | ChatPinScalarFieldEnum
    having?: ChatPinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatPinCountAggregateInputType | true
    _min?: ChatPinMinAggregateInputType
    _max?: ChatPinMaxAggregateInputType
  }

  export type ChatPinGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    pinnedAt: Date
    _count: ChatPinCountAggregateOutputType | null
    _min: ChatPinMinAggregateOutputType | null
    _max: ChatPinMaxAggregateOutputType | null
  }

  type GetChatPinGroupByPayload<T extends ChatPinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatPinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatPinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatPinGroupByOutputType[P]>
            : GetScalarType<T[P], ChatPinGroupByOutputType[P]>
        }
      >
    >


  export type ChatPinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    pinnedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPin"]>

  export type ChatPinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    pinnedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPin"]>

  export type ChatPinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    pinnedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatPin"]>

  export type ChatPinSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    pinnedAt?: boolean
  }

  export type ChatPinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "pinnedAt", ExtArgs["result"]["chatPin"]>
  export type ChatPinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatPinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatPinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $ChatPinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatPin"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      pinnedAt: Date
    }, ExtArgs["result"]["chatPin"]>
    composites: {}
  }

  type ChatPinGetPayload<S extends boolean | null | undefined | ChatPinDefaultArgs> = $Result.GetResult<Prisma.$ChatPinPayload, S>

  type ChatPinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatPinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatPinCountAggregateInputType | true
    }

  export interface ChatPinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatPin'], meta: { name: 'ChatPin' } }
    /**
     * Find zero or one ChatPin that matches the filter.
     * @param {ChatPinFindUniqueArgs} args - Arguments to find a ChatPin
     * @example
     * // Get one ChatPin
     * const chatPin = await prisma.chatPin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatPinFindUniqueArgs>(args: SelectSubset<T, ChatPinFindUniqueArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatPin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatPinFindUniqueOrThrowArgs} args - Arguments to find a ChatPin
     * @example
     * // Get one ChatPin
     * const chatPin = await prisma.chatPin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatPinFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatPinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatPin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinFindFirstArgs} args - Arguments to find a ChatPin
     * @example
     * // Get one ChatPin
     * const chatPin = await prisma.chatPin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatPinFindFirstArgs>(args?: SelectSubset<T, ChatPinFindFirstArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatPin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinFindFirstOrThrowArgs} args - Arguments to find a ChatPin
     * @example
     * // Get one ChatPin
     * const chatPin = await prisma.chatPin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatPinFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatPinFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatPins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatPins
     * const chatPins = await prisma.chatPin.findMany()
     * 
     * // Get first 10 ChatPins
     * const chatPins = await prisma.chatPin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatPinWithIdOnly = await prisma.chatPin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatPinFindManyArgs>(args?: SelectSubset<T, ChatPinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatPin.
     * @param {ChatPinCreateArgs} args - Arguments to create a ChatPin.
     * @example
     * // Create one ChatPin
     * const ChatPin = await prisma.chatPin.create({
     *   data: {
     *     // ... data to create a ChatPin
     *   }
     * })
     * 
     */
    create<T extends ChatPinCreateArgs>(args: SelectSubset<T, ChatPinCreateArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatPins.
     * @param {ChatPinCreateManyArgs} args - Arguments to create many ChatPins.
     * @example
     * // Create many ChatPins
     * const chatPin = await prisma.chatPin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatPinCreateManyArgs>(args?: SelectSubset<T, ChatPinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatPins and returns the data saved in the database.
     * @param {ChatPinCreateManyAndReturnArgs} args - Arguments to create many ChatPins.
     * @example
     * // Create many ChatPins
     * const chatPin = await prisma.chatPin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatPins and only return the `id`
     * const chatPinWithIdOnly = await prisma.chatPin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatPinCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatPinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatPin.
     * @param {ChatPinDeleteArgs} args - Arguments to delete one ChatPin.
     * @example
     * // Delete one ChatPin
     * const ChatPin = await prisma.chatPin.delete({
     *   where: {
     *     // ... filter to delete one ChatPin
     *   }
     * })
     * 
     */
    delete<T extends ChatPinDeleteArgs>(args: SelectSubset<T, ChatPinDeleteArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatPin.
     * @param {ChatPinUpdateArgs} args - Arguments to update one ChatPin.
     * @example
     * // Update one ChatPin
     * const chatPin = await prisma.chatPin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatPinUpdateArgs>(args: SelectSubset<T, ChatPinUpdateArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatPins.
     * @param {ChatPinDeleteManyArgs} args - Arguments to filter ChatPins to delete.
     * @example
     * // Delete a few ChatPins
     * const { count } = await prisma.chatPin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatPinDeleteManyArgs>(args?: SelectSubset<T, ChatPinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatPins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatPins
     * const chatPin = await prisma.chatPin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatPinUpdateManyArgs>(args: SelectSubset<T, ChatPinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatPins and returns the data updated in the database.
     * @param {ChatPinUpdateManyAndReturnArgs} args - Arguments to update many ChatPins.
     * @example
     * // Update many ChatPins
     * const chatPin = await prisma.chatPin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatPins and only return the `id`
     * const chatPinWithIdOnly = await prisma.chatPin.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatPinUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatPinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatPin.
     * @param {ChatPinUpsertArgs} args - Arguments to update or create a ChatPin.
     * @example
     * // Update or create a ChatPin
     * const chatPin = await prisma.chatPin.upsert({
     *   create: {
     *     // ... data to create a ChatPin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatPin we want to update
     *   }
     * })
     */
    upsert<T extends ChatPinUpsertArgs>(args: SelectSubset<T, ChatPinUpsertArgs<ExtArgs>>): Prisma__ChatPinClient<$Result.GetResult<Prisma.$ChatPinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatPins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinCountArgs} args - Arguments to filter ChatPins to count.
     * @example
     * // Count the number of ChatPins
     * const count = await prisma.chatPin.count({
     *   where: {
     *     // ... the filter for the ChatPins we want to count
     *   }
     * })
    **/
    count<T extends ChatPinCountArgs>(
      args?: Subset<T, ChatPinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatPinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatPin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatPinAggregateArgs>(args: Subset<T, ChatPinAggregateArgs>): Prisma.PrismaPromise<GetChatPinAggregateType<T>>

    /**
     * Group by ChatPin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinGroupByArgs} args - Group by arguments.
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
      T extends ChatPinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatPinGroupByArgs['orderBy'] }
        : { orderBy?: ChatPinGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatPinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatPinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatPin model
   */
  readonly fields: ChatPinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatPin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatPinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatPin model
   */
  interface ChatPinFieldRefs {
    readonly id: FieldRef<"ChatPin", 'String'>
    readonly chatId: FieldRef<"ChatPin", 'String'>
    readonly userId: FieldRef<"ChatPin", 'String'>
    readonly pinnedAt: FieldRef<"ChatPin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatPin findUnique
   */
  export type ChatPinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter, which ChatPin to fetch.
     */
    where: ChatPinWhereUniqueInput
  }

  /**
   * ChatPin findUniqueOrThrow
   */
  export type ChatPinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter, which ChatPin to fetch.
     */
    where: ChatPinWhereUniqueInput
  }

  /**
   * ChatPin findFirst
   */
  export type ChatPinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter, which ChatPin to fetch.
     */
    where?: ChatPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPins to fetch.
     */
    orderBy?: ChatPinOrderByWithRelationInput | ChatPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatPins.
     */
    cursor?: ChatPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatPins.
     */
    distinct?: ChatPinScalarFieldEnum | ChatPinScalarFieldEnum[]
  }

  /**
   * ChatPin findFirstOrThrow
   */
  export type ChatPinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter, which ChatPin to fetch.
     */
    where?: ChatPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPins to fetch.
     */
    orderBy?: ChatPinOrderByWithRelationInput | ChatPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatPins.
     */
    cursor?: ChatPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatPins.
     */
    distinct?: ChatPinScalarFieldEnum | ChatPinScalarFieldEnum[]
  }

  /**
   * ChatPin findMany
   */
  export type ChatPinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter, which ChatPins to fetch.
     */
    where?: ChatPinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatPins to fetch.
     */
    orderBy?: ChatPinOrderByWithRelationInput | ChatPinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatPins.
     */
    cursor?: ChatPinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatPins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatPins.
     */
    skip?: number
    distinct?: ChatPinScalarFieldEnum | ChatPinScalarFieldEnum[]
  }

  /**
   * ChatPin create
   */
  export type ChatPinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatPin.
     */
    data: XOR<ChatPinCreateInput, ChatPinUncheckedCreateInput>
  }

  /**
   * ChatPin createMany
   */
  export type ChatPinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatPins.
     */
    data: ChatPinCreateManyInput | ChatPinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatPin createManyAndReturn
   */
  export type ChatPinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * The data used to create many ChatPins.
     */
    data: ChatPinCreateManyInput | ChatPinCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatPin update
   */
  export type ChatPinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatPin.
     */
    data: XOR<ChatPinUpdateInput, ChatPinUncheckedUpdateInput>
    /**
     * Choose, which ChatPin to update.
     */
    where: ChatPinWhereUniqueInput
  }

  /**
   * ChatPin updateMany
   */
  export type ChatPinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatPins.
     */
    data: XOR<ChatPinUpdateManyMutationInput, ChatPinUncheckedUpdateManyInput>
    /**
     * Filter which ChatPins to update
     */
    where?: ChatPinWhereInput
    /**
     * Limit how many ChatPins to update.
     */
    limit?: number
  }

  /**
   * ChatPin updateManyAndReturn
   */
  export type ChatPinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * The data used to update ChatPins.
     */
    data: XOR<ChatPinUpdateManyMutationInput, ChatPinUncheckedUpdateManyInput>
    /**
     * Filter which ChatPins to update
     */
    where?: ChatPinWhereInput
    /**
     * Limit how many ChatPins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatPin upsert
   */
  export type ChatPinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatPin to update in case it exists.
     */
    where: ChatPinWhereUniqueInput
    /**
     * In case the ChatPin found by the `where` argument doesn't exist, create a new ChatPin with this data.
     */
    create: XOR<ChatPinCreateInput, ChatPinUncheckedCreateInput>
    /**
     * In case the ChatPin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatPinUpdateInput, ChatPinUncheckedUpdateInput>
  }

  /**
   * ChatPin delete
   */
  export type ChatPinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
    /**
     * Filter which ChatPin to delete.
     */
    where: ChatPinWhereUniqueInput
  }

  /**
   * ChatPin deleteMany
   */
  export type ChatPinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatPins to delete
     */
    where?: ChatPinWhereInput
    /**
     * Limit how many ChatPins to delete.
     */
    limit?: number
  }

  /**
   * ChatPin without action
   */
  export type ChatPinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatPin
     */
    select?: ChatPinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatPin
     */
    omit?: ChatPinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinInclude<ExtArgs> | null
  }


  /**
   * Model ChatMute
   */

  export type AggregateChatMute = {
    _count: ChatMuteCountAggregateOutputType | null
    _min: ChatMuteMinAggregateOutputType | null
    _max: ChatMuteMaxAggregateOutputType | null
  }

  export type ChatMuteMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    mutedAt: Date | null
  }

  export type ChatMuteMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    mutedAt: Date | null
  }

  export type ChatMuteCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    mutedAt: number
    _all: number
  }


  export type ChatMuteMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    mutedAt?: true
  }

  export type ChatMuteMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    mutedAt?: true
  }

  export type ChatMuteCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    mutedAt?: true
    _all?: true
  }

  export type ChatMuteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMute to aggregate.
     */
    where?: ChatMuteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMutes to fetch.
     */
    orderBy?: ChatMuteOrderByWithRelationInput | ChatMuteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMuteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMutes
    **/
    _count?: true | ChatMuteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMuteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMuteMaxAggregateInputType
  }

  export type GetChatMuteAggregateType<T extends ChatMuteAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMute[P]>
      : GetScalarType<T[P], AggregateChatMute[P]>
  }




  export type ChatMuteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMuteWhereInput
    orderBy?: ChatMuteOrderByWithAggregationInput | ChatMuteOrderByWithAggregationInput[]
    by: ChatMuteScalarFieldEnum[] | ChatMuteScalarFieldEnum
    having?: ChatMuteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMuteCountAggregateInputType | true
    _min?: ChatMuteMinAggregateInputType
    _max?: ChatMuteMaxAggregateInputType
  }

  export type ChatMuteGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    mutedAt: Date
    _count: ChatMuteCountAggregateOutputType | null
    _min: ChatMuteMinAggregateOutputType | null
    _max: ChatMuteMaxAggregateOutputType | null
  }

  type GetChatMuteGroupByPayload<T extends ChatMuteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMuteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMuteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMuteGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMuteGroupByOutputType[P]>
        }
      >
    >


  export type ChatMuteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    mutedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMute"]>

  export type ChatMuteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    mutedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMute"]>

  export type ChatMuteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    mutedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMute"]>

  export type ChatMuteSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    mutedAt?: boolean
  }

  export type ChatMuteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "mutedAt", ExtArgs["result"]["chatMute"]>
  export type ChatMuteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatMuteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type ChatMuteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $ChatMutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMute"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      mutedAt: Date
    }, ExtArgs["result"]["chatMute"]>
    composites: {}
  }

  type ChatMuteGetPayload<S extends boolean | null | undefined | ChatMuteDefaultArgs> = $Result.GetResult<Prisma.$ChatMutePayload, S>

  type ChatMuteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMuteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMuteCountAggregateInputType | true
    }

  export interface ChatMuteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMute'], meta: { name: 'ChatMute' } }
    /**
     * Find zero or one ChatMute that matches the filter.
     * @param {ChatMuteFindUniqueArgs} args - Arguments to find a ChatMute
     * @example
     * // Get one ChatMute
     * const chatMute = await prisma.chatMute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMuteFindUniqueArgs>(args: SelectSubset<T, ChatMuteFindUniqueArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMuteFindUniqueOrThrowArgs} args - Arguments to find a ChatMute
     * @example
     * // Get one ChatMute
     * const chatMute = await prisma.chatMute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMuteFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMuteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteFindFirstArgs} args - Arguments to find a ChatMute
     * @example
     * // Get one ChatMute
     * const chatMute = await prisma.chatMute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMuteFindFirstArgs>(args?: SelectSubset<T, ChatMuteFindFirstArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteFindFirstOrThrowArgs} args - Arguments to find a ChatMute
     * @example
     * // Get one ChatMute
     * const chatMute = await prisma.chatMute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMuteFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMuteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMutes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMutes
     * const chatMutes = await prisma.chatMute.findMany()
     * 
     * // Get first 10 ChatMutes
     * const chatMutes = await prisma.chatMute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMuteWithIdOnly = await prisma.chatMute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMuteFindManyArgs>(args?: SelectSubset<T, ChatMuteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMute.
     * @param {ChatMuteCreateArgs} args - Arguments to create a ChatMute.
     * @example
     * // Create one ChatMute
     * const ChatMute = await prisma.chatMute.create({
     *   data: {
     *     // ... data to create a ChatMute
     *   }
     * })
     * 
     */
    create<T extends ChatMuteCreateArgs>(args: SelectSubset<T, ChatMuteCreateArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMutes.
     * @param {ChatMuteCreateManyArgs} args - Arguments to create many ChatMutes.
     * @example
     * // Create many ChatMutes
     * const chatMute = await prisma.chatMute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMuteCreateManyArgs>(args?: SelectSubset<T, ChatMuteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMutes and returns the data saved in the database.
     * @param {ChatMuteCreateManyAndReturnArgs} args - Arguments to create many ChatMutes.
     * @example
     * // Create many ChatMutes
     * const chatMute = await prisma.chatMute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMutes and only return the `id`
     * const chatMuteWithIdOnly = await prisma.chatMute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMuteCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMuteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMute.
     * @param {ChatMuteDeleteArgs} args - Arguments to delete one ChatMute.
     * @example
     * // Delete one ChatMute
     * const ChatMute = await prisma.chatMute.delete({
     *   where: {
     *     // ... filter to delete one ChatMute
     *   }
     * })
     * 
     */
    delete<T extends ChatMuteDeleteArgs>(args: SelectSubset<T, ChatMuteDeleteArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMute.
     * @param {ChatMuteUpdateArgs} args - Arguments to update one ChatMute.
     * @example
     * // Update one ChatMute
     * const chatMute = await prisma.chatMute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMuteUpdateArgs>(args: SelectSubset<T, ChatMuteUpdateArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMutes.
     * @param {ChatMuteDeleteManyArgs} args - Arguments to filter ChatMutes to delete.
     * @example
     * // Delete a few ChatMutes
     * const { count } = await prisma.chatMute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMuteDeleteManyArgs>(args?: SelectSubset<T, ChatMuteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMutes
     * const chatMute = await prisma.chatMute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMuteUpdateManyArgs>(args: SelectSubset<T, ChatMuteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMutes and returns the data updated in the database.
     * @param {ChatMuteUpdateManyAndReturnArgs} args - Arguments to update many ChatMutes.
     * @example
     * // Update many ChatMutes
     * const chatMute = await prisma.chatMute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMutes and only return the `id`
     * const chatMuteWithIdOnly = await prisma.chatMute.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMuteUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMuteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMute.
     * @param {ChatMuteUpsertArgs} args - Arguments to update or create a ChatMute.
     * @example
     * // Update or create a ChatMute
     * const chatMute = await prisma.chatMute.upsert({
     *   create: {
     *     // ... data to create a ChatMute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMute we want to update
     *   }
     * })
     */
    upsert<T extends ChatMuteUpsertArgs>(args: SelectSubset<T, ChatMuteUpsertArgs<ExtArgs>>): Prisma__ChatMuteClient<$Result.GetResult<Prisma.$ChatMutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteCountArgs} args - Arguments to filter ChatMutes to count.
     * @example
     * // Count the number of ChatMutes
     * const count = await prisma.chatMute.count({
     *   where: {
     *     // ... the filter for the ChatMutes we want to count
     *   }
     * })
    **/
    count<T extends ChatMuteCountArgs>(
      args?: Subset<T, ChatMuteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMuteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMuteAggregateArgs>(args: Subset<T, ChatMuteAggregateArgs>): Prisma.PrismaPromise<GetChatMuteAggregateType<T>>

    /**
     * Group by ChatMute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMuteGroupByArgs} args - Group by arguments.
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
      T extends ChatMuteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMuteGroupByArgs['orderBy'] }
        : { orderBy?: ChatMuteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMuteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMuteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMute model
   */
  readonly fields: ChatMuteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMuteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatMute model
   */
  interface ChatMuteFieldRefs {
    readonly id: FieldRef<"ChatMute", 'String'>
    readonly chatId: FieldRef<"ChatMute", 'String'>
    readonly userId: FieldRef<"ChatMute", 'String'>
    readonly mutedAt: FieldRef<"ChatMute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMute findUnique
   */
  export type ChatMuteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter, which ChatMute to fetch.
     */
    where: ChatMuteWhereUniqueInput
  }

  /**
   * ChatMute findUniqueOrThrow
   */
  export type ChatMuteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter, which ChatMute to fetch.
     */
    where: ChatMuteWhereUniqueInput
  }

  /**
   * ChatMute findFirst
   */
  export type ChatMuteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter, which ChatMute to fetch.
     */
    where?: ChatMuteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMutes to fetch.
     */
    orderBy?: ChatMuteOrderByWithRelationInput | ChatMuteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMutes.
     */
    cursor?: ChatMuteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMutes.
     */
    distinct?: ChatMuteScalarFieldEnum | ChatMuteScalarFieldEnum[]
  }

  /**
   * ChatMute findFirstOrThrow
   */
  export type ChatMuteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter, which ChatMute to fetch.
     */
    where?: ChatMuteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMutes to fetch.
     */
    orderBy?: ChatMuteOrderByWithRelationInput | ChatMuteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMutes.
     */
    cursor?: ChatMuteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMutes.
     */
    distinct?: ChatMuteScalarFieldEnum | ChatMuteScalarFieldEnum[]
  }

  /**
   * ChatMute findMany
   */
  export type ChatMuteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter, which ChatMutes to fetch.
     */
    where?: ChatMuteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMutes to fetch.
     */
    orderBy?: ChatMuteOrderByWithRelationInput | ChatMuteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMutes.
     */
    cursor?: ChatMuteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMutes.
     */
    skip?: number
    distinct?: ChatMuteScalarFieldEnum | ChatMuteScalarFieldEnum[]
  }

  /**
   * ChatMute create
   */
  export type ChatMuteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMute.
     */
    data: XOR<ChatMuteCreateInput, ChatMuteUncheckedCreateInput>
  }

  /**
   * ChatMute createMany
   */
  export type ChatMuteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMutes.
     */
    data: ChatMuteCreateManyInput | ChatMuteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMute createManyAndReturn
   */
  export type ChatMuteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMutes.
     */
    data: ChatMuteCreateManyInput | ChatMuteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMute update
   */
  export type ChatMuteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMute.
     */
    data: XOR<ChatMuteUpdateInput, ChatMuteUncheckedUpdateInput>
    /**
     * Choose, which ChatMute to update.
     */
    where: ChatMuteWhereUniqueInput
  }

  /**
   * ChatMute updateMany
   */
  export type ChatMuteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMutes.
     */
    data: XOR<ChatMuteUpdateManyMutationInput, ChatMuteUncheckedUpdateManyInput>
    /**
     * Filter which ChatMutes to update
     */
    where?: ChatMuteWhereInput
    /**
     * Limit how many ChatMutes to update.
     */
    limit?: number
  }

  /**
   * ChatMute updateManyAndReturn
   */
  export type ChatMuteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * The data used to update ChatMutes.
     */
    data: XOR<ChatMuteUpdateManyMutationInput, ChatMuteUncheckedUpdateManyInput>
    /**
     * Filter which ChatMutes to update
     */
    where?: ChatMuteWhereInput
    /**
     * Limit how many ChatMutes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMute upsert
   */
  export type ChatMuteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMute to update in case it exists.
     */
    where: ChatMuteWhereUniqueInput
    /**
     * In case the ChatMute found by the `where` argument doesn't exist, create a new ChatMute with this data.
     */
    create: XOR<ChatMuteCreateInput, ChatMuteUncheckedCreateInput>
    /**
     * In case the ChatMute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMuteUpdateInput, ChatMuteUncheckedUpdateInput>
  }

  /**
   * ChatMute delete
   */
  export type ChatMuteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
    /**
     * Filter which ChatMute to delete.
     */
    where: ChatMuteWhereUniqueInput
  }

  /**
   * ChatMute deleteMany
   */
  export type ChatMuteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMutes to delete
     */
    where?: ChatMuteWhereInput
    /**
     * Limit how many ChatMutes to delete.
     */
    limit?: number
  }

  /**
   * ChatMute without action
   */
  export type ChatMuteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMute
     */
    select?: ChatMuteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMute
     */
    omit?: ChatMuteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMuteInclude<ExtArgs> | null
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
   * Model ChatMembershipProjection
   */

  export type AggregateChatMembershipProjection = {
    _count: ChatMembershipProjectionCountAggregateOutputType | null
    _min: ChatMembershipProjectionMinAggregateOutputType | null
    _max: ChatMembershipProjectionMaxAggregateOutputType | null
  }

  export type ChatMembershipProjectionMinAggregateOutputType = {
    chatId: string | null
    userId: string | null
    role: $Enums.ChatMemberRole | null
    status: $Enums.ChatMemberStatus | null
    updatedAt: Date | null
  }

  export type ChatMembershipProjectionMaxAggregateOutputType = {
    chatId: string | null
    userId: string | null
    role: $Enums.ChatMemberRole | null
    status: $Enums.ChatMemberStatus | null
    updatedAt: Date | null
  }

  export type ChatMembershipProjectionCountAggregateOutputType = {
    chatId: number
    userId: number
    role: number
    status: number
    updatedAt: number
    _all: number
  }


  export type ChatMembershipProjectionMinAggregateInputType = {
    chatId?: true
    userId?: true
    role?: true
    status?: true
    updatedAt?: true
  }

  export type ChatMembershipProjectionMaxAggregateInputType = {
    chatId?: true
    userId?: true
    role?: true
    status?: true
    updatedAt?: true
  }

  export type ChatMembershipProjectionCountAggregateInputType = {
    chatId?: true
    userId?: true
    role?: true
    status?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMembershipProjectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjection to aggregate.
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjections to fetch.
     */
    orderBy?: ChatMembershipProjectionOrderByWithRelationInput | ChatMembershipProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMembershipProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMembershipProjections
    **/
    _count?: true | ChatMembershipProjectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMembershipProjectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMembershipProjectionMaxAggregateInputType
  }

  export type GetChatMembershipProjectionAggregateType<T extends ChatMembershipProjectionAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMembershipProjection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMembershipProjection[P]>
      : GetScalarType<T[P], AggregateChatMembershipProjection[P]>
  }




  export type ChatMembershipProjectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMembershipProjectionWhereInput
    orderBy?: ChatMembershipProjectionOrderByWithAggregationInput | ChatMembershipProjectionOrderByWithAggregationInput[]
    by: ChatMembershipProjectionScalarFieldEnum[] | ChatMembershipProjectionScalarFieldEnum
    having?: ChatMembershipProjectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMembershipProjectionCountAggregateInputType | true
    _min?: ChatMembershipProjectionMinAggregateInputType
    _max?: ChatMembershipProjectionMaxAggregateInputType
  }

  export type ChatMembershipProjectionGroupByOutputType = {
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    updatedAt: Date
    _count: ChatMembershipProjectionCountAggregateOutputType | null
    _min: ChatMembershipProjectionMinAggregateOutputType | null
    _max: ChatMembershipProjectionMaxAggregateOutputType | null
  }

  type GetChatMembershipProjectionGroupByPayload<T extends ChatMembershipProjectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMembershipProjectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMembershipProjectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMembershipProjectionGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMembershipProjectionGroupByOutputType[P]>
        }
      >
    >


  export type ChatMembershipProjectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjection"]>

  export type ChatMembershipProjectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjection"]>

  export type ChatMembershipProjectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjection"]>

  export type ChatMembershipProjectionSelectScalar = {
    chatId?: boolean
    userId?: boolean
    role?: boolean
    status?: boolean
    updatedAt?: boolean
  }

  export type ChatMembershipProjectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "userId" | "role" | "status" | "updatedAt", ExtArgs["result"]["chatMembershipProjection"]>

  export type $ChatMembershipProjectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMembershipProjection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      chatId: string
      userId: string
      role: $Enums.ChatMemberRole
      status: $Enums.ChatMemberStatus
      updatedAt: Date
    }, ExtArgs["result"]["chatMembershipProjection"]>
    composites: {}
  }

  type ChatMembershipProjectionGetPayload<S extends boolean | null | undefined | ChatMembershipProjectionDefaultArgs> = $Result.GetResult<Prisma.$ChatMembershipProjectionPayload, S>

  type ChatMembershipProjectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMembershipProjectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMembershipProjectionCountAggregateInputType | true
    }

  export interface ChatMembershipProjectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMembershipProjection'], meta: { name: 'ChatMembershipProjection' } }
    /**
     * Find zero or one ChatMembershipProjection that matches the filter.
     * @param {ChatMembershipProjectionFindUniqueArgs} args - Arguments to find a ChatMembershipProjection
     * @example
     * // Get one ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMembershipProjectionFindUniqueArgs>(args: SelectSubset<T, ChatMembershipProjectionFindUniqueArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMembershipProjection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMembershipProjectionFindUniqueOrThrowArgs} args - Arguments to find a ChatMembershipProjection
     * @example
     * // Get one ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMembershipProjectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMembershipProjectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionFindFirstArgs} args - Arguments to find a ChatMembershipProjection
     * @example
     * // Get one ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMembershipProjectionFindFirstArgs>(args?: SelectSubset<T, ChatMembershipProjectionFindFirstArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionFindFirstOrThrowArgs} args - Arguments to find a ChatMembershipProjection
     * @example
     * // Get one ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMembershipProjectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMembershipProjectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMembershipProjections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMembershipProjections
     * const chatMembershipProjections = await prisma.chatMembershipProjection.findMany()
     * 
     * // Get first 10 ChatMembershipProjections
     * const chatMembershipProjections = await prisma.chatMembershipProjection.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const chatMembershipProjectionWithChatIdOnly = await prisma.chatMembershipProjection.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends ChatMembershipProjectionFindManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMembershipProjection.
     * @param {ChatMembershipProjectionCreateArgs} args - Arguments to create a ChatMembershipProjection.
     * @example
     * // Create one ChatMembershipProjection
     * const ChatMembershipProjection = await prisma.chatMembershipProjection.create({
     *   data: {
     *     // ... data to create a ChatMembershipProjection
     *   }
     * })
     * 
     */
    create<T extends ChatMembershipProjectionCreateArgs>(args: SelectSubset<T, ChatMembershipProjectionCreateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMembershipProjections.
     * @param {ChatMembershipProjectionCreateManyArgs} args - Arguments to create many ChatMembershipProjections.
     * @example
     * // Create many ChatMembershipProjections
     * const chatMembershipProjection = await prisma.chatMembershipProjection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMembershipProjectionCreateManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMembershipProjections and returns the data saved in the database.
     * @param {ChatMembershipProjectionCreateManyAndReturnArgs} args - Arguments to create many ChatMembershipProjections.
     * @example
     * // Create many ChatMembershipProjections
     * const chatMembershipProjection = await prisma.chatMembershipProjection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMembershipProjections and only return the `chatId`
     * const chatMembershipProjectionWithChatIdOnly = await prisma.chatMembershipProjection.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMembershipProjectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMembershipProjectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMembershipProjection.
     * @param {ChatMembershipProjectionDeleteArgs} args - Arguments to delete one ChatMembershipProjection.
     * @example
     * // Delete one ChatMembershipProjection
     * const ChatMembershipProjection = await prisma.chatMembershipProjection.delete({
     *   where: {
     *     // ... filter to delete one ChatMembershipProjection
     *   }
     * })
     * 
     */
    delete<T extends ChatMembershipProjectionDeleteArgs>(args: SelectSubset<T, ChatMembershipProjectionDeleteArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMembershipProjection.
     * @param {ChatMembershipProjectionUpdateArgs} args - Arguments to update one ChatMembershipProjection.
     * @example
     * // Update one ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMembershipProjectionUpdateArgs>(args: SelectSubset<T, ChatMembershipProjectionUpdateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMembershipProjections.
     * @param {ChatMembershipProjectionDeleteManyArgs} args - Arguments to filter ChatMembershipProjections to delete.
     * @example
     * // Delete a few ChatMembershipProjections
     * const { count } = await prisma.chatMembershipProjection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMembershipProjectionDeleteManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMembershipProjections
     * const chatMembershipProjection = await prisma.chatMembershipProjection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMembershipProjectionUpdateManyArgs>(args: SelectSubset<T, ChatMembershipProjectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjections and returns the data updated in the database.
     * @param {ChatMembershipProjectionUpdateManyAndReturnArgs} args - Arguments to update many ChatMembershipProjections.
     * @example
     * // Update many ChatMembershipProjections
     * const chatMembershipProjection = await prisma.chatMembershipProjection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMembershipProjections and only return the `chatId`
     * const chatMembershipProjectionWithChatIdOnly = await prisma.chatMembershipProjection.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMembershipProjectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMembershipProjectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMembershipProjection.
     * @param {ChatMembershipProjectionUpsertArgs} args - Arguments to update or create a ChatMembershipProjection.
     * @example
     * // Update or create a ChatMembershipProjection
     * const chatMembershipProjection = await prisma.chatMembershipProjection.upsert({
     *   create: {
     *     // ... data to create a ChatMembershipProjection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMembershipProjection we want to update
     *   }
     * })
     */
    upsert<T extends ChatMembershipProjectionUpsertArgs>(args: SelectSubset<T, ChatMembershipProjectionUpsertArgs<ExtArgs>>): Prisma__ChatMembershipProjectionClient<$Result.GetResult<Prisma.$ChatMembershipProjectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMembershipProjections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionCountArgs} args - Arguments to filter ChatMembershipProjections to count.
     * @example
     * // Count the number of ChatMembershipProjections
     * const count = await prisma.chatMembershipProjection.count({
     *   where: {
     *     // ... the filter for the ChatMembershipProjections we want to count
     *   }
     * })
    **/
    count<T extends ChatMembershipProjectionCountArgs>(
      args?: Subset<T, ChatMembershipProjectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMembershipProjectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMembershipProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMembershipProjectionAggregateArgs>(args: Subset<T, ChatMembershipProjectionAggregateArgs>): Prisma.PrismaPromise<GetChatMembershipProjectionAggregateType<T>>

    /**
     * Group by ChatMembershipProjection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionGroupByArgs} args - Group by arguments.
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
      T extends ChatMembershipProjectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMembershipProjectionGroupByArgs['orderBy'] }
        : { orderBy?: ChatMembershipProjectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMembershipProjectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMembershipProjectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMembershipProjection model
   */
  readonly fields: ChatMembershipProjectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMembershipProjection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMembershipProjectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ChatMembershipProjection model
   */
  interface ChatMembershipProjectionFieldRefs {
    readonly chatId: FieldRef<"ChatMembershipProjection", 'String'>
    readonly userId: FieldRef<"ChatMembershipProjection", 'String'>
    readonly role: FieldRef<"ChatMembershipProjection", 'ChatMemberRole'>
    readonly status: FieldRef<"ChatMembershipProjection", 'ChatMemberStatus'>
    readonly updatedAt: FieldRef<"ChatMembershipProjection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMembershipProjection findUnique
   */
  export type ChatMembershipProjectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjection to fetch.
     */
    where: ChatMembershipProjectionWhereUniqueInput
  }

  /**
   * ChatMembershipProjection findUniqueOrThrow
   */
  export type ChatMembershipProjectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjection to fetch.
     */
    where: ChatMembershipProjectionWhereUniqueInput
  }

  /**
   * ChatMembershipProjection findFirst
   */
  export type ChatMembershipProjectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjection to fetch.
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjections to fetch.
     */
    orderBy?: ChatMembershipProjectionOrderByWithRelationInput | ChatMembershipProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjections.
     */
    cursor?: ChatMembershipProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjections.
     */
    distinct?: ChatMembershipProjectionScalarFieldEnum | ChatMembershipProjectionScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjection findFirstOrThrow
   */
  export type ChatMembershipProjectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjection to fetch.
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjections to fetch.
     */
    orderBy?: ChatMembershipProjectionOrderByWithRelationInput | ChatMembershipProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjections.
     */
    cursor?: ChatMembershipProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjections.
     */
    distinct?: ChatMembershipProjectionScalarFieldEnum | ChatMembershipProjectionScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjection findMany
   */
  export type ChatMembershipProjectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjections to fetch.
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjections to fetch.
     */
    orderBy?: ChatMembershipProjectionOrderByWithRelationInput | ChatMembershipProjectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMembershipProjections.
     */
    cursor?: ChatMembershipProjectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjections.
     */
    skip?: number
    distinct?: ChatMembershipProjectionScalarFieldEnum | ChatMembershipProjectionScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjection create
   */
  export type ChatMembershipProjectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMembershipProjection.
     */
    data: XOR<ChatMembershipProjectionCreateInput, ChatMembershipProjectionUncheckedCreateInput>
  }

  /**
   * ChatMembershipProjection createMany
   */
  export type ChatMembershipProjectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMembershipProjections.
     */
    data: ChatMembershipProjectionCreateManyInput | ChatMembershipProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjection createManyAndReturn
   */
  export type ChatMembershipProjectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMembershipProjections.
     */
    data: ChatMembershipProjectionCreateManyInput | ChatMembershipProjectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjection update
   */
  export type ChatMembershipProjectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMembershipProjection.
     */
    data: XOR<ChatMembershipProjectionUpdateInput, ChatMembershipProjectionUncheckedUpdateInput>
    /**
     * Choose, which ChatMembershipProjection to update.
     */
    where: ChatMembershipProjectionWhereUniqueInput
  }

  /**
   * ChatMembershipProjection updateMany
   */
  export type ChatMembershipProjectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMembershipProjections.
     */
    data: XOR<ChatMembershipProjectionUpdateManyMutationInput, ChatMembershipProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjections to update
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * Limit how many ChatMembershipProjections to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjection updateManyAndReturn
   */
  export type ChatMembershipProjectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * The data used to update ChatMembershipProjections.
     */
    data: XOR<ChatMembershipProjectionUpdateManyMutationInput, ChatMembershipProjectionUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjections to update
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * Limit how many ChatMembershipProjections to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjection upsert
   */
  export type ChatMembershipProjectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMembershipProjection to update in case it exists.
     */
    where: ChatMembershipProjectionWhereUniqueInput
    /**
     * In case the ChatMembershipProjection found by the `where` argument doesn't exist, create a new ChatMembershipProjection with this data.
     */
    create: XOR<ChatMembershipProjectionCreateInput, ChatMembershipProjectionUncheckedCreateInput>
    /**
     * In case the ChatMembershipProjection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMembershipProjectionUpdateInput, ChatMembershipProjectionUncheckedUpdateInput>
  }

  /**
   * ChatMembershipProjection delete
   */
  export type ChatMembershipProjectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
    /**
     * Filter which ChatMembershipProjection to delete.
     */
    where: ChatMembershipProjectionWhereUniqueInput
  }

  /**
   * ChatMembershipProjection deleteMany
   */
  export type ChatMembershipProjectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjections to delete
     */
    where?: ChatMembershipProjectionWhereInput
    /**
     * Limit how many ChatMembershipProjections to delete.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjection without action
   */
  export type ChatMembershipProjectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjection
     */
    select?: ChatMembershipProjectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjection
     */
    omit?: ChatMembershipProjectionOmit<ExtArgs> | null
  }


  /**
   * Model ChatMembershipProjectionEvent
   */

  export type AggregateChatMembershipProjectionEvent = {
    _count: ChatMembershipProjectionEventCountAggregateOutputType | null
    _min: ChatMembershipProjectionEventMinAggregateOutputType | null
    _max: ChatMembershipProjectionEventMaxAggregateOutputType | null
  }

  export type ChatMembershipProjectionEventMinAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    occurredAt: Date | null
    processedAt: Date | null
    chatId: string | null
    userId: string | null
  }

  export type ChatMembershipProjectionEventMaxAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    occurredAt: Date | null
    processedAt: Date | null
    chatId: string | null
    userId: string | null
  }

  export type ChatMembershipProjectionEventCountAggregateOutputType = {
    eventId: number
    eventType: number
    occurredAt: number
    processedAt: number
    chatId: number
    userId: number
    _all: number
  }


  export type ChatMembershipProjectionEventMinAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    processedAt?: true
    chatId?: true
    userId?: true
  }

  export type ChatMembershipProjectionEventMaxAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    processedAt?: true
    chatId?: true
    userId?: true
  }

  export type ChatMembershipProjectionEventCountAggregateInputType = {
    eventId?: true
    eventType?: true
    occurredAt?: true
    processedAt?: true
    chatId?: true
    userId?: true
    _all?: true
  }

  export type ChatMembershipProjectionEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjectionEvent to aggregate.
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionEvents to fetch.
     */
    orderBy?: ChatMembershipProjectionEventOrderByWithRelationInput | ChatMembershipProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMembershipProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMembershipProjectionEvents
    **/
    _count?: true | ChatMembershipProjectionEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMembershipProjectionEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMembershipProjectionEventMaxAggregateInputType
  }

  export type GetChatMembershipProjectionEventAggregateType<T extends ChatMembershipProjectionEventAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMembershipProjectionEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMembershipProjectionEvent[P]>
      : GetScalarType<T[P], AggregateChatMembershipProjectionEvent[P]>
  }




  export type ChatMembershipProjectionEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMembershipProjectionEventWhereInput
    orderBy?: ChatMembershipProjectionEventOrderByWithAggregationInput | ChatMembershipProjectionEventOrderByWithAggregationInput[]
    by: ChatMembershipProjectionEventScalarFieldEnum[] | ChatMembershipProjectionEventScalarFieldEnum
    having?: ChatMembershipProjectionEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMembershipProjectionEventCountAggregateInputType | true
    _min?: ChatMembershipProjectionEventMinAggregateInputType
    _max?: ChatMembershipProjectionEventMaxAggregateInputType
  }

  export type ChatMembershipProjectionEventGroupByOutputType = {
    eventId: string
    eventType: string
    occurredAt: Date
    processedAt: Date
    chatId: string | null
    userId: string | null
    _count: ChatMembershipProjectionEventCountAggregateOutputType | null
    _min: ChatMembershipProjectionEventMinAggregateOutputType | null
    _max: ChatMembershipProjectionEventMaxAggregateOutputType | null
  }

  type GetChatMembershipProjectionEventGroupByPayload<T extends ChatMembershipProjectionEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMembershipProjectionEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMembershipProjectionEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMembershipProjectionEventGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMembershipProjectionEventGroupByOutputType[P]>
        }
      >
    >


  export type ChatMembershipProjectionEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    chatId?: boolean
    userId?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionEvent"]>

  export type ChatMembershipProjectionEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    chatId?: boolean
    userId?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionEvent"]>

  export type ChatMembershipProjectionEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    chatId?: boolean
    userId?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionEvent"]>

  export type ChatMembershipProjectionEventSelectScalar = {
    eventId?: boolean
    eventType?: boolean
    occurredAt?: boolean
    processedAt?: boolean
    chatId?: boolean
    userId?: boolean
  }

  export type ChatMembershipProjectionEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "eventType" | "occurredAt" | "processedAt" | "chatId" | "userId", ExtArgs["result"]["chatMembershipProjectionEvent"]>

  export type $ChatMembershipProjectionEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMembershipProjectionEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      eventType: string
      occurredAt: Date
      processedAt: Date
      chatId: string | null
      userId: string | null
    }, ExtArgs["result"]["chatMembershipProjectionEvent"]>
    composites: {}
  }

  type ChatMembershipProjectionEventGetPayload<S extends boolean | null | undefined | ChatMembershipProjectionEventDefaultArgs> = $Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload, S>

  type ChatMembershipProjectionEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMembershipProjectionEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMembershipProjectionEventCountAggregateInputType | true
    }

  export interface ChatMembershipProjectionEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMembershipProjectionEvent'], meta: { name: 'ChatMembershipProjectionEvent' } }
    /**
     * Find zero or one ChatMembershipProjectionEvent that matches the filter.
     * @param {ChatMembershipProjectionEventFindUniqueArgs} args - Arguments to find a ChatMembershipProjectionEvent
     * @example
     * // Get one ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMembershipProjectionEventFindUniqueArgs>(args: SelectSubset<T, ChatMembershipProjectionEventFindUniqueArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMembershipProjectionEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMembershipProjectionEventFindUniqueOrThrowArgs} args - Arguments to find a ChatMembershipProjectionEvent
     * @example
     * // Get one ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMembershipProjectionEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMembershipProjectionEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjectionEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventFindFirstArgs} args - Arguments to find a ChatMembershipProjectionEvent
     * @example
     * // Get one ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMembershipProjectionEventFindFirstArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventFindFirstArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjectionEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventFindFirstOrThrowArgs} args - Arguments to find a ChatMembershipProjectionEvent
     * @example
     * // Get one ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMembershipProjectionEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMembershipProjectionEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvents = await prisma.chatMembershipProjectionEvent.findMany()
     * 
     * // Get first 10 ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvents = await prisma.chatMembershipProjectionEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const chatMembershipProjectionEventWithEventIdOnly = await prisma.chatMembershipProjectionEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends ChatMembershipProjectionEventFindManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMembershipProjectionEvent.
     * @param {ChatMembershipProjectionEventCreateArgs} args - Arguments to create a ChatMembershipProjectionEvent.
     * @example
     * // Create one ChatMembershipProjectionEvent
     * const ChatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.create({
     *   data: {
     *     // ... data to create a ChatMembershipProjectionEvent
     *   }
     * })
     * 
     */
    create<T extends ChatMembershipProjectionEventCreateArgs>(args: SelectSubset<T, ChatMembershipProjectionEventCreateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMembershipProjectionEvents.
     * @param {ChatMembershipProjectionEventCreateManyArgs} args - Arguments to create many ChatMembershipProjectionEvents.
     * @example
     * // Create many ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMembershipProjectionEventCreateManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMembershipProjectionEvents and returns the data saved in the database.
     * @param {ChatMembershipProjectionEventCreateManyAndReturnArgs} args - Arguments to create many ChatMembershipProjectionEvents.
     * @example
     * // Create many ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMembershipProjectionEvents and only return the `eventId`
     * const chatMembershipProjectionEventWithEventIdOnly = await prisma.chatMembershipProjectionEvent.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMembershipProjectionEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMembershipProjectionEvent.
     * @param {ChatMembershipProjectionEventDeleteArgs} args - Arguments to delete one ChatMembershipProjectionEvent.
     * @example
     * // Delete one ChatMembershipProjectionEvent
     * const ChatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.delete({
     *   where: {
     *     // ... filter to delete one ChatMembershipProjectionEvent
     *   }
     * })
     * 
     */
    delete<T extends ChatMembershipProjectionEventDeleteArgs>(args: SelectSubset<T, ChatMembershipProjectionEventDeleteArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMembershipProjectionEvent.
     * @param {ChatMembershipProjectionEventUpdateArgs} args - Arguments to update one ChatMembershipProjectionEvent.
     * @example
     * // Update one ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMembershipProjectionEventUpdateArgs>(args: SelectSubset<T, ChatMembershipProjectionEventUpdateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMembershipProjectionEvents.
     * @param {ChatMembershipProjectionEventDeleteManyArgs} args - Arguments to filter ChatMembershipProjectionEvents to delete.
     * @example
     * // Delete a few ChatMembershipProjectionEvents
     * const { count } = await prisma.chatMembershipProjectionEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMembershipProjectionEventDeleteManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjectionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMembershipProjectionEventUpdateManyArgs>(args: SelectSubset<T, ChatMembershipProjectionEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjectionEvents and returns the data updated in the database.
     * @param {ChatMembershipProjectionEventUpdateManyAndReturnArgs} args - Arguments to update many ChatMembershipProjectionEvents.
     * @example
     * // Update many ChatMembershipProjectionEvents
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMembershipProjectionEvents and only return the `eventId`
     * const chatMembershipProjectionEventWithEventIdOnly = await prisma.chatMembershipProjectionEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMembershipProjectionEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMembershipProjectionEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMembershipProjectionEvent.
     * @param {ChatMembershipProjectionEventUpsertArgs} args - Arguments to update or create a ChatMembershipProjectionEvent.
     * @example
     * // Update or create a ChatMembershipProjectionEvent
     * const chatMembershipProjectionEvent = await prisma.chatMembershipProjectionEvent.upsert({
     *   create: {
     *     // ... data to create a ChatMembershipProjectionEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMembershipProjectionEvent we want to update
     *   }
     * })
     */
    upsert<T extends ChatMembershipProjectionEventUpsertArgs>(args: SelectSubset<T, ChatMembershipProjectionEventUpsertArgs<ExtArgs>>): Prisma__ChatMembershipProjectionEventClient<$Result.GetResult<Prisma.$ChatMembershipProjectionEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMembershipProjectionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventCountArgs} args - Arguments to filter ChatMembershipProjectionEvents to count.
     * @example
     * // Count the number of ChatMembershipProjectionEvents
     * const count = await prisma.chatMembershipProjectionEvent.count({
     *   where: {
     *     // ... the filter for the ChatMembershipProjectionEvents we want to count
     *   }
     * })
    **/
    count<T extends ChatMembershipProjectionEventCountArgs>(
      args?: Subset<T, ChatMembershipProjectionEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMembershipProjectionEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMembershipProjectionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMembershipProjectionEventAggregateArgs>(args: Subset<T, ChatMembershipProjectionEventAggregateArgs>): Prisma.PrismaPromise<GetChatMembershipProjectionEventAggregateType<T>>

    /**
     * Group by ChatMembershipProjectionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionEventGroupByArgs} args - Group by arguments.
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
      T extends ChatMembershipProjectionEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMembershipProjectionEventGroupByArgs['orderBy'] }
        : { orderBy?: ChatMembershipProjectionEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMembershipProjectionEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMembershipProjectionEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMembershipProjectionEvent model
   */
  readonly fields: ChatMembershipProjectionEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMembershipProjectionEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMembershipProjectionEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ChatMembershipProjectionEvent model
   */
  interface ChatMembershipProjectionEventFieldRefs {
    readonly eventId: FieldRef<"ChatMembershipProjectionEvent", 'String'>
    readonly eventType: FieldRef<"ChatMembershipProjectionEvent", 'String'>
    readonly occurredAt: FieldRef<"ChatMembershipProjectionEvent", 'DateTime'>
    readonly processedAt: FieldRef<"ChatMembershipProjectionEvent", 'DateTime'>
    readonly chatId: FieldRef<"ChatMembershipProjectionEvent", 'String'>
    readonly userId: FieldRef<"ChatMembershipProjectionEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChatMembershipProjectionEvent findUnique
   */
  export type ChatMembershipProjectionEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionEvent to fetch.
     */
    where: ChatMembershipProjectionEventWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionEvent findUniqueOrThrow
   */
  export type ChatMembershipProjectionEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionEvent to fetch.
     */
    where: ChatMembershipProjectionEventWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionEvent findFirst
   */
  export type ChatMembershipProjectionEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionEvent to fetch.
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionEvents to fetch.
     */
    orderBy?: ChatMembershipProjectionEventOrderByWithRelationInput | ChatMembershipProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjectionEvents.
     */
    cursor?: ChatMembershipProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjectionEvents.
     */
    distinct?: ChatMembershipProjectionEventScalarFieldEnum | ChatMembershipProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionEvent findFirstOrThrow
   */
  export type ChatMembershipProjectionEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionEvent to fetch.
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionEvents to fetch.
     */
    orderBy?: ChatMembershipProjectionEventOrderByWithRelationInput | ChatMembershipProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjectionEvents.
     */
    cursor?: ChatMembershipProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjectionEvents.
     */
    distinct?: ChatMembershipProjectionEventScalarFieldEnum | ChatMembershipProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionEvent findMany
   */
  export type ChatMembershipProjectionEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionEvents to fetch.
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionEvents to fetch.
     */
    orderBy?: ChatMembershipProjectionEventOrderByWithRelationInput | ChatMembershipProjectionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMembershipProjectionEvents.
     */
    cursor?: ChatMembershipProjectionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionEvents.
     */
    skip?: number
    distinct?: ChatMembershipProjectionEventScalarFieldEnum | ChatMembershipProjectionEventScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionEvent create
   */
  export type ChatMembershipProjectionEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMembershipProjectionEvent.
     */
    data: XOR<ChatMembershipProjectionEventCreateInput, ChatMembershipProjectionEventUncheckedCreateInput>
  }

  /**
   * ChatMembershipProjectionEvent createMany
   */
  export type ChatMembershipProjectionEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMembershipProjectionEvents.
     */
    data: ChatMembershipProjectionEventCreateManyInput | ChatMembershipProjectionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjectionEvent createManyAndReturn
   */
  export type ChatMembershipProjectionEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMembershipProjectionEvents.
     */
    data: ChatMembershipProjectionEventCreateManyInput | ChatMembershipProjectionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjectionEvent update
   */
  export type ChatMembershipProjectionEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMembershipProjectionEvent.
     */
    data: XOR<ChatMembershipProjectionEventUpdateInput, ChatMembershipProjectionEventUncheckedUpdateInput>
    /**
     * Choose, which ChatMembershipProjectionEvent to update.
     */
    where: ChatMembershipProjectionEventWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionEvent updateMany
   */
  export type ChatMembershipProjectionEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMembershipProjectionEvents.
     */
    data: XOR<ChatMembershipProjectionEventUpdateManyMutationInput, ChatMembershipProjectionEventUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjectionEvents to update
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * Limit how many ChatMembershipProjectionEvents to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionEvent updateManyAndReturn
   */
  export type ChatMembershipProjectionEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * The data used to update ChatMembershipProjectionEvents.
     */
    data: XOR<ChatMembershipProjectionEventUpdateManyMutationInput, ChatMembershipProjectionEventUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjectionEvents to update
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * Limit how many ChatMembershipProjectionEvents to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionEvent upsert
   */
  export type ChatMembershipProjectionEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMembershipProjectionEvent to update in case it exists.
     */
    where: ChatMembershipProjectionEventWhereUniqueInput
    /**
     * In case the ChatMembershipProjectionEvent found by the `where` argument doesn't exist, create a new ChatMembershipProjectionEvent with this data.
     */
    create: XOR<ChatMembershipProjectionEventCreateInput, ChatMembershipProjectionEventUncheckedCreateInput>
    /**
     * In case the ChatMembershipProjectionEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMembershipProjectionEventUpdateInput, ChatMembershipProjectionEventUncheckedUpdateInput>
  }

  /**
   * ChatMembershipProjectionEvent delete
   */
  export type ChatMembershipProjectionEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
    /**
     * Filter which ChatMembershipProjectionEvent to delete.
     */
    where: ChatMembershipProjectionEventWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionEvent deleteMany
   */
  export type ChatMembershipProjectionEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjectionEvents to delete
     */
    where?: ChatMembershipProjectionEventWhereInput
    /**
     * Limit how many ChatMembershipProjectionEvents to delete.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionEvent without action
   */
  export type ChatMembershipProjectionEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionEvent
     */
    select?: ChatMembershipProjectionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionEvent
     */
    omit?: ChatMembershipProjectionEventOmit<ExtArgs> | null
  }


  /**
   * Model ChatMembershipProjectionOffset
   */

  export type AggregateChatMembershipProjectionOffset = {
    _count: ChatMembershipProjectionOffsetCountAggregateOutputType | null
    _min: ChatMembershipProjectionOffsetMinAggregateOutputType | null
    _max: ChatMembershipProjectionOffsetMaxAggregateOutputType | null
  }

  export type ChatMembershipProjectionOffsetMinAggregateOutputType = {
    consumer: string | null
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMembershipProjectionOffsetMaxAggregateOutputType = {
    consumer: string | null
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMembershipProjectionOffsetCountAggregateOutputType = {
    consumer: number
    lastEventId: number
    lastOccurredAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMembershipProjectionOffsetMinAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
  }

  export type ChatMembershipProjectionOffsetMaxAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
  }

  export type ChatMembershipProjectionOffsetCountAggregateInputType = {
    consumer?: true
    lastEventId?: true
    lastOccurredAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMembershipProjectionOffsetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjectionOffset to aggregate.
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionOffsets to fetch.
     */
    orderBy?: ChatMembershipProjectionOffsetOrderByWithRelationInput | ChatMembershipProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMembershipProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMembershipProjectionOffsets
    **/
    _count?: true | ChatMembershipProjectionOffsetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMembershipProjectionOffsetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMembershipProjectionOffsetMaxAggregateInputType
  }

  export type GetChatMembershipProjectionOffsetAggregateType<T extends ChatMembershipProjectionOffsetAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMembershipProjectionOffset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMembershipProjectionOffset[P]>
      : GetScalarType<T[P], AggregateChatMembershipProjectionOffset[P]>
  }




  export type ChatMembershipProjectionOffsetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMembershipProjectionOffsetWhereInput
    orderBy?: ChatMembershipProjectionOffsetOrderByWithAggregationInput | ChatMembershipProjectionOffsetOrderByWithAggregationInput[]
    by: ChatMembershipProjectionOffsetScalarFieldEnum[] | ChatMembershipProjectionOffsetScalarFieldEnum
    having?: ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMembershipProjectionOffsetCountAggregateInputType | true
    _min?: ChatMembershipProjectionOffsetMinAggregateInputType
    _max?: ChatMembershipProjectionOffsetMaxAggregateInputType
  }

  export type ChatMembershipProjectionOffsetGroupByOutputType = {
    consumer: string
    lastEventId: string | null
    lastOccurredAt: Date | null
    updatedAt: Date
    _count: ChatMembershipProjectionOffsetCountAggregateOutputType | null
    _min: ChatMembershipProjectionOffsetMinAggregateOutputType | null
    _max: ChatMembershipProjectionOffsetMaxAggregateOutputType | null
  }

  type GetChatMembershipProjectionOffsetGroupByPayload<T extends ChatMembershipProjectionOffsetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMembershipProjectionOffsetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMembershipProjectionOffsetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMembershipProjectionOffsetGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMembershipProjectionOffsetGroupByOutputType[P]>
        }
      >
    >


  export type ChatMembershipProjectionOffsetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionOffset"]>

  export type ChatMembershipProjectionOffsetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionOffset"]>

  export type ChatMembershipProjectionOffsetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMembershipProjectionOffset"]>

  export type ChatMembershipProjectionOffsetSelectScalar = {
    consumer?: boolean
    lastEventId?: boolean
    lastOccurredAt?: boolean
    updatedAt?: boolean
  }

  export type ChatMembershipProjectionOffsetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"consumer" | "lastEventId" | "lastOccurredAt" | "updatedAt", ExtArgs["result"]["chatMembershipProjectionOffset"]>

  export type $ChatMembershipProjectionOffsetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMembershipProjectionOffset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      consumer: string
      lastEventId: string | null
      lastOccurredAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["chatMembershipProjectionOffset"]>
    composites: {}
  }

  type ChatMembershipProjectionOffsetGetPayload<S extends boolean | null | undefined | ChatMembershipProjectionOffsetDefaultArgs> = $Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload, S>

  type ChatMembershipProjectionOffsetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMembershipProjectionOffsetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMembershipProjectionOffsetCountAggregateInputType | true
    }

  export interface ChatMembershipProjectionOffsetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMembershipProjectionOffset'], meta: { name: 'ChatMembershipProjectionOffset' } }
    /**
     * Find zero or one ChatMembershipProjectionOffset that matches the filter.
     * @param {ChatMembershipProjectionOffsetFindUniqueArgs} args - Arguments to find a ChatMembershipProjectionOffset
     * @example
     * // Get one ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMembershipProjectionOffsetFindUniqueArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetFindUniqueArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMembershipProjectionOffset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMembershipProjectionOffsetFindUniqueOrThrowArgs} args - Arguments to find a ChatMembershipProjectionOffset
     * @example
     * // Get one ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMembershipProjectionOffsetFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjectionOffset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetFindFirstArgs} args - Arguments to find a ChatMembershipProjectionOffset
     * @example
     * // Get one ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMembershipProjectionOffsetFindFirstArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetFindFirstArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMembershipProjectionOffset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetFindFirstOrThrowArgs} args - Arguments to find a ChatMembershipProjectionOffset
     * @example
     * // Get one ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMembershipProjectionOffsetFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMembershipProjectionOffsets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffsets = await prisma.chatMembershipProjectionOffset.findMany()
     * 
     * // Get first 10 ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffsets = await prisma.chatMembershipProjectionOffset.findMany({ take: 10 })
     * 
     * // Only select the `consumer`
     * const chatMembershipProjectionOffsetWithConsumerOnly = await prisma.chatMembershipProjectionOffset.findMany({ select: { consumer: true } })
     * 
     */
    findMany<T extends ChatMembershipProjectionOffsetFindManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMembershipProjectionOffset.
     * @param {ChatMembershipProjectionOffsetCreateArgs} args - Arguments to create a ChatMembershipProjectionOffset.
     * @example
     * // Create one ChatMembershipProjectionOffset
     * const ChatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.create({
     *   data: {
     *     // ... data to create a ChatMembershipProjectionOffset
     *   }
     * })
     * 
     */
    create<T extends ChatMembershipProjectionOffsetCreateArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetCreateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMembershipProjectionOffsets.
     * @param {ChatMembershipProjectionOffsetCreateManyArgs} args - Arguments to create many ChatMembershipProjectionOffsets.
     * @example
     * // Create many ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMembershipProjectionOffsetCreateManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMembershipProjectionOffsets and returns the data saved in the database.
     * @param {ChatMembershipProjectionOffsetCreateManyAndReturnArgs} args - Arguments to create many ChatMembershipProjectionOffsets.
     * @example
     * // Create many ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMembershipProjectionOffsets and only return the `consumer`
     * const chatMembershipProjectionOffsetWithConsumerOnly = await prisma.chatMembershipProjectionOffset.createManyAndReturn({
     *   select: { consumer: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMembershipProjectionOffsetCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMembershipProjectionOffset.
     * @param {ChatMembershipProjectionOffsetDeleteArgs} args - Arguments to delete one ChatMembershipProjectionOffset.
     * @example
     * // Delete one ChatMembershipProjectionOffset
     * const ChatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.delete({
     *   where: {
     *     // ... filter to delete one ChatMembershipProjectionOffset
     *   }
     * })
     * 
     */
    delete<T extends ChatMembershipProjectionOffsetDeleteArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetDeleteArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMembershipProjectionOffset.
     * @param {ChatMembershipProjectionOffsetUpdateArgs} args - Arguments to update one ChatMembershipProjectionOffset.
     * @example
     * // Update one ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMembershipProjectionOffsetUpdateArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetUpdateArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMembershipProjectionOffsets.
     * @param {ChatMembershipProjectionOffsetDeleteManyArgs} args - Arguments to filter ChatMembershipProjectionOffsets to delete.
     * @example
     * // Delete a few ChatMembershipProjectionOffsets
     * const { count } = await prisma.chatMembershipProjectionOffset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMembershipProjectionOffsetDeleteManyArgs>(args?: SelectSubset<T, ChatMembershipProjectionOffsetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjectionOffsets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMembershipProjectionOffsetUpdateManyArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMembershipProjectionOffsets and returns the data updated in the database.
     * @param {ChatMembershipProjectionOffsetUpdateManyAndReturnArgs} args - Arguments to update many ChatMembershipProjectionOffsets.
     * @example
     * // Update many ChatMembershipProjectionOffsets
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMembershipProjectionOffsets and only return the `consumer`
     * const chatMembershipProjectionOffsetWithConsumerOnly = await prisma.chatMembershipProjectionOffset.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMembershipProjectionOffsetUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMembershipProjectionOffset.
     * @param {ChatMembershipProjectionOffsetUpsertArgs} args - Arguments to update or create a ChatMembershipProjectionOffset.
     * @example
     * // Update or create a ChatMembershipProjectionOffset
     * const chatMembershipProjectionOffset = await prisma.chatMembershipProjectionOffset.upsert({
     *   create: {
     *     // ... data to create a ChatMembershipProjectionOffset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMembershipProjectionOffset we want to update
     *   }
     * })
     */
    upsert<T extends ChatMembershipProjectionOffsetUpsertArgs>(args: SelectSubset<T, ChatMembershipProjectionOffsetUpsertArgs<ExtArgs>>): Prisma__ChatMembershipProjectionOffsetClient<$Result.GetResult<Prisma.$ChatMembershipProjectionOffsetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMembershipProjectionOffsets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetCountArgs} args - Arguments to filter ChatMembershipProjectionOffsets to count.
     * @example
     * // Count the number of ChatMembershipProjectionOffsets
     * const count = await prisma.chatMembershipProjectionOffset.count({
     *   where: {
     *     // ... the filter for the ChatMembershipProjectionOffsets we want to count
     *   }
     * })
    **/
    count<T extends ChatMembershipProjectionOffsetCountArgs>(
      args?: Subset<T, ChatMembershipProjectionOffsetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMembershipProjectionOffsetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMembershipProjectionOffset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMembershipProjectionOffsetAggregateArgs>(args: Subset<T, ChatMembershipProjectionOffsetAggregateArgs>): Prisma.PrismaPromise<GetChatMembershipProjectionOffsetAggregateType<T>>

    /**
     * Group by ChatMembershipProjectionOffset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMembershipProjectionOffsetGroupByArgs} args - Group by arguments.
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
      T extends ChatMembershipProjectionOffsetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMembershipProjectionOffsetGroupByArgs['orderBy'] }
        : { orderBy?: ChatMembershipProjectionOffsetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMembershipProjectionOffsetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMembershipProjectionOffsetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMembershipProjectionOffset model
   */
  readonly fields: ChatMembershipProjectionOffsetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMembershipProjectionOffset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMembershipProjectionOffsetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ChatMembershipProjectionOffset model
   */
  interface ChatMembershipProjectionOffsetFieldRefs {
    readonly consumer: FieldRef<"ChatMembershipProjectionOffset", 'String'>
    readonly lastEventId: FieldRef<"ChatMembershipProjectionOffset", 'String'>
    readonly lastOccurredAt: FieldRef<"ChatMembershipProjectionOffset", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatMembershipProjectionOffset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMembershipProjectionOffset findUnique
   */
  export type ChatMembershipProjectionOffsetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionOffset to fetch.
     */
    where: ChatMembershipProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionOffset findUniqueOrThrow
   */
  export type ChatMembershipProjectionOffsetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionOffset to fetch.
     */
    where: ChatMembershipProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionOffset findFirst
   */
  export type ChatMembershipProjectionOffsetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionOffset to fetch.
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionOffsets to fetch.
     */
    orderBy?: ChatMembershipProjectionOffsetOrderByWithRelationInput | ChatMembershipProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjectionOffsets.
     */
    cursor?: ChatMembershipProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjectionOffsets.
     */
    distinct?: ChatMembershipProjectionOffsetScalarFieldEnum | ChatMembershipProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionOffset findFirstOrThrow
   */
  export type ChatMembershipProjectionOffsetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionOffset to fetch.
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionOffsets to fetch.
     */
    orderBy?: ChatMembershipProjectionOffsetOrderByWithRelationInput | ChatMembershipProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMembershipProjectionOffsets.
     */
    cursor?: ChatMembershipProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionOffsets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMembershipProjectionOffsets.
     */
    distinct?: ChatMembershipProjectionOffsetScalarFieldEnum | ChatMembershipProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionOffset findMany
   */
  export type ChatMembershipProjectionOffsetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter, which ChatMembershipProjectionOffsets to fetch.
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMembershipProjectionOffsets to fetch.
     */
    orderBy?: ChatMembershipProjectionOffsetOrderByWithRelationInput | ChatMembershipProjectionOffsetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMembershipProjectionOffsets.
     */
    cursor?: ChatMembershipProjectionOffsetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMembershipProjectionOffsets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMembershipProjectionOffsets.
     */
    skip?: number
    distinct?: ChatMembershipProjectionOffsetScalarFieldEnum | ChatMembershipProjectionOffsetScalarFieldEnum[]
  }

  /**
   * ChatMembershipProjectionOffset create
   */
  export type ChatMembershipProjectionOffsetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMembershipProjectionOffset.
     */
    data: XOR<ChatMembershipProjectionOffsetCreateInput, ChatMembershipProjectionOffsetUncheckedCreateInput>
  }

  /**
   * ChatMembershipProjectionOffset createMany
   */
  export type ChatMembershipProjectionOffsetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMembershipProjectionOffsets.
     */
    data: ChatMembershipProjectionOffsetCreateManyInput | ChatMembershipProjectionOffsetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjectionOffset createManyAndReturn
   */
  export type ChatMembershipProjectionOffsetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMembershipProjectionOffsets.
     */
    data: ChatMembershipProjectionOffsetCreateManyInput | ChatMembershipProjectionOffsetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMembershipProjectionOffset update
   */
  export type ChatMembershipProjectionOffsetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMembershipProjectionOffset.
     */
    data: XOR<ChatMembershipProjectionOffsetUpdateInput, ChatMembershipProjectionOffsetUncheckedUpdateInput>
    /**
     * Choose, which ChatMembershipProjectionOffset to update.
     */
    where: ChatMembershipProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionOffset updateMany
   */
  export type ChatMembershipProjectionOffsetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMembershipProjectionOffsets.
     */
    data: XOR<ChatMembershipProjectionOffsetUpdateManyMutationInput, ChatMembershipProjectionOffsetUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjectionOffsets to update
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * Limit how many ChatMembershipProjectionOffsets to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionOffset updateManyAndReturn
   */
  export type ChatMembershipProjectionOffsetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * The data used to update ChatMembershipProjectionOffsets.
     */
    data: XOR<ChatMembershipProjectionOffsetUpdateManyMutationInput, ChatMembershipProjectionOffsetUncheckedUpdateManyInput>
    /**
     * Filter which ChatMembershipProjectionOffsets to update
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * Limit how many ChatMembershipProjectionOffsets to update.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionOffset upsert
   */
  export type ChatMembershipProjectionOffsetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMembershipProjectionOffset to update in case it exists.
     */
    where: ChatMembershipProjectionOffsetWhereUniqueInput
    /**
     * In case the ChatMembershipProjectionOffset found by the `where` argument doesn't exist, create a new ChatMembershipProjectionOffset with this data.
     */
    create: XOR<ChatMembershipProjectionOffsetCreateInput, ChatMembershipProjectionOffsetUncheckedCreateInput>
    /**
     * In case the ChatMembershipProjectionOffset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMembershipProjectionOffsetUpdateInput, ChatMembershipProjectionOffsetUncheckedUpdateInput>
  }

  /**
   * ChatMembershipProjectionOffset delete
   */
  export type ChatMembershipProjectionOffsetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
    /**
     * Filter which ChatMembershipProjectionOffset to delete.
     */
    where: ChatMembershipProjectionOffsetWhereUniqueInput
  }

  /**
   * ChatMembershipProjectionOffset deleteMany
   */
  export type ChatMembershipProjectionOffsetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMembershipProjectionOffsets to delete
     */
    where?: ChatMembershipProjectionOffsetWhereInput
    /**
     * Limit how many ChatMembershipProjectionOffsets to delete.
     */
    limit?: number
  }

  /**
   * ChatMembershipProjectionOffset without action
   */
  export type ChatMembershipProjectionOffsetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMembershipProjectionOffset
     */
    select?: ChatMembershipProjectionOffsetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMembershipProjectionOffset
     */
    omit?: ChatMembershipProjectionOffsetOmit<ExtArgs> | null
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


  export const ChatScalarFieldEnum: {
    id: 'id',
    type: 'type',
    title: 'title',
    description: 'description',
    photoMediaId: 'photoMediaId',
    createdByUserId: 'createdByUserId',
    isArchived: 'isArchived',
    joinMode: 'joinMode',
    isPublic: 'isPublic',
    historyVisibility: 'historyVisibility',
    allowMemberInvites: 'allowMemberInvites',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const ChatMemberScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    role: 'role',
    status: 'status',
    invitedByUserId: 'invitedByUserId',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt',
    adminPermissions: 'adminPermissions',
    restriction: 'restriction',
    restrictionUntil: 'restrictionUntil',
    restrictedByUserId: 'restrictedByUserId',
    restrictedAt: 'restrictedAt',
    bannedByUserId: 'bannedByUserId',
    bannedAt: 'bannedAt',
    bannedReason: 'bannedReason',
    promotedByUserId: 'promotedByUserId',
    promotedAt: 'promotedAt'
  };

  export type ChatMemberScalarFieldEnum = (typeof ChatMemberScalarFieldEnum)[keyof typeof ChatMemberScalarFieldEnum]


  export const ChatPermissionScalarFieldEnum: {
    chatId: 'chatId',
    canSendMessages: 'canSendMessages',
    canAddMembers: 'canAddMembers',
    canPinMessages: 'canPinMessages',
    updatedAt: 'updatedAt'
  };

  export type ChatPermissionScalarFieldEnum = (typeof ChatPermissionScalarFieldEnum)[keyof typeof ChatPermissionScalarFieldEnum]


  export const InviteLinkScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    tokenHash: 'tokenHash',
    createdByUserId: 'createdByUserId',
    expiresAt: 'expiresAt',
    maxUses: 'maxUses',
    usedCount: 'usedCount',
    revokedAt: 'revokedAt',
    requiresApproval: 'requiresApproval',
    isPrimary: 'isPrimary',
    createdAt: 'createdAt'
  };

  export type InviteLinkScalarFieldEnum = (typeof InviteLinkScalarFieldEnum)[keyof typeof InviteLinkScalarFieldEnum]


  export const JoinRequestScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    inviteLinkId: 'inviteLinkId',
    status: 'status',
    reviewedByUserId: 'reviewedByUserId',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
  };

  export type JoinRequestScalarFieldEnum = (typeof JoinRequestScalarFieldEnum)[keyof typeof JoinRequestScalarFieldEnum]


  export const ModerationLogScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    performedByUserId: 'performedByUserId',
    targetUserId: 'targetUserId',
    targetMessageId: 'targetMessageId',
    action: 'action',
    meta: 'meta',
    createdAt: 'createdAt'
  };

  export type ModerationLogScalarFieldEnum = (typeof ModerationLogScalarFieldEnum)[keyof typeof ModerationLogScalarFieldEnum]


  export const ChatPinScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    pinnedAt: 'pinnedAt'
  };

  export type ChatPinScalarFieldEnum = (typeof ChatPinScalarFieldEnum)[keyof typeof ChatPinScalarFieldEnum]


  export const ChatMuteScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    mutedAt: 'mutedAt'
  };

  export type ChatMuteScalarFieldEnum = (typeof ChatMuteScalarFieldEnum)[keyof typeof ChatMuteScalarFieldEnum]


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


  export const ChatMembershipProjectionScalarFieldEnum: {
    chatId: 'chatId',
    userId: 'userId',
    role: 'role',
    status: 'status',
    updatedAt: 'updatedAt'
  };

  export type ChatMembershipProjectionScalarFieldEnum = (typeof ChatMembershipProjectionScalarFieldEnum)[keyof typeof ChatMembershipProjectionScalarFieldEnum]


  export const ChatMembershipProjectionEventScalarFieldEnum: {
    eventId: 'eventId',
    eventType: 'eventType',
    occurredAt: 'occurredAt',
    processedAt: 'processedAt',
    chatId: 'chatId',
    userId: 'userId'
  };

  export type ChatMembershipProjectionEventScalarFieldEnum = (typeof ChatMembershipProjectionEventScalarFieldEnum)[keyof typeof ChatMembershipProjectionEventScalarFieldEnum]


  export const ChatMembershipProjectionOffsetScalarFieldEnum: {
    consumer: 'consumer',
    lastEventId: 'lastEventId',
    lastOccurredAt: 'lastOccurredAt',
    updatedAt: 'updatedAt'
  };

  export type ChatMembershipProjectionOffsetScalarFieldEnum = (typeof ChatMembershipProjectionOffsetScalarFieldEnum)[keyof typeof ChatMembershipProjectionOffsetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'ChatType'
   */
  export type EnumChatTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatType'>
    


  /**
   * Reference to a field of type 'ChatType[]'
   */
  export type ListEnumChatTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'JoinMode'
   */
  export type EnumJoinModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinMode'>
    


  /**
   * Reference to a field of type 'JoinMode[]'
   */
  export type ListEnumJoinModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinMode[]'>
    


  /**
   * Reference to a field of type 'HistoryVisibility'
   */
  export type EnumHistoryVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoryVisibility'>
    


  /**
   * Reference to a field of type 'HistoryVisibility[]'
   */
  export type ListEnumHistoryVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HistoryVisibility[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ChatMemberRole'
   */
  export type EnumChatMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMemberRole'>
    


  /**
   * Reference to a field of type 'ChatMemberRole[]'
   */
  export type ListEnumChatMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMemberRole[]'>
    


  /**
   * Reference to a field of type 'ChatMemberStatus'
   */
  export type EnumChatMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMemberStatus'>
    


  /**
   * Reference to a field of type 'ChatMemberStatus[]'
   */
  export type ListEnumChatMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMemberStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'JoinRequestStatus'
   */
  export type EnumJoinRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestStatus'>
    


  /**
   * Reference to a field of type 'JoinRequestStatus[]'
   */
  export type ListEnumJoinRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JoinRequestStatus[]'>
    


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


  export type ChatWhereInput = {
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    id?: StringFilter<"Chat"> | string
    type?: EnumChatTypeFilter<"Chat"> | $Enums.ChatType
    title?: StringNullableFilter<"Chat"> | string | null
    description?: StringNullableFilter<"Chat"> | string | null
    photoMediaId?: StringNullableFilter<"Chat"> | string | null
    createdByUserId?: StringFilter<"Chat"> | string
    isArchived?: BoolFilter<"Chat"> | boolean
    joinMode?: EnumJoinModeFilter<"Chat"> | $Enums.JoinMode
    isPublic?: BoolFilter<"Chat"> | boolean
    historyVisibility?: EnumHistoryVisibilityFilter<"Chat"> | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFilter<"Chat"> | boolean
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    updatedAt?: DateTimeFilter<"Chat"> | Date | string
    members?: ChatMemberListRelationFilter
    permissions?: XOR<ChatPermissionNullableScalarRelationFilter, ChatPermissionWhereInput> | null
    inviteLinks?: InviteLinkListRelationFilter
    chatPins?: ChatPinListRelationFilter
    chatMutes?: ChatMuteListRelationFilter
    joinRequests?: JoinRequestListRelationFilter
    moderationLogs?: ModerationLogListRelationFilter
  }

  export type ChatOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    photoMediaId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    isArchived?: SortOrder
    joinMode?: SortOrder
    isPublic?: SortOrder
    historyVisibility?: SortOrder
    allowMemberInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: ChatMemberOrderByRelationAggregateInput
    permissions?: ChatPermissionOrderByWithRelationInput
    inviteLinks?: InviteLinkOrderByRelationAggregateInput
    chatPins?: ChatPinOrderByRelationAggregateInput
    chatMutes?: ChatMuteOrderByRelationAggregateInput
    joinRequests?: JoinRequestOrderByRelationAggregateInput
    moderationLogs?: ModerationLogOrderByRelationAggregateInput
  }

  export type ChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    type?: EnumChatTypeFilter<"Chat"> | $Enums.ChatType
    title?: StringNullableFilter<"Chat"> | string | null
    description?: StringNullableFilter<"Chat"> | string | null
    photoMediaId?: StringNullableFilter<"Chat"> | string | null
    createdByUserId?: StringFilter<"Chat"> | string
    isArchived?: BoolFilter<"Chat"> | boolean
    joinMode?: EnumJoinModeFilter<"Chat"> | $Enums.JoinMode
    isPublic?: BoolFilter<"Chat"> | boolean
    historyVisibility?: EnumHistoryVisibilityFilter<"Chat"> | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFilter<"Chat"> | boolean
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    updatedAt?: DateTimeFilter<"Chat"> | Date | string
    members?: ChatMemberListRelationFilter
    permissions?: XOR<ChatPermissionNullableScalarRelationFilter, ChatPermissionWhereInput> | null
    inviteLinks?: InviteLinkListRelationFilter
    chatPins?: ChatPinListRelationFilter
    chatMutes?: ChatMuteListRelationFilter
    joinRequests?: JoinRequestListRelationFilter
    moderationLogs?: ModerationLogListRelationFilter
  }, "id">

  export type ChatOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    photoMediaId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    isArchived?: SortOrder
    joinMode?: SortOrder
    isPublic?: SortOrder
    historyVisibility?: SortOrder
    allowMemberInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatCountOrderByAggregateInput
    _max?: ChatMaxOrderByAggregateInput
    _min?: ChatMinOrderByAggregateInput
  }

  export type ChatScalarWhereWithAggregatesInput = {
    AND?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    OR?: ChatScalarWhereWithAggregatesInput[]
    NOT?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chat"> | string
    type?: EnumChatTypeWithAggregatesFilter<"Chat"> | $Enums.ChatType
    title?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    description?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    photoMediaId?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    createdByUserId?: StringWithAggregatesFilter<"Chat"> | string
    isArchived?: BoolWithAggregatesFilter<"Chat"> | boolean
    joinMode?: EnumJoinModeWithAggregatesFilter<"Chat"> | $Enums.JoinMode
    isPublic?: BoolWithAggregatesFilter<"Chat"> | boolean
    historyVisibility?: EnumHistoryVisibilityWithAggregatesFilter<"Chat"> | $Enums.HistoryVisibility
    allowMemberInvites?: BoolWithAggregatesFilter<"Chat"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
  }

  export type ChatMemberWhereInput = {
    AND?: ChatMemberWhereInput | ChatMemberWhereInput[]
    OR?: ChatMemberWhereInput[]
    NOT?: ChatMemberWhereInput | ChatMemberWhereInput[]
    id?: StringFilter<"ChatMember"> | string
    chatId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    role?: EnumChatMemberRoleFilter<"ChatMember"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFilter<"ChatMember"> | $Enums.ChatMemberStatus
    invitedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    joinedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    adminPermissions?: JsonNullableFilter<"ChatMember">
    restriction?: JsonNullableFilter<"ChatMember">
    restrictionUntil?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    restrictedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    restrictedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    bannedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedReason?: StringNullableFilter<"ChatMember"> | string | null
    promotedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    promotedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type ChatMemberOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    invitedByUserId?: SortOrderInput | SortOrder
    joinedAt?: SortOrderInput | SortOrder
    leftAt?: SortOrderInput | SortOrder
    adminPermissions?: SortOrderInput | SortOrder
    restriction?: SortOrderInput | SortOrder
    restrictionUntil?: SortOrderInput | SortOrder
    restrictedByUserId?: SortOrderInput | SortOrder
    restrictedAt?: SortOrderInput | SortOrder
    bannedByUserId?: SortOrderInput | SortOrder
    bannedAt?: SortOrderInput | SortOrder
    bannedReason?: SortOrderInput | SortOrder
    promotedByUserId?: SortOrderInput | SortOrder
    promotedAt?: SortOrderInput | SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type ChatMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_userId?: ChatMemberChatIdUserIdCompoundUniqueInput
    AND?: ChatMemberWhereInput | ChatMemberWhereInput[]
    OR?: ChatMemberWhereInput[]
    NOT?: ChatMemberWhereInput | ChatMemberWhereInput[]
    chatId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    role?: EnumChatMemberRoleFilter<"ChatMember"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFilter<"ChatMember"> | $Enums.ChatMemberStatus
    invitedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    joinedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    adminPermissions?: JsonNullableFilter<"ChatMember">
    restriction?: JsonNullableFilter<"ChatMember">
    restrictionUntil?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    restrictedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    restrictedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    bannedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedReason?: StringNullableFilter<"ChatMember"> | string | null
    promotedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    promotedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id" | "chatId_userId">

  export type ChatMemberOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    invitedByUserId?: SortOrderInput | SortOrder
    joinedAt?: SortOrderInput | SortOrder
    leftAt?: SortOrderInput | SortOrder
    adminPermissions?: SortOrderInput | SortOrder
    restriction?: SortOrderInput | SortOrder
    restrictionUntil?: SortOrderInput | SortOrder
    restrictedByUserId?: SortOrderInput | SortOrder
    restrictedAt?: SortOrderInput | SortOrder
    bannedByUserId?: SortOrderInput | SortOrder
    bannedAt?: SortOrderInput | SortOrder
    bannedReason?: SortOrderInput | SortOrder
    promotedByUserId?: SortOrderInput | SortOrder
    promotedAt?: SortOrderInput | SortOrder
    _count?: ChatMemberCountOrderByAggregateInput
    _max?: ChatMemberMaxOrderByAggregateInput
    _min?: ChatMemberMinOrderByAggregateInput
  }

  export type ChatMemberScalarWhereWithAggregatesInput = {
    AND?: ChatMemberScalarWhereWithAggregatesInput | ChatMemberScalarWhereWithAggregatesInput[]
    OR?: ChatMemberScalarWhereWithAggregatesInput[]
    NOT?: ChatMemberScalarWhereWithAggregatesInput | ChatMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMember"> | string
    chatId?: StringWithAggregatesFilter<"ChatMember"> | string
    userId?: StringWithAggregatesFilter<"ChatMember"> | string
    role?: EnumChatMemberRoleWithAggregatesFilter<"ChatMember"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusWithAggregatesFilter<"ChatMember"> | $Enums.ChatMemberStatus
    invitedByUserId?: StringNullableWithAggregatesFilter<"ChatMember"> | string | null
    joinedAt?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
    leftAt?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
    adminPermissions?: JsonNullableWithAggregatesFilter<"ChatMember">
    restriction?: JsonNullableWithAggregatesFilter<"ChatMember">
    restrictionUntil?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
    restrictedByUserId?: StringNullableWithAggregatesFilter<"ChatMember"> | string | null
    restrictedAt?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
    bannedByUserId?: StringNullableWithAggregatesFilter<"ChatMember"> | string | null
    bannedAt?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
    bannedReason?: StringNullableWithAggregatesFilter<"ChatMember"> | string | null
    promotedByUserId?: StringNullableWithAggregatesFilter<"ChatMember"> | string | null
    promotedAt?: DateTimeNullableWithAggregatesFilter<"ChatMember"> | Date | string | null
  }

  export type ChatPermissionWhereInput = {
    AND?: ChatPermissionWhereInput | ChatPermissionWhereInput[]
    OR?: ChatPermissionWhereInput[]
    NOT?: ChatPermissionWhereInput | ChatPermissionWhereInput[]
    chatId?: StringFilter<"ChatPermission"> | string
    canSendMessages?: BoolFilter<"ChatPermission"> | boolean
    canAddMembers?: BoolFilter<"ChatPermission"> | boolean
    canPinMessages?: BoolFilter<"ChatPermission"> | boolean
    updatedAt?: DateTimeFilter<"ChatPermission"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type ChatPermissionOrderByWithRelationInput = {
    chatId?: SortOrder
    canSendMessages?: SortOrder
    canAddMembers?: SortOrder
    canPinMessages?: SortOrder
    updatedAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type ChatPermissionWhereUniqueInput = Prisma.AtLeast<{
    chatId?: string
    AND?: ChatPermissionWhereInput | ChatPermissionWhereInput[]
    OR?: ChatPermissionWhereInput[]
    NOT?: ChatPermissionWhereInput | ChatPermissionWhereInput[]
    canSendMessages?: BoolFilter<"ChatPermission"> | boolean
    canAddMembers?: BoolFilter<"ChatPermission"> | boolean
    canPinMessages?: BoolFilter<"ChatPermission"> | boolean
    updatedAt?: DateTimeFilter<"ChatPermission"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "chatId">

  export type ChatPermissionOrderByWithAggregationInput = {
    chatId?: SortOrder
    canSendMessages?: SortOrder
    canAddMembers?: SortOrder
    canPinMessages?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatPermissionCountOrderByAggregateInput
    _max?: ChatPermissionMaxOrderByAggregateInput
    _min?: ChatPermissionMinOrderByAggregateInput
  }

  export type ChatPermissionScalarWhereWithAggregatesInput = {
    AND?: ChatPermissionScalarWhereWithAggregatesInput | ChatPermissionScalarWhereWithAggregatesInput[]
    OR?: ChatPermissionScalarWhereWithAggregatesInput[]
    NOT?: ChatPermissionScalarWhereWithAggregatesInput | ChatPermissionScalarWhereWithAggregatesInput[]
    chatId?: StringWithAggregatesFilter<"ChatPermission"> | string
    canSendMessages?: BoolWithAggregatesFilter<"ChatPermission"> | boolean
    canAddMembers?: BoolWithAggregatesFilter<"ChatPermission"> | boolean
    canPinMessages?: BoolWithAggregatesFilter<"ChatPermission"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"ChatPermission"> | Date | string
  }

  export type InviteLinkWhereInput = {
    AND?: InviteLinkWhereInput | InviteLinkWhereInput[]
    OR?: InviteLinkWhereInput[]
    NOT?: InviteLinkWhereInput | InviteLinkWhereInput[]
    id?: StringFilter<"InviteLink"> | string
    chatId?: StringFilter<"InviteLink"> | string
    tokenHash?: StringFilter<"InviteLink"> | string
    createdByUserId?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    maxUses?: IntNullableFilter<"InviteLink"> | number | null
    usedCount?: IntFilter<"InviteLink"> | number
    revokedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    requiresApproval?: BoolFilter<"InviteLink"> | boolean
    isPrimary?: BoolFilter<"InviteLink"> | boolean
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
    joinRequests?: JoinRequestListRelationFilter
  }

  export type InviteLinkOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    tokenHash?: SortOrder
    createdByUserId?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    usedCount?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    requiresApproval?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
    joinRequests?: JoinRequestOrderByRelationAggregateInput
  }

  export type InviteLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: InviteLinkWhereInput | InviteLinkWhereInput[]
    OR?: InviteLinkWhereInput[]
    NOT?: InviteLinkWhereInput | InviteLinkWhereInput[]
    chatId?: StringFilter<"InviteLink"> | string
    createdByUserId?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    maxUses?: IntNullableFilter<"InviteLink"> | number | null
    usedCount?: IntFilter<"InviteLink"> | number
    revokedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    requiresApproval?: BoolFilter<"InviteLink"> | boolean
    isPrimary?: BoolFilter<"InviteLink"> | boolean
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
    joinRequests?: JoinRequestListRelationFilter
  }, "id" | "tokenHash">

  export type InviteLinkOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    tokenHash?: SortOrder
    createdByUserId?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    usedCount?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    requiresApproval?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    _count?: InviteLinkCountOrderByAggregateInput
    _avg?: InviteLinkAvgOrderByAggregateInput
    _max?: InviteLinkMaxOrderByAggregateInput
    _min?: InviteLinkMinOrderByAggregateInput
    _sum?: InviteLinkSumOrderByAggregateInput
  }

  export type InviteLinkScalarWhereWithAggregatesInput = {
    AND?: InviteLinkScalarWhereWithAggregatesInput | InviteLinkScalarWhereWithAggregatesInput[]
    OR?: InviteLinkScalarWhereWithAggregatesInput[]
    NOT?: InviteLinkScalarWhereWithAggregatesInput | InviteLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InviteLink"> | string
    chatId?: StringWithAggregatesFilter<"InviteLink"> | string
    tokenHash?: StringWithAggregatesFilter<"InviteLink"> | string
    createdByUserId?: StringWithAggregatesFilter<"InviteLink"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    maxUses?: IntNullableWithAggregatesFilter<"InviteLink"> | number | null
    usedCount?: IntWithAggregatesFilter<"InviteLink"> | number
    revokedAt?: DateTimeNullableWithAggregatesFilter<"InviteLink"> | Date | string | null
    requiresApproval?: BoolWithAggregatesFilter<"InviteLink"> | boolean
    isPrimary?: BoolWithAggregatesFilter<"InviteLink"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"InviteLink"> | Date | string
  }

  export type JoinRequestWhereInput = {
    AND?: JoinRequestWhereInput | JoinRequestWhereInput[]
    OR?: JoinRequestWhereInput[]
    NOT?: JoinRequestWhereInput | JoinRequestWhereInput[]
    id?: StringFilter<"JoinRequest"> | string
    chatId?: StringFilter<"JoinRequest"> | string
    userId?: StringFilter<"JoinRequest"> | string
    inviteLinkId?: StringNullableFilter<"JoinRequest"> | string | null
    status?: EnumJoinRequestStatusFilter<"JoinRequest"> | $Enums.JoinRequestStatus
    reviewedByUserId?: StringNullableFilter<"JoinRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"JoinRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"JoinRequest"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
    inviteLink?: XOR<InviteLinkNullableScalarRelationFilter, InviteLinkWhereInput> | null
  }

  export type JoinRequestOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    inviteLinkId?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedByUserId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
    inviteLink?: InviteLinkOrderByWithRelationInput
  }

  export type JoinRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JoinRequestWhereInput | JoinRequestWhereInput[]
    OR?: JoinRequestWhereInput[]
    NOT?: JoinRequestWhereInput | JoinRequestWhereInput[]
    chatId?: StringFilter<"JoinRequest"> | string
    userId?: StringFilter<"JoinRequest"> | string
    inviteLinkId?: StringNullableFilter<"JoinRequest"> | string | null
    status?: EnumJoinRequestStatusFilter<"JoinRequest"> | $Enums.JoinRequestStatus
    reviewedByUserId?: StringNullableFilter<"JoinRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"JoinRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"JoinRequest"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
    inviteLink?: XOR<InviteLinkNullableScalarRelationFilter, InviteLinkWhereInput> | null
  }, "id">

  export type JoinRequestOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    inviteLinkId?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedByUserId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: JoinRequestCountOrderByAggregateInput
    _max?: JoinRequestMaxOrderByAggregateInput
    _min?: JoinRequestMinOrderByAggregateInput
  }

  export type JoinRequestScalarWhereWithAggregatesInput = {
    AND?: JoinRequestScalarWhereWithAggregatesInput | JoinRequestScalarWhereWithAggregatesInput[]
    OR?: JoinRequestScalarWhereWithAggregatesInput[]
    NOT?: JoinRequestScalarWhereWithAggregatesInput | JoinRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JoinRequest"> | string
    chatId?: StringWithAggregatesFilter<"JoinRequest"> | string
    userId?: StringWithAggregatesFilter<"JoinRequest"> | string
    inviteLinkId?: StringNullableWithAggregatesFilter<"JoinRequest"> | string | null
    status?: EnumJoinRequestStatusWithAggregatesFilter<"JoinRequest"> | $Enums.JoinRequestStatus
    reviewedByUserId?: StringNullableWithAggregatesFilter<"JoinRequest"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"JoinRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JoinRequest"> | Date | string
  }

  export type ModerationLogWhereInput = {
    AND?: ModerationLogWhereInput | ModerationLogWhereInput[]
    OR?: ModerationLogWhereInput[]
    NOT?: ModerationLogWhereInput | ModerationLogWhereInput[]
    id?: StringFilter<"ModerationLog"> | string
    chatId?: StringFilter<"ModerationLog"> | string
    performedByUserId?: StringFilter<"ModerationLog"> | string
    targetUserId?: StringNullableFilter<"ModerationLog"> | string | null
    targetMessageId?: StringNullableFilter<"ModerationLog"> | string | null
    action?: StringFilter<"ModerationLog"> | string
    meta?: JsonNullableFilter<"ModerationLog">
    createdAt?: DateTimeFilter<"ModerationLog"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type ModerationLogOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    performedByUserId?: SortOrder
    targetUserId?: SortOrderInput | SortOrder
    targetMessageId?: SortOrderInput | SortOrder
    action?: SortOrder
    meta?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type ModerationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModerationLogWhereInput | ModerationLogWhereInput[]
    OR?: ModerationLogWhereInput[]
    NOT?: ModerationLogWhereInput | ModerationLogWhereInput[]
    chatId?: StringFilter<"ModerationLog"> | string
    performedByUserId?: StringFilter<"ModerationLog"> | string
    targetUserId?: StringNullableFilter<"ModerationLog"> | string | null
    targetMessageId?: StringNullableFilter<"ModerationLog"> | string | null
    action?: StringFilter<"ModerationLog"> | string
    meta?: JsonNullableFilter<"ModerationLog">
    createdAt?: DateTimeFilter<"ModerationLog"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id">

  export type ModerationLogOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    performedByUserId?: SortOrder
    targetUserId?: SortOrderInput | SortOrder
    targetMessageId?: SortOrderInput | SortOrder
    action?: SortOrder
    meta?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ModerationLogCountOrderByAggregateInput
    _max?: ModerationLogMaxOrderByAggregateInput
    _min?: ModerationLogMinOrderByAggregateInput
  }

  export type ModerationLogScalarWhereWithAggregatesInput = {
    AND?: ModerationLogScalarWhereWithAggregatesInput | ModerationLogScalarWhereWithAggregatesInput[]
    OR?: ModerationLogScalarWhereWithAggregatesInput[]
    NOT?: ModerationLogScalarWhereWithAggregatesInput | ModerationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModerationLog"> | string
    chatId?: StringWithAggregatesFilter<"ModerationLog"> | string
    performedByUserId?: StringWithAggregatesFilter<"ModerationLog"> | string
    targetUserId?: StringNullableWithAggregatesFilter<"ModerationLog"> | string | null
    targetMessageId?: StringNullableWithAggregatesFilter<"ModerationLog"> | string | null
    action?: StringWithAggregatesFilter<"ModerationLog"> | string
    meta?: JsonNullableWithAggregatesFilter<"ModerationLog">
    createdAt?: DateTimeWithAggregatesFilter<"ModerationLog"> | Date | string
  }

  export type ChatPinWhereInput = {
    AND?: ChatPinWhereInput | ChatPinWhereInput[]
    OR?: ChatPinWhereInput[]
    NOT?: ChatPinWhereInput | ChatPinWhereInput[]
    id?: StringFilter<"ChatPin"> | string
    chatId?: StringFilter<"ChatPin"> | string
    userId?: StringFilter<"ChatPin"> | string
    pinnedAt?: DateTimeFilter<"ChatPin"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type ChatPinOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    pinnedAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type ChatPinWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_userId?: ChatPinChatIdUserIdCompoundUniqueInput
    AND?: ChatPinWhereInput | ChatPinWhereInput[]
    OR?: ChatPinWhereInput[]
    NOT?: ChatPinWhereInput | ChatPinWhereInput[]
    chatId?: StringFilter<"ChatPin"> | string
    userId?: StringFilter<"ChatPin"> | string
    pinnedAt?: DateTimeFilter<"ChatPin"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id" | "chatId_userId">

  export type ChatPinOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    pinnedAt?: SortOrder
    _count?: ChatPinCountOrderByAggregateInput
    _max?: ChatPinMaxOrderByAggregateInput
    _min?: ChatPinMinOrderByAggregateInput
  }

  export type ChatPinScalarWhereWithAggregatesInput = {
    AND?: ChatPinScalarWhereWithAggregatesInput | ChatPinScalarWhereWithAggregatesInput[]
    OR?: ChatPinScalarWhereWithAggregatesInput[]
    NOT?: ChatPinScalarWhereWithAggregatesInput | ChatPinScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatPin"> | string
    chatId?: StringWithAggregatesFilter<"ChatPin"> | string
    userId?: StringWithAggregatesFilter<"ChatPin"> | string
    pinnedAt?: DateTimeWithAggregatesFilter<"ChatPin"> | Date | string
  }

  export type ChatMuteWhereInput = {
    AND?: ChatMuteWhereInput | ChatMuteWhereInput[]
    OR?: ChatMuteWhereInput[]
    NOT?: ChatMuteWhereInput | ChatMuteWhereInput[]
    id?: StringFilter<"ChatMute"> | string
    chatId?: StringFilter<"ChatMute"> | string
    userId?: StringFilter<"ChatMute"> | string
    mutedAt?: DateTimeFilter<"ChatMute"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type ChatMuteOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    mutedAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type ChatMuteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chatId_userId?: ChatMuteChatIdUserIdCompoundUniqueInput
    AND?: ChatMuteWhereInput | ChatMuteWhereInput[]
    OR?: ChatMuteWhereInput[]
    NOT?: ChatMuteWhereInput | ChatMuteWhereInput[]
    chatId?: StringFilter<"ChatMute"> | string
    userId?: StringFilter<"ChatMute"> | string
    mutedAt?: DateTimeFilter<"ChatMute"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id" | "chatId_userId">

  export type ChatMuteOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    mutedAt?: SortOrder
    _count?: ChatMuteCountOrderByAggregateInput
    _max?: ChatMuteMaxOrderByAggregateInput
    _min?: ChatMuteMinOrderByAggregateInput
  }

  export type ChatMuteScalarWhereWithAggregatesInput = {
    AND?: ChatMuteScalarWhereWithAggregatesInput | ChatMuteScalarWhereWithAggregatesInput[]
    OR?: ChatMuteScalarWhereWithAggregatesInput[]
    NOT?: ChatMuteScalarWhereWithAggregatesInput | ChatMuteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMute"> | string
    chatId?: StringWithAggregatesFilter<"ChatMute"> | string
    userId?: StringWithAggregatesFilter<"ChatMute"> | string
    mutedAt?: DateTimeWithAggregatesFilter<"ChatMute"> | Date | string
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

  export type ChatMembershipProjectionWhereInput = {
    AND?: ChatMembershipProjectionWhereInput | ChatMembershipProjectionWhereInput[]
    OR?: ChatMembershipProjectionWhereInput[]
    NOT?: ChatMembershipProjectionWhereInput | ChatMembershipProjectionWhereInput[]
    chatId?: StringFilter<"ChatMembershipProjection"> | string
    userId?: StringFilter<"ChatMembershipProjection"> | string
    role?: EnumChatMemberRoleFilter<"ChatMembershipProjection"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFilter<"ChatMembershipProjection"> | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFilter<"ChatMembershipProjection"> | Date | string
  }

  export type ChatMembershipProjectionOrderByWithRelationInput = {
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionWhereUniqueInput = Prisma.AtLeast<{
    chatId_userId?: ChatMembershipProjectionChatIdUserIdCompoundUniqueInput
    AND?: ChatMembershipProjectionWhereInput | ChatMembershipProjectionWhereInput[]
    OR?: ChatMembershipProjectionWhereInput[]
    NOT?: ChatMembershipProjectionWhereInput | ChatMembershipProjectionWhereInput[]
    chatId?: StringFilter<"ChatMembershipProjection"> | string
    userId?: StringFilter<"ChatMembershipProjection"> | string
    role?: EnumChatMemberRoleFilter<"ChatMembershipProjection"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFilter<"ChatMembershipProjection"> | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFilter<"ChatMembershipProjection"> | Date | string
  }, "chatId_userId">

  export type ChatMembershipProjectionOrderByWithAggregationInput = {
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatMembershipProjectionCountOrderByAggregateInput
    _max?: ChatMembershipProjectionMaxOrderByAggregateInput
    _min?: ChatMembershipProjectionMinOrderByAggregateInput
  }

  export type ChatMembershipProjectionScalarWhereWithAggregatesInput = {
    AND?: ChatMembershipProjectionScalarWhereWithAggregatesInput | ChatMembershipProjectionScalarWhereWithAggregatesInput[]
    OR?: ChatMembershipProjectionScalarWhereWithAggregatesInput[]
    NOT?: ChatMembershipProjectionScalarWhereWithAggregatesInput | ChatMembershipProjectionScalarWhereWithAggregatesInput[]
    chatId?: StringWithAggregatesFilter<"ChatMembershipProjection"> | string
    userId?: StringWithAggregatesFilter<"ChatMembershipProjection"> | string
    role?: EnumChatMemberRoleWithAggregatesFilter<"ChatMembershipProjection"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusWithAggregatesFilter<"ChatMembershipProjection"> | $Enums.ChatMemberStatus
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMembershipProjection"> | Date | string
  }

  export type ChatMembershipProjectionEventWhereInput = {
    AND?: ChatMembershipProjectionEventWhereInput | ChatMembershipProjectionEventWhereInput[]
    OR?: ChatMembershipProjectionEventWhereInput[]
    NOT?: ChatMembershipProjectionEventWhereInput | ChatMembershipProjectionEventWhereInput[]
    eventId?: StringFilter<"ChatMembershipProjectionEvent"> | string
    eventType?: StringFilter<"ChatMembershipProjectionEvent"> | string
    occurredAt?: DateTimeFilter<"ChatMembershipProjectionEvent"> | Date | string
    processedAt?: DateTimeFilter<"ChatMembershipProjectionEvent"> | Date | string
    chatId?: StringNullableFilter<"ChatMembershipProjectionEvent"> | string | null
    userId?: StringNullableFilter<"ChatMembershipProjectionEvent"> | string | null
  }

  export type ChatMembershipProjectionEventOrderByWithRelationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    chatId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
  }

  export type ChatMembershipProjectionEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ChatMembershipProjectionEventWhereInput | ChatMembershipProjectionEventWhereInput[]
    OR?: ChatMembershipProjectionEventWhereInput[]
    NOT?: ChatMembershipProjectionEventWhereInput | ChatMembershipProjectionEventWhereInput[]
    eventType?: StringFilter<"ChatMembershipProjectionEvent"> | string
    occurredAt?: DateTimeFilter<"ChatMembershipProjectionEvent"> | Date | string
    processedAt?: DateTimeFilter<"ChatMembershipProjectionEvent"> | Date | string
    chatId?: StringNullableFilter<"ChatMembershipProjectionEvent"> | string | null
    userId?: StringNullableFilter<"ChatMembershipProjectionEvent"> | string | null
  }, "eventId">

  export type ChatMembershipProjectionEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    chatId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: ChatMembershipProjectionEventCountOrderByAggregateInput
    _max?: ChatMembershipProjectionEventMaxOrderByAggregateInput
    _min?: ChatMembershipProjectionEventMinOrderByAggregateInput
  }

  export type ChatMembershipProjectionEventScalarWhereWithAggregatesInput = {
    AND?: ChatMembershipProjectionEventScalarWhereWithAggregatesInput | ChatMembershipProjectionEventScalarWhereWithAggregatesInput[]
    OR?: ChatMembershipProjectionEventScalarWhereWithAggregatesInput[]
    NOT?: ChatMembershipProjectionEventScalarWhereWithAggregatesInput | ChatMembershipProjectionEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ChatMembershipProjectionEvent"> | string
    eventType?: StringWithAggregatesFilter<"ChatMembershipProjectionEvent"> | string
    occurredAt?: DateTimeWithAggregatesFilter<"ChatMembershipProjectionEvent"> | Date | string
    processedAt?: DateTimeWithAggregatesFilter<"ChatMembershipProjectionEvent"> | Date | string
    chatId?: StringNullableWithAggregatesFilter<"ChatMembershipProjectionEvent"> | string | null
    userId?: StringNullableWithAggregatesFilter<"ChatMembershipProjectionEvent"> | string | null
  }

  export type ChatMembershipProjectionOffsetWhereInput = {
    AND?: ChatMembershipProjectionOffsetWhereInput | ChatMembershipProjectionOffsetWhereInput[]
    OR?: ChatMembershipProjectionOffsetWhereInput[]
    NOT?: ChatMembershipProjectionOffsetWhereInput | ChatMembershipProjectionOffsetWhereInput[]
    consumer?: StringFilter<"ChatMembershipProjectionOffset"> | string
    lastEventId?: StringNullableFilter<"ChatMembershipProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableFilter<"ChatMembershipProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeFilter<"ChatMembershipProjectionOffset"> | Date | string
  }

  export type ChatMembershipProjectionOffsetOrderByWithRelationInput = {
    consumer?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastOccurredAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionOffsetWhereUniqueInput = Prisma.AtLeast<{
    consumer?: string
    AND?: ChatMembershipProjectionOffsetWhereInput | ChatMembershipProjectionOffsetWhereInput[]
    OR?: ChatMembershipProjectionOffsetWhereInput[]
    NOT?: ChatMembershipProjectionOffsetWhereInput | ChatMembershipProjectionOffsetWhereInput[]
    lastEventId?: StringNullableFilter<"ChatMembershipProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableFilter<"ChatMembershipProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeFilter<"ChatMembershipProjectionOffset"> | Date | string
  }, "consumer">

  export type ChatMembershipProjectionOffsetOrderByWithAggregationInput = {
    consumer?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastOccurredAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ChatMembershipProjectionOffsetCountOrderByAggregateInput
    _max?: ChatMembershipProjectionOffsetMaxOrderByAggregateInput
    _min?: ChatMembershipProjectionOffsetMinOrderByAggregateInput
  }

  export type ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput = {
    AND?: ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput | ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput[]
    OR?: ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput[]
    NOT?: ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput | ChatMembershipProjectionOffsetScalarWhereWithAggregatesInput[]
    consumer?: StringWithAggregatesFilter<"ChatMembershipProjectionOffset"> | string
    lastEventId?: StringNullableWithAggregatesFilter<"ChatMembershipProjectionOffset"> | string | null
    lastOccurredAt?: DateTimeNullableWithAggregatesFilter<"ChatMembershipProjectionOffset"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMembershipProjectionOffset"> | Date | string
  }

  export type ChatCreateInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateManyInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMemberCreateInput = {
    id: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
    chat: ChatCreateNestedOneWithoutMembersInput
  }

  export type ChatMemberUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
  }

  export type ChatMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chat?: ChatUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ChatMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMemberCreateManyInput = {
    id: string
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
  }

  export type ChatMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatPermissionCreateInput = {
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: Date | string
    chat: ChatCreateNestedOneWithoutPermissionsInput
  }

  export type ChatPermissionUncheckedCreateInput = {
    chatId: string
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: Date | string
  }

  export type ChatPermissionUpdateInput = {
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type ChatPermissionUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPermissionCreateManyInput = {
    chatId: string
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: Date | string
  }

  export type ChatPermissionUpdateManyMutationInput = {
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPermissionUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkCreateInput = {
    id: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
    chat: ChatCreateNestedOneWithoutInviteLinksInput
    joinRequests?: JoinRequestCreateNestedManyWithoutInviteLinkInput
  }

  export type InviteLinkUncheckedCreateInput = {
    id: string
    chatId: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutInviteLinkInput
  }

  export type InviteLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutInviteLinksNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutInviteLinkNestedInput
  }

  export type InviteLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutInviteLinkNestedInput
  }

  export type InviteLinkCreateManyInput = {
    id: string
    chatId: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type InviteLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestCreateInput = {
    id: string
    userId: string
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    chat: ChatCreateNestedOneWithoutJoinRequestsInput
    inviteLink?: InviteLinkCreateNestedOneWithoutJoinRequestsInput
  }

  export type JoinRequestUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    inviteLinkId?: string | null
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JoinRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutJoinRequestsNestedInput
    inviteLink?: InviteLinkUpdateOneWithoutJoinRequestsNestedInput
  }

  export type JoinRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inviteLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestCreateManyInput = {
    id: string
    chatId: string
    userId: string
    inviteLinkId?: string | null
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JoinRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inviteLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogCreateInput = {
    id: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    chat: ChatCreateNestedOneWithoutModerationLogsInput
  }

  export type ModerationLogUncheckedCreateInput = {
    id: string
    chatId: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ModerationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutModerationLogsNestedInput
  }

  export type ModerationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogCreateManyInput = {
    id: string
    chatId: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ModerationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinCreateInput = {
    id: string
    userId: string
    pinnedAt?: Date | string
    chat: ChatCreateNestedOneWithoutChatPinsInput
  }

  export type ChatPinUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    pinnedAt?: Date | string
  }

  export type ChatPinUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutChatPinsNestedInput
  }

  export type ChatPinUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinCreateManyInput = {
    id: string
    chatId: string
    userId: string
    pinnedAt?: Date | string
  }

  export type ChatPinUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteCreateInput = {
    id: string
    userId: string
    mutedAt?: Date | string
    chat: ChatCreateNestedOneWithoutChatMutesInput
  }

  export type ChatMuteUncheckedCreateInput = {
    id: string
    chatId: string
    userId: string
    mutedAt?: Date | string
  }

  export type ChatMuteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutChatMutesNestedInput
  }

  export type ChatMuteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteCreateManyInput = {
    id: string
    chatId: string
    userId: string
    mutedAt?: Date | string
  }

  export type ChatMuteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ChatMembershipProjectionCreateInput = {
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    updatedAt: Date | string
  }

  export type ChatMembershipProjectionUncheckedCreateInput = {
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    updatedAt: Date | string
  }

  export type ChatMembershipProjectionUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionCreateManyInput = {
    chatId: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    updatedAt: Date | string
  }

  export type ChatMembershipProjectionUpdateManyMutationInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionEventCreateInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    processedAt?: Date | string
    chatId?: string | null
    userId?: string | null
  }

  export type ChatMembershipProjectionEventUncheckedCreateInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    processedAt?: Date | string
    chatId?: string | null
    userId?: string | null
  }

  export type ChatMembershipProjectionEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatMembershipProjectionEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatMembershipProjectionEventCreateManyInput = {
    eventId: string
    eventType: string
    occurredAt: Date | string
    processedAt?: Date | string
    chatId?: string | null
    userId?: string | null
  }

  export type ChatMembershipProjectionEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatMembershipProjectionEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChatMembershipProjectionOffsetCreateInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatMembershipProjectionOffsetUncheckedCreateInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatMembershipProjectionOffsetUpdateInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionOffsetUncheckedUpdateInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionOffsetCreateManyInput = {
    consumer: string
    lastEventId?: string | null
    lastOccurredAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ChatMembershipProjectionOffsetUpdateManyMutationInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMembershipProjectionOffsetUncheckedUpdateManyInput = {
    consumer?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastOccurredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumChatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeFilter<$PrismaModel> | $Enums.ChatType
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumJoinModeFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinMode | EnumJoinModeFieldRefInput<$PrismaModel>
    in?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinModeFilter<$PrismaModel> | $Enums.JoinMode
  }

  export type EnumHistoryVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoryVisibility | EnumHistoryVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoryVisibilityFilter<$PrismaModel> | $Enums.HistoryVisibility
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

  export type ChatMemberListRelationFilter = {
    every?: ChatMemberWhereInput
    some?: ChatMemberWhereInput
    none?: ChatMemberWhereInput
  }

  export type ChatPermissionNullableScalarRelationFilter = {
    is?: ChatPermissionWhereInput | null
    isNot?: ChatPermissionWhereInput | null
  }

  export type InviteLinkListRelationFilter = {
    every?: InviteLinkWhereInput
    some?: InviteLinkWhereInput
    none?: InviteLinkWhereInput
  }

  export type ChatPinListRelationFilter = {
    every?: ChatPinWhereInput
    some?: ChatPinWhereInput
    none?: ChatPinWhereInput
  }

  export type ChatMuteListRelationFilter = {
    every?: ChatMuteWhereInput
    some?: ChatMuteWhereInput
    none?: ChatMuteWhereInput
  }

  export type JoinRequestListRelationFilter = {
    every?: JoinRequestWhereInput
    some?: JoinRequestWhereInput
    none?: JoinRequestWhereInput
  }

  export type ModerationLogListRelationFilter = {
    every?: ModerationLogWhereInput
    some?: ModerationLogWhereInput
    none?: ModerationLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChatMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InviteLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatPinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatMuteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JoinRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModerationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    photoMediaId?: SortOrder
    createdByUserId?: SortOrder
    isArchived?: SortOrder
    joinMode?: SortOrder
    isPublic?: SortOrder
    historyVisibility?: SortOrder
    allowMemberInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    photoMediaId?: SortOrder
    createdByUserId?: SortOrder
    isArchived?: SortOrder
    joinMode?: SortOrder
    isPublic?: SortOrder
    historyVisibility?: SortOrder
    allowMemberInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    photoMediaId?: SortOrder
    createdByUserId?: SortOrder
    isArchived?: SortOrder
    joinMode?: SortOrder
    isPublic?: SortOrder
    historyVisibility?: SortOrder
    allowMemberInvites?: SortOrder
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

  export type EnumChatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChatType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatTypeFilter<$PrismaModel>
    _max?: NestedEnumChatTypeFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumJoinModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinMode | EnumJoinModeFieldRefInput<$PrismaModel>
    in?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinModeWithAggregatesFilter<$PrismaModel> | $Enums.JoinMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJoinModeFilter<$PrismaModel>
    _max?: NestedEnumJoinModeFilter<$PrismaModel>
  }

  export type EnumHistoryVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoryVisibility | EnumHistoryVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoryVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.HistoryVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHistoryVisibilityFilter<$PrismaModel>
    _max?: NestedEnumHistoryVisibilityFilter<$PrismaModel>
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

  export type EnumChatMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberRole | EnumChatMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberRoleFilter<$PrismaModel> | $Enums.ChatMemberRole
  }

  export type EnumChatMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberStatus | EnumChatMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberStatusFilter<$PrismaModel> | $Enums.ChatMemberStatus
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type ChatScalarRelationFilter = {
    is?: ChatWhereInput
    isNot?: ChatWhereInput
  }

  export type ChatMemberChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ChatMemberCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    invitedByUserId?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    adminPermissions?: SortOrder
    restriction?: SortOrder
    restrictionUntil?: SortOrder
    restrictedByUserId?: SortOrder
    restrictedAt?: SortOrder
    bannedByUserId?: SortOrder
    bannedAt?: SortOrder
    bannedReason?: SortOrder
    promotedByUserId?: SortOrder
    promotedAt?: SortOrder
  }

  export type ChatMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    invitedByUserId?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    restrictionUntil?: SortOrder
    restrictedByUserId?: SortOrder
    restrictedAt?: SortOrder
    bannedByUserId?: SortOrder
    bannedAt?: SortOrder
    bannedReason?: SortOrder
    promotedByUserId?: SortOrder
    promotedAt?: SortOrder
  }

  export type ChatMemberMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    invitedByUserId?: SortOrder
    joinedAt?: SortOrder
    leftAt?: SortOrder
    restrictionUntil?: SortOrder
    restrictedByUserId?: SortOrder
    restrictedAt?: SortOrder
    bannedByUserId?: SortOrder
    bannedAt?: SortOrder
    bannedReason?: SortOrder
    promotedByUserId?: SortOrder
    promotedAt?: SortOrder
  }

  export type EnumChatMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberRole | EnumChatMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumChatMemberRoleFilter<$PrismaModel>
  }

  export type EnumChatMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberStatus | EnumChatMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChatMemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumChatMemberStatusFilter<$PrismaModel>
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ChatPermissionCountOrderByAggregateInput = {
    chatId?: SortOrder
    canSendMessages?: SortOrder
    canAddMembers?: SortOrder
    canPinMessages?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatPermissionMaxOrderByAggregateInput = {
    chatId?: SortOrder
    canSendMessages?: SortOrder
    canAddMembers?: SortOrder
    canPinMessages?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatPermissionMinOrderByAggregateInput = {
    chatId?: SortOrder
    canSendMessages?: SortOrder
    canAddMembers?: SortOrder
    canPinMessages?: SortOrder
    updatedAt?: SortOrder
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

  export type InviteLinkCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    tokenHash?: SortOrder
    createdByUserId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    revokedAt?: SortOrder
    requiresApproval?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type InviteLinkAvgOrderByAggregateInput = {
    maxUses?: SortOrder
    usedCount?: SortOrder
  }

  export type InviteLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    tokenHash?: SortOrder
    createdByUserId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    revokedAt?: SortOrder
    requiresApproval?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type InviteLinkMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    tokenHash?: SortOrder
    createdByUserId?: SortOrder
    expiresAt?: SortOrder
    maxUses?: SortOrder
    usedCount?: SortOrder
    revokedAt?: SortOrder
    requiresApproval?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type InviteLinkSumOrderByAggregateInput = {
    maxUses?: SortOrder
    usedCount?: SortOrder
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

  export type EnumJoinRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | EnumJoinRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinRequestStatusFilter<$PrismaModel> | $Enums.JoinRequestStatus
  }

  export type InviteLinkNullableScalarRelationFilter = {
    is?: InviteLinkWhereInput | null
    isNot?: InviteLinkWhereInput | null
  }

  export type JoinRequestCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    inviteLinkId?: SortOrder
    status?: SortOrder
    reviewedByUserId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type JoinRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    inviteLinkId?: SortOrder
    status?: SortOrder
    reviewedByUserId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type JoinRequestMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    inviteLinkId?: SortOrder
    status?: SortOrder
    reviewedByUserId?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumJoinRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | EnumJoinRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJoinRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumJoinRequestStatusFilter<$PrismaModel>
  }

  export type ModerationLogCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    performedByUserId?: SortOrder
    targetUserId?: SortOrder
    targetMessageId?: SortOrder
    action?: SortOrder
    meta?: SortOrder
    createdAt?: SortOrder
  }

  export type ModerationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    performedByUserId?: SortOrder
    targetUserId?: SortOrder
    targetMessageId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type ModerationLogMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    performedByUserId?: SortOrder
    targetUserId?: SortOrder
    targetMessageId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatPinChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ChatPinCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    pinnedAt?: SortOrder
  }

  export type ChatPinMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    pinnedAt?: SortOrder
  }

  export type ChatPinMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    pinnedAt?: SortOrder
  }

  export type ChatMuteChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ChatMuteCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    mutedAt?: SortOrder
  }

  export type ChatMuteMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    mutedAt?: SortOrder
  }

  export type ChatMuteMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    mutedAt?: SortOrder
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

  export type ChatMembershipProjectionChatIdUserIdCompoundUniqueInput = {
    chatId: string
    userId: string
  }

  export type ChatMembershipProjectionCountOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionMaxOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionMinOrderByAggregateInput = {
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
  }

  export type ChatMembershipProjectionEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
  }

  export type ChatMembershipProjectionEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    occurredAt?: SortOrder
    processedAt?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
  }

  export type ChatMembershipProjectionOffsetCountOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionOffsetMaxOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMembershipProjectionOffsetMinOrderByAggregateInput = {
    consumer?: SortOrder
    lastEventId?: SortOrder
    lastOccurredAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMemberCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput> | ChatMemberCreateWithoutChatInput[] | ChatMemberUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutChatInput | ChatMemberCreateOrConnectWithoutChatInput[]
    createMany?: ChatMemberCreateManyChatInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type ChatPermissionCreateNestedOneWithoutChatInput = {
    create?: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
    connectOrCreate?: ChatPermissionCreateOrConnectWithoutChatInput
    connect?: ChatPermissionWhereUniqueInput
  }

  export type InviteLinkCreateNestedManyWithoutChatInput = {
    create?: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput> | InviteLinkCreateWithoutChatInput[] | InviteLinkUncheckedCreateWithoutChatInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutChatInput | InviteLinkCreateOrConnectWithoutChatInput[]
    createMany?: InviteLinkCreateManyChatInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type ChatPinCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput> | ChatPinCreateWithoutChatInput[] | ChatPinUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatPinCreateOrConnectWithoutChatInput | ChatPinCreateOrConnectWithoutChatInput[]
    createMany?: ChatPinCreateManyChatInputEnvelope
    connect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
  }

  export type ChatMuteCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput> | ChatMuteCreateWithoutChatInput[] | ChatMuteUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMuteCreateOrConnectWithoutChatInput | ChatMuteCreateOrConnectWithoutChatInput[]
    createMany?: ChatMuteCreateManyChatInputEnvelope
    connect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
  }

  export type JoinRequestCreateNestedManyWithoutChatInput = {
    create?: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput> | JoinRequestCreateWithoutChatInput[] | JoinRequestUncheckedCreateWithoutChatInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutChatInput | JoinRequestCreateOrConnectWithoutChatInput[]
    createMany?: JoinRequestCreateManyChatInputEnvelope
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
  }

  export type ModerationLogCreateNestedManyWithoutChatInput = {
    create?: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput> | ModerationLogCreateWithoutChatInput[] | ModerationLogUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ModerationLogCreateOrConnectWithoutChatInput | ModerationLogCreateOrConnectWithoutChatInput[]
    createMany?: ModerationLogCreateManyChatInputEnvelope
    connect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
  }

  export type ChatMemberUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput> | ChatMemberCreateWithoutChatInput[] | ChatMemberUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutChatInput | ChatMemberCreateOrConnectWithoutChatInput[]
    createMany?: ChatMemberCreateManyChatInputEnvelope
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
  }

  export type ChatPermissionUncheckedCreateNestedOneWithoutChatInput = {
    create?: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
    connectOrCreate?: ChatPermissionCreateOrConnectWithoutChatInput
    connect?: ChatPermissionWhereUniqueInput
  }

  export type InviteLinkUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput> | InviteLinkCreateWithoutChatInput[] | InviteLinkUncheckedCreateWithoutChatInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutChatInput | InviteLinkCreateOrConnectWithoutChatInput[]
    createMany?: InviteLinkCreateManyChatInputEnvelope
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
  }

  export type ChatPinUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput> | ChatPinCreateWithoutChatInput[] | ChatPinUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatPinCreateOrConnectWithoutChatInput | ChatPinCreateOrConnectWithoutChatInput[]
    createMany?: ChatPinCreateManyChatInputEnvelope
    connect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
  }

  export type ChatMuteUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput> | ChatMuteCreateWithoutChatInput[] | ChatMuteUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMuteCreateOrConnectWithoutChatInput | ChatMuteCreateOrConnectWithoutChatInput[]
    createMany?: ChatMuteCreateManyChatInputEnvelope
    connect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
  }

  export type JoinRequestUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput> | JoinRequestCreateWithoutChatInput[] | JoinRequestUncheckedCreateWithoutChatInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutChatInput | JoinRequestCreateOrConnectWithoutChatInput[]
    createMany?: JoinRequestCreateManyChatInputEnvelope
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
  }

  export type ModerationLogUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput> | ModerationLogCreateWithoutChatInput[] | ModerationLogUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ModerationLogCreateOrConnectWithoutChatInput | ModerationLogCreateOrConnectWithoutChatInput[]
    createMany?: ModerationLogCreateManyChatInputEnvelope
    connect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumChatTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChatType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumJoinModeFieldUpdateOperationsInput = {
    set?: $Enums.JoinMode
  }

  export type EnumHistoryVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.HistoryVisibility
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChatMemberUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput> | ChatMemberCreateWithoutChatInput[] | ChatMemberUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutChatInput | ChatMemberCreateOrConnectWithoutChatInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutChatInput | ChatMemberUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatMemberCreateManyChatInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutChatInput | ChatMemberUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutChatInput | ChatMemberUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type ChatPermissionUpdateOneWithoutChatNestedInput = {
    create?: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
    connectOrCreate?: ChatPermissionCreateOrConnectWithoutChatInput
    upsert?: ChatPermissionUpsertWithoutChatInput
    disconnect?: ChatPermissionWhereInput | boolean
    delete?: ChatPermissionWhereInput | boolean
    connect?: ChatPermissionWhereUniqueInput
    update?: XOR<XOR<ChatPermissionUpdateToOneWithWhereWithoutChatInput, ChatPermissionUpdateWithoutChatInput>, ChatPermissionUncheckedUpdateWithoutChatInput>
  }

  export type InviteLinkUpdateManyWithoutChatNestedInput = {
    create?: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput> | InviteLinkCreateWithoutChatInput[] | InviteLinkUncheckedCreateWithoutChatInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutChatInput | InviteLinkCreateOrConnectWithoutChatInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutChatInput | InviteLinkUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: InviteLinkCreateManyChatInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutChatInput | InviteLinkUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutChatInput | InviteLinkUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type ChatPinUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput> | ChatPinCreateWithoutChatInput[] | ChatPinUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatPinCreateOrConnectWithoutChatInput | ChatPinCreateOrConnectWithoutChatInput[]
    upsert?: ChatPinUpsertWithWhereUniqueWithoutChatInput | ChatPinUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatPinCreateManyChatInputEnvelope
    set?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    disconnect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    delete?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    connect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    update?: ChatPinUpdateWithWhereUniqueWithoutChatInput | ChatPinUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatPinUpdateManyWithWhereWithoutChatInput | ChatPinUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatPinScalarWhereInput | ChatPinScalarWhereInput[]
  }

  export type ChatMuteUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput> | ChatMuteCreateWithoutChatInput[] | ChatMuteUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMuteCreateOrConnectWithoutChatInput | ChatMuteCreateOrConnectWithoutChatInput[]
    upsert?: ChatMuteUpsertWithWhereUniqueWithoutChatInput | ChatMuteUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatMuteCreateManyChatInputEnvelope
    set?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    disconnect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    delete?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    connect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    update?: ChatMuteUpdateWithWhereUniqueWithoutChatInput | ChatMuteUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatMuteUpdateManyWithWhereWithoutChatInput | ChatMuteUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatMuteScalarWhereInput | ChatMuteScalarWhereInput[]
  }

  export type JoinRequestUpdateManyWithoutChatNestedInput = {
    create?: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput> | JoinRequestCreateWithoutChatInput[] | JoinRequestUncheckedCreateWithoutChatInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutChatInput | JoinRequestCreateOrConnectWithoutChatInput[]
    upsert?: JoinRequestUpsertWithWhereUniqueWithoutChatInput | JoinRequestUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: JoinRequestCreateManyChatInputEnvelope
    set?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    disconnect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    delete?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    update?: JoinRequestUpdateWithWhereUniqueWithoutChatInput | JoinRequestUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: JoinRequestUpdateManyWithWhereWithoutChatInput | JoinRequestUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
  }

  export type ModerationLogUpdateManyWithoutChatNestedInput = {
    create?: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput> | ModerationLogCreateWithoutChatInput[] | ModerationLogUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ModerationLogCreateOrConnectWithoutChatInput | ModerationLogCreateOrConnectWithoutChatInput[]
    upsert?: ModerationLogUpsertWithWhereUniqueWithoutChatInput | ModerationLogUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ModerationLogCreateManyChatInputEnvelope
    set?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    disconnect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    delete?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    connect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    update?: ModerationLogUpdateWithWhereUniqueWithoutChatInput | ModerationLogUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ModerationLogUpdateManyWithWhereWithoutChatInput | ModerationLogUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ModerationLogScalarWhereInput | ModerationLogScalarWhereInput[]
  }

  export type ChatMemberUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput> | ChatMemberCreateWithoutChatInput[] | ChatMemberUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMemberCreateOrConnectWithoutChatInput | ChatMemberCreateOrConnectWithoutChatInput[]
    upsert?: ChatMemberUpsertWithWhereUniqueWithoutChatInput | ChatMemberUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatMemberCreateManyChatInputEnvelope
    set?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    disconnect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    delete?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    connect?: ChatMemberWhereUniqueInput | ChatMemberWhereUniqueInput[]
    update?: ChatMemberUpdateWithWhereUniqueWithoutChatInput | ChatMemberUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatMemberUpdateManyWithWhereWithoutChatInput | ChatMemberUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
  }

  export type ChatPermissionUncheckedUpdateOneWithoutChatNestedInput = {
    create?: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
    connectOrCreate?: ChatPermissionCreateOrConnectWithoutChatInput
    upsert?: ChatPermissionUpsertWithoutChatInput
    disconnect?: ChatPermissionWhereInput | boolean
    delete?: ChatPermissionWhereInput | boolean
    connect?: ChatPermissionWhereUniqueInput
    update?: XOR<XOR<ChatPermissionUpdateToOneWithWhereWithoutChatInput, ChatPermissionUpdateWithoutChatInput>, ChatPermissionUncheckedUpdateWithoutChatInput>
  }

  export type InviteLinkUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput> | InviteLinkCreateWithoutChatInput[] | InviteLinkUncheckedCreateWithoutChatInput[]
    connectOrCreate?: InviteLinkCreateOrConnectWithoutChatInput | InviteLinkCreateOrConnectWithoutChatInput[]
    upsert?: InviteLinkUpsertWithWhereUniqueWithoutChatInput | InviteLinkUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: InviteLinkCreateManyChatInputEnvelope
    set?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    disconnect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    delete?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    connect?: InviteLinkWhereUniqueInput | InviteLinkWhereUniqueInput[]
    update?: InviteLinkUpdateWithWhereUniqueWithoutChatInput | InviteLinkUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: InviteLinkUpdateManyWithWhereWithoutChatInput | InviteLinkUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
  }

  export type ChatPinUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput> | ChatPinCreateWithoutChatInput[] | ChatPinUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatPinCreateOrConnectWithoutChatInput | ChatPinCreateOrConnectWithoutChatInput[]
    upsert?: ChatPinUpsertWithWhereUniqueWithoutChatInput | ChatPinUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatPinCreateManyChatInputEnvelope
    set?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    disconnect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    delete?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    connect?: ChatPinWhereUniqueInput | ChatPinWhereUniqueInput[]
    update?: ChatPinUpdateWithWhereUniqueWithoutChatInput | ChatPinUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatPinUpdateManyWithWhereWithoutChatInput | ChatPinUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatPinScalarWhereInput | ChatPinScalarWhereInput[]
  }

  export type ChatMuteUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput> | ChatMuteCreateWithoutChatInput[] | ChatMuteUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ChatMuteCreateOrConnectWithoutChatInput | ChatMuteCreateOrConnectWithoutChatInput[]
    upsert?: ChatMuteUpsertWithWhereUniqueWithoutChatInput | ChatMuteUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ChatMuteCreateManyChatInputEnvelope
    set?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    disconnect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    delete?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    connect?: ChatMuteWhereUniqueInput | ChatMuteWhereUniqueInput[]
    update?: ChatMuteUpdateWithWhereUniqueWithoutChatInput | ChatMuteUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ChatMuteUpdateManyWithWhereWithoutChatInput | ChatMuteUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ChatMuteScalarWhereInput | ChatMuteScalarWhereInput[]
  }

  export type JoinRequestUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput> | JoinRequestCreateWithoutChatInput[] | JoinRequestUncheckedCreateWithoutChatInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutChatInput | JoinRequestCreateOrConnectWithoutChatInput[]
    upsert?: JoinRequestUpsertWithWhereUniqueWithoutChatInput | JoinRequestUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: JoinRequestCreateManyChatInputEnvelope
    set?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    disconnect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    delete?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    update?: JoinRequestUpdateWithWhereUniqueWithoutChatInput | JoinRequestUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: JoinRequestUpdateManyWithWhereWithoutChatInput | JoinRequestUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
  }

  export type ModerationLogUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput> | ModerationLogCreateWithoutChatInput[] | ModerationLogUncheckedCreateWithoutChatInput[]
    connectOrCreate?: ModerationLogCreateOrConnectWithoutChatInput | ModerationLogCreateOrConnectWithoutChatInput[]
    upsert?: ModerationLogUpsertWithWhereUniqueWithoutChatInput | ModerationLogUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: ModerationLogCreateManyChatInputEnvelope
    set?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    disconnect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    delete?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    connect?: ModerationLogWhereUniqueInput | ModerationLogWhereUniqueInput[]
    update?: ModerationLogUpdateWithWhereUniqueWithoutChatInput | ModerationLogUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: ModerationLogUpdateManyWithWhereWithoutChatInput | ModerationLogUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: ModerationLogScalarWhereInput | ModerationLogScalarWhereInput[]
  }

  export type ChatCreateNestedOneWithoutMembersInput = {
    create?: XOR<ChatCreateWithoutMembersInput, ChatUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatCreateOrConnectWithoutMembersInput
    connect?: ChatWhereUniqueInput
  }

  export type EnumChatMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.ChatMemberRole
  }

  export type EnumChatMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChatMemberStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ChatUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ChatCreateWithoutMembersInput, ChatUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ChatCreateOrConnectWithoutMembersInput
    upsert?: ChatUpsertWithoutMembersInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutMembersInput, ChatUpdateWithoutMembersInput>, ChatUncheckedUpdateWithoutMembersInput>
  }

  export type ChatCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<ChatCreateWithoutPermissionsInput, ChatUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutPermissionsInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<ChatCreateWithoutPermissionsInput, ChatUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutPermissionsInput
    upsert?: ChatUpsertWithoutPermissionsInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutPermissionsInput, ChatUpdateWithoutPermissionsInput>, ChatUncheckedUpdateWithoutPermissionsInput>
  }

  export type ChatCreateNestedOneWithoutInviteLinksInput = {
    create?: XOR<ChatCreateWithoutInviteLinksInput, ChatUncheckedCreateWithoutInviteLinksInput>
    connectOrCreate?: ChatCreateOrConnectWithoutInviteLinksInput
    connect?: ChatWhereUniqueInput
  }

  export type JoinRequestCreateNestedManyWithoutInviteLinkInput = {
    create?: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput> | JoinRequestCreateWithoutInviteLinkInput[] | JoinRequestUncheckedCreateWithoutInviteLinkInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutInviteLinkInput | JoinRequestCreateOrConnectWithoutInviteLinkInput[]
    createMany?: JoinRequestCreateManyInviteLinkInputEnvelope
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
  }

  export type JoinRequestUncheckedCreateNestedManyWithoutInviteLinkInput = {
    create?: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput> | JoinRequestCreateWithoutInviteLinkInput[] | JoinRequestUncheckedCreateWithoutInviteLinkInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutInviteLinkInput | JoinRequestCreateOrConnectWithoutInviteLinkInput[]
    createMany?: JoinRequestCreateManyInviteLinkInputEnvelope
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChatUpdateOneRequiredWithoutInviteLinksNestedInput = {
    create?: XOR<ChatCreateWithoutInviteLinksInput, ChatUncheckedCreateWithoutInviteLinksInput>
    connectOrCreate?: ChatCreateOrConnectWithoutInviteLinksInput
    upsert?: ChatUpsertWithoutInviteLinksInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutInviteLinksInput, ChatUpdateWithoutInviteLinksInput>, ChatUncheckedUpdateWithoutInviteLinksInput>
  }

  export type JoinRequestUpdateManyWithoutInviteLinkNestedInput = {
    create?: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput> | JoinRequestCreateWithoutInviteLinkInput[] | JoinRequestUncheckedCreateWithoutInviteLinkInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutInviteLinkInput | JoinRequestCreateOrConnectWithoutInviteLinkInput[]
    upsert?: JoinRequestUpsertWithWhereUniqueWithoutInviteLinkInput | JoinRequestUpsertWithWhereUniqueWithoutInviteLinkInput[]
    createMany?: JoinRequestCreateManyInviteLinkInputEnvelope
    set?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    disconnect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    delete?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    update?: JoinRequestUpdateWithWhereUniqueWithoutInviteLinkInput | JoinRequestUpdateWithWhereUniqueWithoutInviteLinkInput[]
    updateMany?: JoinRequestUpdateManyWithWhereWithoutInviteLinkInput | JoinRequestUpdateManyWithWhereWithoutInviteLinkInput[]
    deleteMany?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
  }

  export type JoinRequestUncheckedUpdateManyWithoutInviteLinkNestedInput = {
    create?: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput> | JoinRequestCreateWithoutInviteLinkInput[] | JoinRequestUncheckedCreateWithoutInviteLinkInput[]
    connectOrCreate?: JoinRequestCreateOrConnectWithoutInviteLinkInput | JoinRequestCreateOrConnectWithoutInviteLinkInput[]
    upsert?: JoinRequestUpsertWithWhereUniqueWithoutInviteLinkInput | JoinRequestUpsertWithWhereUniqueWithoutInviteLinkInput[]
    createMany?: JoinRequestCreateManyInviteLinkInputEnvelope
    set?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    disconnect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    delete?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    connect?: JoinRequestWhereUniqueInput | JoinRequestWhereUniqueInput[]
    update?: JoinRequestUpdateWithWhereUniqueWithoutInviteLinkInput | JoinRequestUpdateWithWhereUniqueWithoutInviteLinkInput[]
    updateMany?: JoinRequestUpdateManyWithWhereWithoutInviteLinkInput | JoinRequestUpdateManyWithWhereWithoutInviteLinkInput[]
    deleteMany?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
  }

  export type ChatCreateNestedOneWithoutJoinRequestsInput = {
    create?: XOR<ChatCreateWithoutJoinRequestsInput, ChatUncheckedCreateWithoutJoinRequestsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutJoinRequestsInput
    connect?: ChatWhereUniqueInput
  }

  export type InviteLinkCreateNestedOneWithoutJoinRequestsInput = {
    create?: XOR<InviteLinkCreateWithoutJoinRequestsInput, InviteLinkUncheckedCreateWithoutJoinRequestsInput>
    connectOrCreate?: InviteLinkCreateOrConnectWithoutJoinRequestsInput
    connect?: InviteLinkWhereUniqueInput
  }

  export type EnumJoinRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.JoinRequestStatus
  }

  export type ChatUpdateOneRequiredWithoutJoinRequestsNestedInput = {
    create?: XOR<ChatCreateWithoutJoinRequestsInput, ChatUncheckedCreateWithoutJoinRequestsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutJoinRequestsInput
    upsert?: ChatUpsertWithoutJoinRequestsInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutJoinRequestsInput, ChatUpdateWithoutJoinRequestsInput>, ChatUncheckedUpdateWithoutJoinRequestsInput>
  }

  export type InviteLinkUpdateOneWithoutJoinRequestsNestedInput = {
    create?: XOR<InviteLinkCreateWithoutJoinRequestsInput, InviteLinkUncheckedCreateWithoutJoinRequestsInput>
    connectOrCreate?: InviteLinkCreateOrConnectWithoutJoinRequestsInput
    upsert?: InviteLinkUpsertWithoutJoinRequestsInput
    disconnect?: InviteLinkWhereInput | boolean
    delete?: InviteLinkWhereInput | boolean
    connect?: InviteLinkWhereUniqueInput
    update?: XOR<XOR<InviteLinkUpdateToOneWithWhereWithoutJoinRequestsInput, InviteLinkUpdateWithoutJoinRequestsInput>, InviteLinkUncheckedUpdateWithoutJoinRequestsInput>
  }

  export type ChatCreateNestedOneWithoutModerationLogsInput = {
    create?: XOR<ChatCreateWithoutModerationLogsInput, ChatUncheckedCreateWithoutModerationLogsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutModerationLogsInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutModerationLogsNestedInput = {
    create?: XOR<ChatCreateWithoutModerationLogsInput, ChatUncheckedCreateWithoutModerationLogsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutModerationLogsInput
    upsert?: ChatUpsertWithoutModerationLogsInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutModerationLogsInput, ChatUpdateWithoutModerationLogsInput>, ChatUncheckedUpdateWithoutModerationLogsInput>
  }

  export type ChatCreateNestedOneWithoutChatPinsInput = {
    create?: XOR<ChatCreateWithoutChatPinsInput, ChatUncheckedCreateWithoutChatPinsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutChatPinsInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutChatPinsNestedInput = {
    create?: XOR<ChatCreateWithoutChatPinsInput, ChatUncheckedCreateWithoutChatPinsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutChatPinsInput
    upsert?: ChatUpsertWithoutChatPinsInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutChatPinsInput, ChatUpdateWithoutChatPinsInput>, ChatUncheckedUpdateWithoutChatPinsInput>
  }

  export type ChatCreateNestedOneWithoutChatMutesInput = {
    create?: XOR<ChatCreateWithoutChatMutesInput, ChatUncheckedCreateWithoutChatMutesInput>
    connectOrCreate?: ChatCreateOrConnectWithoutChatMutesInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutChatMutesNestedInput = {
    create?: XOR<ChatCreateWithoutChatMutesInput, ChatUncheckedCreateWithoutChatMutesInput>
    connectOrCreate?: ChatCreateOrConnectWithoutChatMutesInput
    upsert?: ChatUpsertWithoutChatMutesInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutChatMutesInput, ChatUpdateWithoutChatMutesInput>, ChatUncheckedUpdateWithoutChatMutesInput>
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

  export type NestedEnumChatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeFilter<$PrismaModel> | $Enums.ChatType
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumJoinModeFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinMode | EnumJoinModeFieldRefInput<$PrismaModel>
    in?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinModeFilter<$PrismaModel> | $Enums.JoinMode
  }

  export type NestedEnumHistoryVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoryVisibility | EnumHistoryVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoryVisibilityFilter<$PrismaModel> | $Enums.HistoryVisibility
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

  export type NestedEnumChatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChatType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatTypeFilter<$PrismaModel>
    _max?: NestedEnumChatTypeFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumJoinModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinMode | EnumJoinModeFieldRefInput<$PrismaModel>
    in?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinMode[] | ListEnumJoinModeFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinModeWithAggregatesFilter<$PrismaModel> | $Enums.JoinMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJoinModeFilter<$PrismaModel>
    _max?: NestedEnumJoinModeFilter<$PrismaModel>
  }

  export type NestedEnumHistoryVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HistoryVisibility | EnumHistoryVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.HistoryVisibility[] | ListEnumHistoryVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumHistoryVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.HistoryVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHistoryVisibilityFilter<$PrismaModel>
    _max?: NestedEnumHistoryVisibilityFilter<$PrismaModel>
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

  export type NestedEnumChatMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberRole | EnumChatMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberRoleFilter<$PrismaModel> | $Enums.ChatMemberRole
  }

  export type NestedEnumChatMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberStatus | EnumChatMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberStatusFilter<$PrismaModel> | $Enums.ChatMemberStatus
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

  export type NestedEnumChatMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberRole | EnumChatMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberRole[] | ListEnumChatMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumChatMemberRoleFilter<$PrismaModel>
  }

  export type NestedEnumChatMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMemberStatus | EnumChatMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMemberStatus[] | ListEnumChatMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChatMemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumChatMemberStatusFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type NestedEnumJoinRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | EnumJoinRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinRequestStatusFilter<$PrismaModel> | $Enums.JoinRequestStatus
  }

  export type NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JoinRequestStatus | EnumJoinRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JoinRequestStatus[] | ListEnumJoinRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJoinRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.JoinRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJoinRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumJoinRequestStatusFilter<$PrismaModel>
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

  export type ChatMemberCreateWithoutChatInput = {
    id: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
  }

  export type ChatMemberUncheckedCreateWithoutChatInput = {
    id: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
  }

  export type ChatMemberCreateOrConnectWithoutChatInput = {
    where: ChatMemberWhereUniqueInput
    create: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput>
  }

  export type ChatMemberCreateManyChatInputEnvelope = {
    data: ChatMemberCreateManyChatInput | ChatMemberCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type ChatPermissionCreateWithoutChatInput = {
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: Date | string
  }

  export type ChatPermissionUncheckedCreateWithoutChatInput = {
    canSendMessages?: boolean
    canAddMembers?: boolean
    canPinMessages?: boolean
    updatedAt?: Date | string
  }

  export type ChatPermissionCreateOrConnectWithoutChatInput = {
    where: ChatPermissionWhereUniqueInput
    create: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
  }

  export type InviteLinkCreateWithoutChatInput = {
    id: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
    joinRequests?: JoinRequestCreateNestedManyWithoutInviteLinkInput
  }

  export type InviteLinkUncheckedCreateWithoutChatInput = {
    id: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutInviteLinkInput
  }

  export type InviteLinkCreateOrConnectWithoutChatInput = {
    where: InviteLinkWhereUniqueInput
    create: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput>
  }

  export type InviteLinkCreateManyChatInputEnvelope = {
    data: InviteLinkCreateManyChatInput | InviteLinkCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type ChatPinCreateWithoutChatInput = {
    id: string
    userId: string
    pinnedAt?: Date | string
  }

  export type ChatPinUncheckedCreateWithoutChatInput = {
    id: string
    userId: string
    pinnedAt?: Date | string
  }

  export type ChatPinCreateOrConnectWithoutChatInput = {
    where: ChatPinWhereUniqueInput
    create: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput>
  }

  export type ChatPinCreateManyChatInputEnvelope = {
    data: ChatPinCreateManyChatInput | ChatPinCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type ChatMuteCreateWithoutChatInput = {
    id: string
    userId: string
    mutedAt?: Date | string
  }

  export type ChatMuteUncheckedCreateWithoutChatInput = {
    id: string
    userId: string
    mutedAt?: Date | string
  }

  export type ChatMuteCreateOrConnectWithoutChatInput = {
    where: ChatMuteWhereUniqueInput
    create: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput>
  }

  export type ChatMuteCreateManyChatInputEnvelope = {
    data: ChatMuteCreateManyChatInput | ChatMuteCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type JoinRequestCreateWithoutChatInput = {
    id: string
    userId: string
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    inviteLink?: InviteLinkCreateNestedOneWithoutJoinRequestsInput
  }

  export type JoinRequestUncheckedCreateWithoutChatInput = {
    id: string
    userId: string
    inviteLinkId?: string | null
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JoinRequestCreateOrConnectWithoutChatInput = {
    where: JoinRequestWhereUniqueInput
    create: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput>
  }

  export type JoinRequestCreateManyChatInputEnvelope = {
    data: JoinRequestCreateManyChatInput | JoinRequestCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type ModerationLogCreateWithoutChatInput = {
    id: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ModerationLogUncheckedCreateWithoutChatInput = {
    id: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ModerationLogCreateOrConnectWithoutChatInput = {
    where: ModerationLogWhereUniqueInput
    create: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput>
  }

  export type ModerationLogCreateManyChatInputEnvelope = {
    data: ModerationLogCreateManyChatInput | ModerationLogCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type ChatMemberUpsertWithWhereUniqueWithoutChatInput = {
    where: ChatMemberWhereUniqueInput
    update: XOR<ChatMemberUpdateWithoutChatInput, ChatMemberUncheckedUpdateWithoutChatInput>
    create: XOR<ChatMemberCreateWithoutChatInput, ChatMemberUncheckedCreateWithoutChatInput>
  }

  export type ChatMemberUpdateWithWhereUniqueWithoutChatInput = {
    where: ChatMemberWhereUniqueInput
    data: XOR<ChatMemberUpdateWithoutChatInput, ChatMemberUncheckedUpdateWithoutChatInput>
  }

  export type ChatMemberUpdateManyWithWhereWithoutChatInput = {
    where: ChatMemberScalarWhereInput
    data: XOR<ChatMemberUpdateManyMutationInput, ChatMemberUncheckedUpdateManyWithoutChatInput>
  }

  export type ChatMemberScalarWhereInput = {
    AND?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
    OR?: ChatMemberScalarWhereInput[]
    NOT?: ChatMemberScalarWhereInput | ChatMemberScalarWhereInput[]
    id?: StringFilter<"ChatMember"> | string
    chatId?: StringFilter<"ChatMember"> | string
    userId?: StringFilter<"ChatMember"> | string
    role?: EnumChatMemberRoleFilter<"ChatMember"> | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFilter<"ChatMember"> | $Enums.ChatMemberStatus
    invitedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    joinedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    leftAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    adminPermissions?: JsonNullableFilter<"ChatMember">
    restriction?: JsonNullableFilter<"ChatMember">
    restrictionUntil?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    restrictedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    restrictedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    bannedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
    bannedReason?: StringNullableFilter<"ChatMember"> | string | null
    promotedByUserId?: StringNullableFilter<"ChatMember"> | string | null
    promotedAt?: DateTimeNullableFilter<"ChatMember"> | Date | string | null
  }

  export type ChatPermissionUpsertWithoutChatInput = {
    update: XOR<ChatPermissionUpdateWithoutChatInput, ChatPermissionUncheckedUpdateWithoutChatInput>
    create: XOR<ChatPermissionCreateWithoutChatInput, ChatPermissionUncheckedCreateWithoutChatInput>
    where?: ChatPermissionWhereInput
  }

  export type ChatPermissionUpdateToOneWithWhereWithoutChatInput = {
    where?: ChatPermissionWhereInput
    data: XOR<ChatPermissionUpdateWithoutChatInput, ChatPermissionUncheckedUpdateWithoutChatInput>
  }

  export type ChatPermissionUpdateWithoutChatInput = {
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPermissionUncheckedUpdateWithoutChatInput = {
    canSendMessages?: BoolFieldUpdateOperationsInput | boolean
    canAddMembers?: BoolFieldUpdateOperationsInput | boolean
    canPinMessages?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InviteLinkUpsertWithWhereUniqueWithoutChatInput = {
    where: InviteLinkWhereUniqueInput
    update: XOR<InviteLinkUpdateWithoutChatInput, InviteLinkUncheckedUpdateWithoutChatInput>
    create: XOR<InviteLinkCreateWithoutChatInput, InviteLinkUncheckedCreateWithoutChatInput>
  }

  export type InviteLinkUpdateWithWhereUniqueWithoutChatInput = {
    where: InviteLinkWhereUniqueInput
    data: XOR<InviteLinkUpdateWithoutChatInput, InviteLinkUncheckedUpdateWithoutChatInput>
  }

  export type InviteLinkUpdateManyWithWhereWithoutChatInput = {
    where: InviteLinkScalarWhereInput
    data: XOR<InviteLinkUpdateManyMutationInput, InviteLinkUncheckedUpdateManyWithoutChatInput>
  }

  export type InviteLinkScalarWhereInput = {
    AND?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
    OR?: InviteLinkScalarWhereInput[]
    NOT?: InviteLinkScalarWhereInput | InviteLinkScalarWhereInput[]
    id?: StringFilter<"InviteLink"> | string
    chatId?: StringFilter<"InviteLink"> | string
    tokenHash?: StringFilter<"InviteLink"> | string
    createdByUserId?: StringFilter<"InviteLink"> | string
    expiresAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    maxUses?: IntNullableFilter<"InviteLink"> | number | null
    usedCount?: IntFilter<"InviteLink"> | number
    revokedAt?: DateTimeNullableFilter<"InviteLink"> | Date | string | null
    requiresApproval?: BoolFilter<"InviteLink"> | boolean
    isPrimary?: BoolFilter<"InviteLink"> | boolean
    createdAt?: DateTimeFilter<"InviteLink"> | Date | string
  }

  export type ChatPinUpsertWithWhereUniqueWithoutChatInput = {
    where: ChatPinWhereUniqueInput
    update: XOR<ChatPinUpdateWithoutChatInput, ChatPinUncheckedUpdateWithoutChatInput>
    create: XOR<ChatPinCreateWithoutChatInput, ChatPinUncheckedCreateWithoutChatInput>
  }

  export type ChatPinUpdateWithWhereUniqueWithoutChatInput = {
    where: ChatPinWhereUniqueInput
    data: XOR<ChatPinUpdateWithoutChatInput, ChatPinUncheckedUpdateWithoutChatInput>
  }

  export type ChatPinUpdateManyWithWhereWithoutChatInput = {
    where: ChatPinScalarWhereInput
    data: XOR<ChatPinUpdateManyMutationInput, ChatPinUncheckedUpdateManyWithoutChatInput>
  }

  export type ChatPinScalarWhereInput = {
    AND?: ChatPinScalarWhereInput | ChatPinScalarWhereInput[]
    OR?: ChatPinScalarWhereInput[]
    NOT?: ChatPinScalarWhereInput | ChatPinScalarWhereInput[]
    id?: StringFilter<"ChatPin"> | string
    chatId?: StringFilter<"ChatPin"> | string
    userId?: StringFilter<"ChatPin"> | string
    pinnedAt?: DateTimeFilter<"ChatPin"> | Date | string
  }

  export type ChatMuteUpsertWithWhereUniqueWithoutChatInput = {
    where: ChatMuteWhereUniqueInput
    update: XOR<ChatMuteUpdateWithoutChatInput, ChatMuteUncheckedUpdateWithoutChatInput>
    create: XOR<ChatMuteCreateWithoutChatInput, ChatMuteUncheckedCreateWithoutChatInput>
  }

  export type ChatMuteUpdateWithWhereUniqueWithoutChatInput = {
    where: ChatMuteWhereUniqueInput
    data: XOR<ChatMuteUpdateWithoutChatInput, ChatMuteUncheckedUpdateWithoutChatInput>
  }

  export type ChatMuteUpdateManyWithWhereWithoutChatInput = {
    where: ChatMuteScalarWhereInput
    data: XOR<ChatMuteUpdateManyMutationInput, ChatMuteUncheckedUpdateManyWithoutChatInput>
  }

  export type ChatMuteScalarWhereInput = {
    AND?: ChatMuteScalarWhereInput | ChatMuteScalarWhereInput[]
    OR?: ChatMuteScalarWhereInput[]
    NOT?: ChatMuteScalarWhereInput | ChatMuteScalarWhereInput[]
    id?: StringFilter<"ChatMute"> | string
    chatId?: StringFilter<"ChatMute"> | string
    userId?: StringFilter<"ChatMute"> | string
    mutedAt?: DateTimeFilter<"ChatMute"> | Date | string
  }

  export type JoinRequestUpsertWithWhereUniqueWithoutChatInput = {
    where: JoinRequestWhereUniqueInput
    update: XOR<JoinRequestUpdateWithoutChatInput, JoinRequestUncheckedUpdateWithoutChatInput>
    create: XOR<JoinRequestCreateWithoutChatInput, JoinRequestUncheckedCreateWithoutChatInput>
  }

  export type JoinRequestUpdateWithWhereUniqueWithoutChatInput = {
    where: JoinRequestWhereUniqueInput
    data: XOR<JoinRequestUpdateWithoutChatInput, JoinRequestUncheckedUpdateWithoutChatInput>
  }

  export type JoinRequestUpdateManyWithWhereWithoutChatInput = {
    where: JoinRequestScalarWhereInput
    data: XOR<JoinRequestUpdateManyMutationInput, JoinRequestUncheckedUpdateManyWithoutChatInput>
  }

  export type JoinRequestScalarWhereInput = {
    AND?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
    OR?: JoinRequestScalarWhereInput[]
    NOT?: JoinRequestScalarWhereInput | JoinRequestScalarWhereInput[]
    id?: StringFilter<"JoinRequest"> | string
    chatId?: StringFilter<"JoinRequest"> | string
    userId?: StringFilter<"JoinRequest"> | string
    inviteLinkId?: StringNullableFilter<"JoinRequest"> | string | null
    status?: EnumJoinRequestStatusFilter<"JoinRequest"> | $Enums.JoinRequestStatus
    reviewedByUserId?: StringNullableFilter<"JoinRequest"> | string | null
    reviewedAt?: DateTimeNullableFilter<"JoinRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"JoinRequest"> | Date | string
  }

  export type ModerationLogUpsertWithWhereUniqueWithoutChatInput = {
    where: ModerationLogWhereUniqueInput
    update: XOR<ModerationLogUpdateWithoutChatInput, ModerationLogUncheckedUpdateWithoutChatInput>
    create: XOR<ModerationLogCreateWithoutChatInput, ModerationLogUncheckedCreateWithoutChatInput>
  }

  export type ModerationLogUpdateWithWhereUniqueWithoutChatInput = {
    where: ModerationLogWhereUniqueInput
    data: XOR<ModerationLogUpdateWithoutChatInput, ModerationLogUncheckedUpdateWithoutChatInput>
  }

  export type ModerationLogUpdateManyWithWhereWithoutChatInput = {
    where: ModerationLogScalarWhereInput
    data: XOR<ModerationLogUpdateManyMutationInput, ModerationLogUncheckedUpdateManyWithoutChatInput>
  }

  export type ModerationLogScalarWhereInput = {
    AND?: ModerationLogScalarWhereInput | ModerationLogScalarWhereInput[]
    OR?: ModerationLogScalarWhereInput[]
    NOT?: ModerationLogScalarWhereInput | ModerationLogScalarWhereInput[]
    id?: StringFilter<"ModerationLog"> | string
    chatId?: StringFilter<"ModerationLog"> | string
    performedByUserId?: StringFilter<"ModerationLog"> | string
    targetUserId?: StringNullableFilter<"ModerationLog"> | string | null
    targetMessageId?: StringNullableFilter<"ModerationLog"> | string | null
    action?: StringFilter<"ModerationLog"> | string
    meta?: JsonNullableFilter<"ModerationLog">
    createdAt?: DateTimeFilter<"ModerationLog"> | Date | string
  }

  export type ChatCreateWithoutMembersInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutMembersInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutMembersInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutMembersInput, ChatUncheckedCreateWithoutMembersInput>
  }

  export type ChatUpsertWithoutMembersInput = {
    update: XOR<ChatUpdateWithoutMembersInput, ChatUncheckedUpdateWithoutMembersInput>
    create: XOR<ChatCreateWithoutMembersInput, ChatUncheckedCreateWithoutMembersInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutMembersInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutMembersInput, ChatUncheckedUpdateWithoutMembersInput>
  }

  export type ChatUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateWithoutPermissionsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutPermissionsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutPermissionsInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutPermissionsInput, ChatUncheckedCreateWithoutPermissionsInput>
  }

  export type ChatUpsertWithoutPermissionsInput = {
    update: XOR<ChatUpdateWithoutPermissionsInput, ChatUncheckedUpdateWithoutPermissionsInput>
    create: XOR<ChatCreateWithoutPermissionsInput, ChatUncheckedCreateWithoutPermissionsInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutPermissionsInput, ChatUncheckedUpdateWithoutPermissionsInput>
  }

  export type ChatUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateWithoutInviteLinksInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutInviteLinksInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutInviteLinksInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutInviteLinksInput, ChatUncheckedCreateWithoutInviteLinksInput>
  }

  export type JoinRequestCreateWithoutInviteLinkInput = {
    id: string
    userId: string
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    chat: ChatCreateNestedOneWithoutJoinRequestsInput
  }

  export type JoinRequestUncheckedCreateWithoutInviteLinkInput = {
    id: string
    chatId: string
    userId: string
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JoinRequestCreateOrConnectWithoutInviteLinkInput = {
    where: JoinRequestWhereUniqueInput
    create: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput>
  }

  export type JoinRequestCreateManyInviteLinkInputEnvelope = {
    data: JoinRequestCreateManyInviteLinkInput | JoinRequestCreateManyInviteLinkInput[]
    skipDuplicates?: boolean
  }

  export type ChatUpsertWithoutInviteLinksInput = {
    update: XOR<ChatUpdateWithoutInviteLinksInput, ChatUncheckedUpdateWithoutInviteLinksInput>
    create: XOR<ChatCreateWithoutInviteLinksInput, ChatUncheckedCreateWithoutInviteLinksInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutInviteLinksInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutInviteLinksInput, ChatUncheckedUpdateWithoutInviteLinksInput>
  }

  export type ChatUpdateWithoutInviteLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutInviteLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type JoinRequestUpsertWithWhereUniqueWithoutInviteLinkInput = {
    where: JoinRequestWhereUniqueInput
    update: XOR<JoinRequestUpdateWithoutInviteLinkInput, JoinRequestUncheckedUpdateWithoutInviteLinkInput>
    create: XOR<JoinRequestCreateWithoutInviteLinkInput, JoinRequestUncheckedCreateWithoutInviteLinkInput>
  }

  export type JoinRequestUpdateWithWhereUniqueWithoutInviteLinkInput = {
    where: JoinRequestWhereUniqueInput
    data: XOR<JoinRequestUpdateWithoutInviteLinkInput, JoinRequestUncheckedUpdateWithoutInviteLinkInput>
  }

  export type JoinRequestUpdateManyWithWhereWithoutInviteLinkInput = {
    where: JoinRequestScalarWhereInput
    data: XOR<JoinRequestUpdateManyMutationInput, JoinRequestUncheckedUpdateManyWithoutInviteLinkInput>
  }

  export type ChatCreateWithoutJoinRequestsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutJoinRequestsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutJoinRequestsInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutJoinRequestsInput, ChatUncheckedCreateWithoutJoinRequestsInput>
  }

  export type InviteLinkCreateWithoutJoinRequestsInput = {
    id: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
    chat: ChatCreateNestedOneWithoutInviteLinksInput
  }

  export type InviteLinkUncheckedCreateWithoutJoinRequestsInput = {
    id: string
    chatId: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type InviteLinkCreateOrConnectWithoutJoinRequestsInput = {
    where: InviteLinkWhereUniqueInput
    create: XOR<InviteLinkCreateWithoutJoinRequestsInput, InviteLinkUncheckedCreateWithoutJoinRequestsInput>
  }

  export type ChatUpsertWithoutJoinRequestsInput = {
    update: XOR<ChatUpdateWithoutJoinRequestsInput, ChatUncheckedUpdateWithoutJoinRequestsInput>
    create: XOR<ChatCreateWithoutJoinRequestsInput, ChatUncheckedCreateWithoutJoinRequestsInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutJoinRequestsInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutJoinRequestsInput, ChatUncheckedUpdateWithoutJoinRequestsInput>
  }

  export type ChatUpdateWithoutJoinRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutJoinRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type InviteLinkUpsertWithoutJoinRequestsInput = {
    update: XOR<InviteLinkUpdateWithoutJoinRequestsInput, InviteLinkUncheckedUpdateWithoutJoinRequestsInput>
    create: XOR<InviteLinkCreateWithoutJoinRequestsInput, InviteLinkUncheckedCreateWithoutJoinRequestsInput>
    where?: InviteLinkWhereInput
  }

  export type InviteLinkUpdateToOneWithWhereWithoutJoinRequestsInput = {
    where?: InviteLinkWhereInput
    data: XOR<InviteLinkUpdateWithoutJoinRequestsInput, InviteLinkUncheckedUpdateWithoutJoinRequestsInput>
  }

  export type InviteLinkUpdateWithoutJoinRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutInviteLinksNestedInput
  }

  export type InviteLinkUncheckedUpdateWithoutJoinRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatCreateWithoutModerationLogsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutModerationLogsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutModerationLogsInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutModerationLogsInput, ChatUncheckedCreateWithoutModerationLogsInput>
  }

  export type ChatUpsertWithoutModerationLogsInput = {
    update: XOR<ChatUpdateWithoutModerationLogsInput, ChatUncheckedUpdateWithoutModerationLogsInput>
    create: XOR<ChatCreateWithoutModerationLogsInput, ChatUncheckedCreateWithoutModerationLogsInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutModerationLogsInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutModerationLogsInput, ChatUncheckedUpdateWithoutModerationLogsInput>
  }

  export type ChatUpdateWithoutModerationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutModerationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateWithoutChatPinsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutChatPinsInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatMutes?: ChatMuteUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutChatPinsInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutChatPinsInput, ChatUncheckedCreateWithoutChatPinsInput>
  }

  export type ChatUpsertWithoutChatPinsInput = {
    update: XOR<ChatUpdateWithoutChatPinsInput, ChatUncheckedUpdateWithoutChatPinsInput>
    create: XOR<ChatCreateWithoutChatPinsInput, ChatUncheckedCreateWithoutChatPinsInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutChatPinsInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutChatPinsInput, ChatUncheckedUpdateWithoutChatPinsInput>
  }

  export type ChatUpdateWithoutChatPinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutChatPinsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatMutes?: ChatMuteUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateWithoutChatMutesInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkCreateNestedManyWithoutChatInput
    chatPins?: ChatPinCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutChatMutesInput = {
    id: string
    type: $Enums.ChatType
    title?: string | null
    description?: string | null
    photoMediaId?: string | null
    createdByUserId: string
    isArchived?: boolean
    joinMode?: $Enums.JoinMode
    isPublic?: boolean
    historyVisibility?: $Enums.HistoryVisibility
    allowMemberInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput
    permissions?: ChatPermissionUncheckedCreateNestedOneWithoutChatInput
    inviteLinks?: InviteLinkUncheckedCreateNestedManyWithoutChatInput
    chatPins?: ChatPinUncheckedCreateNestedManyWithoutChatInput
    joinRequests?: JoinRequestUncheckedCreateNestedManyWithoutChatInput
    moderationLogs?: ModerationLogUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutChatMutesInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutChatMutesInput, ChatUncheckedCreateWithoutChatMutesInput>
  }

  export type ChatUpsertWithoutChatMutesInput = {
    update: XOR<ChatUpdateWithoutChatMutesInput, ChatUncheckedUpdateWithoutChatMutesInput>
    create: XOR<ChatCreateWithoutChatMutesInput, ChatUncheckedCreateWithoutChatMutesInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutChatMutesInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutChatMutesInput, ChatUncheckedUpdateWithoutChatMutesInput>
  }

  export type ChatUpdateWithoutChatMutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutChatMutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoMediaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    joinMode?: EnumJoinModeFieldUpdateOperationsInput | $Enums.JoinMode
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    historyVisibility?: EnumHistoryVisibilityFieldUpdateOperationsInput | $Enums.HistoryVisibility
    allowMemberInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput
    permissions?: ChatPermissionUncheckedUpdateOneWithoutChatNestedInput
    inviteLinks?: InviteLinkUncheckedUpdateManyWithoutChatNestedInput
    chatPins?: ChatPinUncheckedUpdateManyWithoutChatNestedInput
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutChatNestedInput
    moderationLogs?: ModerationLogUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatMemberCreateManyChatInput = {
    id: string
    userId: string
    role: $Enums.ChatMemberRole
    status: $Enums.ChatMemberStatus
    invitedByUserId?: string | null
    joinedAt?: Date | string | null
    leftAt?: Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: Date | string | null
    restrictedByUserId?: string | null
    restrictedAt?: Date | string | null
    bannedByUserId?: string | null
    bannedAt?: Date | string | null
    bannedReason?: string | null
    promotedByUserId?: string | null
    promotedAt?: Date | string | null
  }

  export type InviteLinkCreateManyChatInput = {
    id: string
    tokenHash: string
    createdByUserId: string
    expiresAt?: Date | string | null
    maxUses?: number | null
    usedCount?: number
    revokedAt?: Date | string | null
    requiresApproval?: boolean
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type ChatPinCreateManyChatInput = {
    id: string
    userId: string
    pinnedAt?: Date | string
  }

  export type ChatMuteCreateManyChatInput = {
    id: string
    userId: string
    mutedAt?: Date | string
  }

  export type JoinRequestCreateManyChatInput = {
    id: string
    userId: string
    inviteLinkId?: string | null
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ModerationLogCreateManyChatInput = {
    id: string
    performedByUserId: string
    targetUserId?: string | null
    targetMessageId?: string | null
    action: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ChatMemberUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMemberUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMemberUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMemberRoleFieldUpdateOperationsInput | $Enums.ChatMemberRole
    status?: EnumChatMemberStatusFieldUpdateOperationsInput | $Enums.ChatMemberStatus
    invitedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leftAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    adminPermissions?: NullableJsonNullValueInput | InputJsonValue
    restriction?: NullableJsonNullValueInput | InputJsonValue
    restrictionUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    restrictedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    restrictedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedReason?: NullableStringFieldUpdateOperationsInput | string | null
    promotedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    promotedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InviteLinkUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    joinRequests?: JoinRequestUpdateManyWithoutInviteLinkNestedInput
  }

  export type InviteLinkUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    joinRequests?: JoinRequestUncheckedUpdateManyWithoutInviteLinkNestedInput
  }

  export type InviteLinkUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    usedCount?: IntFieldUpdateOperationsInput | number
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatPinUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMuteUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mutedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviteLink?: InviteLinkUpdateOneWithoutJoinRequestsNestedInput
  }

  export type JoinRequestUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inviteLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inviteLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationLogUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    performedByUserId?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    targetMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestCreateManyInviteLinkInput = {
    id: string
    chatId: string
    userId: string
    status?: $Enums.JoinRequestStatus
    reviewedByUserId?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type JoinRequestUpdateWithoutInviteLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutJoinRequestsNestedInput
  }

  export type JoinRequestUncheckedUpdateWithoutInviteLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoinRequestUncheckedUpdateManyWithoutInviteLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumJoinRequestStatusFieldUpdateOperationsInput | $Enums.JoinRequestStatus
    reviewedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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