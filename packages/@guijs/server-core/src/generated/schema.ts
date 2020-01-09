import { GraphQLResolveInfo } from 'graphql';
import { Context } from '@context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ChangeTerminalTitleInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
};

export type CreateTerminalInput = {
  name: Scalars['String'],
  title: Scalars['String'],
  cwd?: Maybe<Scalars['String']>,
  hidden: Scalars['Boolean'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createTerminal?: Maybe<Terminal>,
  changeTerminalTitle?: Maybe<Terminal>,
  removeTerminal?: Maybe<Terminal>,
};


export type MutationCreateTerminalArgs = {
  input: CreateTerminalInput
};


export type MutationChangeTerminalTitleArgs = {
  input: ChangeTerminalTitleInput
};


export type MutationRemoveTerminalArgs = {
  id: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  terminal?: Maybe<Terminal>,
  terminals: Array<Terminal>,
};


export type QueryTerminalArgs = {
  id: Scalars['ID']
};

export type Terminal = {
   __typename?: 'Terminal',
  id: Scalars['ID'],
  name: Scalars['String'],
  title: Scalars['String'],
  cwd: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Terminal: ResolverTypeWrapper<Terminal>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateTerminalInput: CreateTerminalInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ChangeTerminalTitleInput: ChangeTerminalTitleInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Terminal: Terminal,
  String: Scalars['String'],
  Mutation: {},
  CreateTerminalInput: CreateTerminalInput,
  Boolean: Scalars['Boolean'],
  ChangeTerminalTitleInput: ChangeTerminalTitleInput,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTerminal?: Resolver<Maybe<ResolversTypes['Terminal']>, ParentType, ContextType, RequireFields<MutationCreateTerminalArgs, 'input'>>,
  changeTerminalTitle?: Resolver<Maybe<ResolversTypes['Terminal']>, ParentType, ContextType, RequireFields<MutationChangeTerminalTitleArgs, 'input'>>,
  removeTerminal?: Resolver<Maybe<ResolversTypes['Terminal']>, ParentType, ContextType, RequireFields<MutationRemoveTerminalArgs, 'id'>>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  terminal?: Resolver<Maybe<ResolversTypes['Terminal']>, ParentType, ContextType, RequireFields<QueryTerminalArgs, 'id'>>,
  terminals?: Resolver<Array<ResolversTypes['Terminal']>, ParentType, ContextType>,
};

export type TerminalResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Terminal'] = ResolversParentTypes['Terminal']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  cwd?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Terminal?: TerminalResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
