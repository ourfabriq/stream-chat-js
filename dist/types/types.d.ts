import { AxiosRequestConfig } from 'axios';
import { Role } from './permissions';
/**
 * Utility Types
 */
export declare type ArrayOneOrMore<T> = {
    0: T;
} & Array<T>;
export declare type ArrayTwoOrMore<T> = {
    0: T;
    1: T;
} & Array<T>;
export declare type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends {
    [_ in keyof T]: infer U;
} ? U : never;
export declare type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
export declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
export declare type UnknownType = Record<string, unknown>;
export declare type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;
/**
 * Response Types
 */
export declare type APIResponse = {
    duration: string;
};
export declare type AppSettingsAPIResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    app?: {
        channel_configs: Record<string, {
            automod?: ChannelConfigAutomod;
            automod_behavior?: ChannelConfigAutomodBehavior;
            blocklist_behavior?: ChannelConfigAutomodBehavior;
            commands?: CommandVariants<CommandType>[];
            connect_events?: boolean;
            created_at?: string;
            custom_events?: boolean;
            max_message_length?: number;
            message_retention?: string;
            mutes?: boolean;
            name?: string;
            push_notifications?: boolean;
            reactions?: boolean;
            read_events?: boolean;
            replies?: boolean;
            search?: boolean;
            typing_events?: boolean;
            updated_at?: string;
            uploads?: boolean;
            url_enrichment?: boolean;
        }>;
        auto_translation_enabled?: boolean;
        before_message_send_hook_url?: string;
        custom_action_handler_url?: string;
        disable_auth_checks?: boolean;
        disable_permissions_checks?: boolean;
        enforce_unique_usernames?: 'no' | 'app' | 'team';
        file_upload_config?: FileUploadConfig;
        grants?: Record<string, string[]>;
        image_moderation_enabled?: boolean;
        image_upload_config?: FileUploadConfig;
        multi_tenant_enabled?: boolean;
        name?: string;
        organization?: string;
        permission_version?: string;
        policies?: Record<string, Policy[]>;
        push_notifications?: {
            version: string;
            apn?: APNConfig;
            firebase?: FirebaseConfig;
        };
        revoke_tokens_issued_before?: string | null;
        sqs_key?: string;
        sqs_secret?: string;
        sqs_url?: string;
        suspended?: boolean;
        suspended_explanation?: string;
        user_search_disallowed_roles?: string[];
        webhook_url?: string;
    };
};
export declare type ModerationResult = {
    action: string;
    created_at: string;
    message_id: string;
    updated_at: string;
    user_bad_karma: boolean;
    user_karma: number;
    blocked_word?: string;
    blocklist_name?: string;
    moderated_by?: string;
};
export declare type MessageFlagsResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType, AttachmentType = UnknownType, MessageType = UnknownType, ReactionType = UnknownType> = APIResponse & {
    flags?: Array<{
        message: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
        user: UserResponse<UserType>;
        approved_at?: string;
        created_at?: string;
        created_by_automod?: boolean;
        moderation_result?: ModerationResult;
        rejected_at?: string;
        reviewed_at?: string;
        reviewed_by?: UserResponse<UserType>;
        updated_at?: string;
    }>;
};
export declare type BannedUsersResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = APIResponse & {
    bans?: Array<{
        user: UserResponse<UserType>;
        banned_by?: UserResponse<UserType>;
        channel?: ChannelResponse<ChannelType, CommandType, UserType>;
        expires?: string;
        ip_ban?: boolean;
        reason?: string;
        timeout?: number;
    }>;
};
export declare type BlockListResponse = BlockList & {
    created_at?: string;
    updated_at?: string;
};
export declare type ChannelResponse<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = ChannelType & {
    cid: string;
    disabled: boolean;
    frozen: boolean;
    id: string;
    type: string;
    auto_translation_enabled?: boolean;
    auto_translation_language?: TranslationLanguages | '';
    config?: ChannelConfigWithInfo<CommandType>;
    cooldown?: number;
    created_at?: string;
    created_by?: UserResponse<UserType> | null;
    created_by_id?: string;
    deleted_at?: string;
    invites?: string[];
    last_message_at?: string;
    member_count?: number;
    members?: ChannelMemberResponse<UserType>[];
    muted?: boolean;
    name?: string;
    team?: string;
    updated_at?: string;
};
export declare type ChannelAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    channel: ChannelResponse<ChannelType, CommandType, UserType>;
    members: ChannelMemberResponse<UserType>[];
    messages: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>[];
    pinned_messages: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>[];
    hidden?: boolean;
    membership?: ChannelMembership<UserType> | null;
    read?: ReadResponse<UserType>[];
    watcher_count?: number;
    watchers?: UserResponse<UserType>[];
};
export declare type ChannelMemberAPIResponse<UserType = UnknownType> = APIResponse & {
    members: ChannelMemberResponse<UserType>[];
};
export declare type ChannelMemberResponse<UserType = UnknownType> = {
    banned?: boolean;
    channel_role?: Role;
    created_at?: string;
    invite_accepted_at?: string;
    invite_rejected_at?: string;
    invited?: boolean;
    is_moderator?: boolean;
    role?: string;
    shadow_banned?: boolean;
    updated_at?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type CheckPushResponse = APIResponse & {
    device_errors?: {
        error_message?: string;
        provider?: string;
    };
    general_errors?: string[];
    rendered_apn_template?: string;
    rendered_firebase_template?: string;
};
export declare type CheckSQSResponse = APIResponse & {
    status: string;
    data?: {};
    error?: string;
};
export declare type CommandResponse<CommandType extends string = LiteralStringForUnion> = Partial<CreatedAtUpdatedAt> & {
    args?: string;
    description?: string;
    name?: CommandVariants<CommandType>;
    set?: CommandVariants<CommandType>;
};
export declare type ConnectAPIResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = Promise<void | ConnectionOpen<ChannelType, CommandType, UserType>>;
export declare type CreateChannelResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id'> & {
    created_at: string;
    updated_at: string;
    grants?: Record<string, string[]>;
};
export declare type CreateCommandResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    command: CreateCommandOptions<CommandType> & CreatedAtUpdatedAt;
};
export declare type DeleteChannelAPIResponse<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = APIResponse & {
    channel: ChannelResponse<ChannelType, CommandType, UserType>;
};
export declare type DeleteCommandResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    name?: CommandVariants<CommandType>;
};
export declare type EventAPIResponse<AttachmentType extends UnknownType = UnknownType, ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, EventType extends UnknownType = UnknownType, MessageType extends UnknownType = UnknownType, ReactionType extends UnknownType = UnknownType, UserType extends UnknownType = UnknownType> = APIResponse & {
    event: Event<AttachmentType, ChannelType, CommandType, EventType, MessageType, ReactionType, UserType>;
};
export declare type ExportChannelResponse = {
    task_id: string;
};
export declare type ExportChannelStatusResponse = {
    created_at?: string;
    error?: {};
    result?: {};
    updated_at?: string;
};
export declare type FlagMessageResponse<UserType = UnknownType> = APIResponse & {
    flag: {
        created_at: string;
        created_by_automod: boolean;
        target_message_id: string;
        updated_at: string;
        user: UserResponse<UserType>;
        approved_at?: string;
        rejected_at?: string;
        reviewed_at?: string;
        reviewed_by?: string;
    };
};
export declare type FlagUserResponse<UserType = UnknownType> = APIResponse & {
    flag: {
        created_at: string;
        created_by_automod: boolean;
        target_user: UserResponse<UserType>;
        updated_at: string;
        user: UserResponse<UserType>;
        approved_at?: string;
        rejected_at?: string;
        reviewed_at?: string;
        reviewed_by?: string;
    };
};
export declare type FormatMessageResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = Omit<MessageResponse<AttachmentType, ChannelType, CommandType, {}, ReactionType, UserType>, 'created_at' | 'pinned_at' | 'updated_at' | 'status'> & MessageType & {
    created_at: Date;
    pinned_at: Date | null;
    status: string;
    updated_at: Date;
};
export declare type GetChannelTypeResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id' | 'commands'> & {
    created_at: string;
    updated_at: string;
    commands?: CommandResponse<CommandType>[];
    grants?: Record<string, string[]>;
};
export declare type GetCommandResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & CreateCommandOptions<CommandType> & CreatedAtUpdatedAt;
export declare type GetMultipleMessagesAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    messages: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>[];
};
export declare type GetRateLimitsResponse = APIResponse & {
    android?: RateLimitsMap;
    ios?: RateLimitsMap;
    server_side?: RateLimitsMap;
    web?: RateLimitsMap;
};
export declare type GetReactionsAPIResponse<ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    reactions: ReactionResponse<ReactionType, UserType>[];
};
export declare type GetRepliesAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    messages: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>[];
};
export declare type ListChannelResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    channel_types: Record<string, Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id' | 'commands'> & {
        commands: CommandResponse<CommandType>[];
        created_at: string;
        updated_at: string;
        grants?: Record<string, string[]>;
    }>;
};
export declare type ListChannelTypesAPIResponse<CommandType extends string = LiteralStringForUnion> = ListChannelResponse<CommandType>;
export declare type ListCommandsResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    commands: Array<CreateCommandOptions<CommandType> & CreatedAtUpdatedAt>;
};
export declare type MuteChannelAPIResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = APIResponse & {
    channel_mute: ChannelMute<ChannelType, CommandType, UserType>;
    own_user: OwnUserResponse<ChannelType, CommandType, UserType>;
    channel_mutes?: ChannelMute<ChannelType, CommandType, UserType>[];
    mute?: MuteResponse<UserType>;
};
export declare type MessageResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = MessageResponseBase<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType> & {
    quoted_message?: MessageResponseBase<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
};
export declare type MessageResponseBase<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = MessageBase<AttachmentType, MessageType, UserType> & {
    args?: string;
    channel?: ChannelResponse<ChannelType, CommandType, UserType>;
    cid?: string;
    command?: string;
    command_info?: {
        name?: string;
    };
    created_at?: string;
    deleted_at?: string;
    i18n?: RequireAtLeastOne<Record<`${TranslationLanguages}_text`, string>> & {
        language: TranslationLanguages;
    };
    latest_reactions?: ReactionResponse<ReactionType, UserType>[];
    mentioned_users?: UserResponse<UserType>[];
    own_reactions?: ReactionResponse<ReactionType, UserType>[] | null;
    pin_expires?: string | null;
    pinned_at?: string | null;
    pinned_by?: UserResponse<UserType> | null;
    reaction_counts?: {
        [key: string]: number;
    } | null;
    reaction_scores?: {
        [key: string]: number;
    } | null;
    reply_count?: number;
    shadowed?: boolean;
    silent?: boolean;
    status?: string;
    thread_participants?: UserResponse<UserType>[];
    type?: MessageLabel;
    updated_at?: string;
};
export declare type MuteResponse<UserType = UnknownType> = {
    user: UserResponse<UserType>;
    created_at?: string;
    expires?: string;
    target?: UserResponse<UserType>;
    updated_at?: string;
};
export declare type MuteUserResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = APIResponse & {
    mute?: MuteResponse<UserType>;
    mutes?: Array<Mute<UserType>>;
    own_user?: OwnUserResponse<ChannelType, CommandType, UserType>;
};
export declare type OwnUserBase<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = {
    channel_mutes: ChannelMute<ChannelType, CommandType, UserType>[];
    devices: Device<UserType>[];
    mutes: Mute<UserType>[];
    total_unread_count: number;
    unread_channels: number;
    unread_count: number;
    invisible?: boolean;
    roles?: string[];
};
export declare type OwnUserResponse<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = UserResponse<UserType> & OwnUserBase<ChannelType, CommandType, UserType>;
export declare type PartialUpdateChannelAPIResponse<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = APIResponse & {
    channel: ChannelResponse<ChannelType, CommandType, UserType>;
    members: ChannelMemberResponse<UserType>[];
};
export declare type PermissionAPIResponse = APIResponse & {
    permission?: PermissionAPIObject;
};
export declare type PermissionsAPIResponse = APIResponse & {
    permissions?: PermissionAPIObject[];
};
export declare type ReactionAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    message: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
    reaction: ReactionResponse<ReactionType, UserType>;
};
export declare type ReactionResponse<ReactionType = UnknownType, UserType = UnknownType> = Reaction<ReactionType, UserType> & {
    created_at: string;
    updated_at: string;
};
export declare type ReadResponse<UserType = UnknownType> = {
    last_read: string;
    user: UserResponse<UserType>;
    unread_messages?: number;
};
export declare type SearchAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    results: {
        message: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
    }[];
    next?: string;
    previous?: string;
    results_warning?: SearchWarning | null;
};
export declare type SearchWarning = {
    channel_search_cids: string[];
    channel_search_count: number;
    warning_code: number;
    warning_description: string;
};
export declare type SendFileAPIResponse = APIResponse & {
    file: string;
};
export declare type SendMessageAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    message: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
};
export declare type TruncateChannelAPIResponse<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = APIResponse & {
    channel: ChannelResponse<ChannelType, CommandType, UserType>;
};
export declare type UpdateChannelAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    channel: ChannelResponse<ChannelType, CommandType, UserType>;
    members: ChannelMemberResponse<UserType>[];
    message?: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
};
export declare type UpdateChannelResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id'> & {
    created_at: string;
    updated_at: string;
};
export declare type UpdateCommandResponse<CommandType extends string = LiteralStringForUnion> = APIResponse & {
    command: UpdateCommandOptions<CommandType> & CreatedAtUpdatedAt & {
        name: CommandVariants<CommandType>;
    };
};
export declare type UpdateMessageAPIResponse<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = APIResponse & {
    message: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
};
export declare type UsersAPIResponse<UserType = UnknownType> = APIResponse & {
    users: Array<UserResponse<UserType>>;
};
export declare type UpdateUsersAPIResponse<UserType = UnknownType> = APIResponse & {
    users: {
        [key: string]: UserResponse<UserType>;
    };
};
export declare type UserResponse<UserType = UnknownType> = User<UserType> & {
    banned?: boolean;
    created_at?: string;
    deactivated_at?: string;
    deleted_at?: string;
    language?: TranslationLanguages | '';
    last_active?: string;
    online?: boolean;
    revoke_tokens_issued_before?: string;
    shadow_banned?: boolean;
    updated_at?: string;
};
/**
 * Option Types
 */
export declare type MessageFlagsPaginationOptions = {
    limit?: number;
    offset?: number;
};
export declare type BannedUsersPaginationOptions = Omit<PaginationOptions, 'id_gt' | 'id_gte' | 'id_lt' | 'id_lte'>;
export declare type BanUserOptions<UserType = UnknownType> = UnBanUserOptions & {
    banned_by?: UserResponse<UserType>;
    banned_by_id?: string;
    ip_ban?: boolean;
    reason?: string;
    timeout?: number;
    /**
     * @deprecated please use banned_by
     */
    user?: UserResponse<UserType>;
    /**
     * @deprecated please use banned_by_id
     */
    user_id?: string;
};
export declare type ChannelOptions = {
    last_message_ids?: {
        [key: string]: string;
    };
    limit?: number;
    message_limit?: number;
    offset?: number;
    presence?: boolean;
    recovery?: boolean;
    state?: boolean;
    watch?: boolean;
};
export declare type ChannelQueryOptions<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = {
    client_id?: string;
    connection_id?: string;
    data?: ChannelResponse<ChannelType, CommandType, UserType>;
    members?: PaginationOptions;
    messages?: PaginationOptions;
    presence?: boolean;
    state?: boolean;
    watch?: boolean;
    watchers?: PaginationOptions;
};
export declare type CreateChannelOptions<CommandType extends string = LiteralStringForUnion> = {
    automod?: ChannelConfigAutomod;
    automod_behavior?: ChannelConfigAutomodBehavior;
    automod_thresholds?: ChannelConfigAutomodThresholds;
    blocklist?: string;
    blocklist_behavior?: ChannelConfigAutomodBehavior;
    client_id?: string;
    commands?: CommandVariants<CommandType>[];
    connect_events?: boolean;
    connection_id?: string;
    custom_events?: boolean;
    grants?: Record<string, string[]>;
    max_message_length?: number;
    message_retention?: string;
    mutes?: boolean;
    name?: string;
    permissions?: PermissionObject[];
    push_notifications?: boolean;
    reactions?: boolean;
    read_events?: boolean;
    replies?: boolean;
    search?: boolean;
    typing_events?: boolean;
    uploads?: boolean;
    url_enrichment?: boolean;
};
export declare type CreateCommandOptions<CommandType extends string = LiteralStringForUnion> = {
    description: string;
    name: CommandVariants<CommandType>;
    args?: string;
    set?: CommandVariants<CommandType>;
};
export declare type CustomPermissionOptions = {
    action: string;
    id: string;
    name: string;
    condition?: string;
    description?: string;
    owner?: boolean;
    same_team?: boolean;
};
export declare type InviteOptions<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = {
    accept_invite?: boolean;
    add_members?: string[];
    add_moderators?: string[];
    client_id?: string;
    connection_id?: string;
    data?: Omit<ChannelResponse<ChannelType, CommandType, UserType>, 'id' | 'cid'>;
    demote_moderators?: string[];
    invites?: string[];
    message?: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
    reject_invite?: boolean;
    remove_members?: string[];
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type MarkAllReadOptions<UserType = UnknownType> = {
    client_id?: string;
    connection_id?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type MarkReadOptions<UserType = UnknownType> = {
    client_id?: string;
    connection_id?: string;
    message_id?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type MuteUserOptions<UserType = UnknownType> = {
    client_id?: string;
    connection_id?: string;
    id?: string;
    reason?: string;
    target_user_id?: string;
    timeout?: number;
    type?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type PaginationOptions = {
    created_at_after?: string | Date;
    created_at_after_or_equal?: string | Date;
    created_at_before?: string | Date;
    created_at_before_or_equal?: string | Date;
    id_gt?: string;
    id_gte?: string;
    id_lt?: string;
    id_lte?: string;
    limit?: number;
    offset?: number;
};
export declare type QueryMembersOptions = {
    limit?: number;
    offset?: number;
    user_id_gt?: string;
    user_id_gte?: string;
    user_id_lt?: string;
    user_id_lte?: string;
};
export declare type SearchOptions<MessageType = UnknownType> = {
    limit?: number;
    next?: string;
    offset?: number;
    sort?: SearchMessageSort<MessageType>;
};
export declare type StreamChatOptions = AxiosRequestConfig & {
    /**
     * Used to disable warnings that are triggered by using connectUser or connectAnonymousUser server-side.
     */
    allowServerSideConnect?: boolean;
    /**
     * Base url to use for API
     * such as https://chat-proxy-dublin.stream-io-api.com
     */
    baseURL?: string;
    browser?: boolean;
    logger?: Logger;
    /**
     * When network is recovered, we re-query the active channels on client. But in single query, you can recover
     * only 30 channels. So its not guaranteed that all the channels in activeChannels object have updated state.
     * Thus in UI sdks, state recovery is managed by components themselves, they don't rely on js client for this.
     *
     * `recoverStateOnReconnect` parameter can be used in such cases, to disable state recovery within js client.
     * When false, user/consumer of this client will need to make sure all the channels present on UI by
     * manually calling queryChannels endpoint.
     */
    recoverStateOnReconnect?: boolean;
    warmUp?: boolean;
};
export declare type UnBanUserOptions = {
    client_id?: string;
    connection_id?: string;
    id?: string;
    shadow?: boolean;
    target_user_id?: string;
    type?: string;
};
export declare type UpdateChannelOptions<CommandType extends string = LiteralStringForUnion> = Omit<CreateChannelOptions<CommandType>, 'name'> & {
    created_at?: string;
    updated_at?: string;
};
export declare type UpdateCommandOptions<CommandType extends string = LiteralStringForUnion> = {
    description: string;
    args?: string;
    set?: CommandVariants<CommandType>;
};
export declare type UserOptions = {
    limit?: number;
    offset?: number;
    presence?: boolean;
};
/**
 * Event Types
 */
export declare type ConnectionChangeEvent = {
    type: EventTypes;
    online?: boolean;
};
export declare type Event<AttachmentType extends UnknownType = UnknownType, ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, EventType extends UnknownType = UnknownType, MessageType extends UnknownType = UnknownType, ReactionType extends UnknownType = UnknownType, UserType extends UnknownType = UnknownType> = EventType & {
    type: EventTypes;
    channel?: ChannelResponse<ChannelType, CommandType, UserType>;
    channel_id?: string;
    channel_type?: string;
    cid?: string;
    clear_history?: boolean;
    connection_id?: string;
    created_at?: string;
    hard_delete?: boolean;
    mark_messages_deleted?: boolean;
    me?: OwnUserResponse<ChannelType, CommandType, UserType>;
    member?: ChannelMemberResponse<UserType>;
    message?: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
    online?: boolean;
    parent_id?: string;
    reaction?: ReactionResponse<ReactionType, UserType>;
    received_at?: string | Date;
    team?: string;
    total_unread_count?: number;
    unread_channels?: number;
    unread_count?: number;
    user?: UserResponse<UserType>;
    user_id?: string;
    watcher_count?: number;
};
export declare type UserCustomEvent<EventType extends UnknownType = UnknownType> = EventType & {
    type: string;
};
export declare type EventHandler<AttachmentType extends UnknownType = UnknownType, ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, EventType extends UnknownType = UnknownType, MessageType extends UnknownType = UnknownType, ReactionType extends UnknownType = UnknownType, UserType extends UnknownType = UnknownType> = (event: Event<AttachmentType, ChannelType, CommandType, EventType, MessageType, ReactionType, UserType>) => void;
export declare type EventTypes = 'all' | 'channel.created' | 'channel.deleted' | 'channel.hidden' | 'channel.muted' | 'channel.truncated' | 'channel.unmuted' | 'channel.updated' | 'channel.visible' | 'connection.changed' | 'connection.recovered' | 'health.check' | 'member.added' | 'member.removed' | 'member.updated' | 'message.deleted' | 'message.new' | 'message.read' | 'message.updated' | 'notification.added_to_channel' | 'notification.channel_deleted' | 'notification.channel_mutes_updated' | 'notification.channel_truncated' | 'notification.invite_accepted' | 'notification.invite_rejected' | 'notification.invited' | 'notification.mark_read' | 'notification.message_new' | 'notification.mutes_updated' | 'notification.removed_from_channel' | 'reaction.deleted' | 'reaction.new' | 'reaction.updated' | 'typing.start' | 'typing.stop' | 'user.banned' | 'user.deleted' | 'user.presence.changed' | 'user.unbanned' | 'user.updated' | 'user.watching.start' | 'user.watching.stop';
/**
 * Filter Types
 */
export declare type AscDesc = 1 | -1;
export declare type MessageFlagsFiltersOptions = {
    channel_cid?: string;
    is_reviewed?: boolean;
    user_id?: string;
};
export declare type MessageFlagsFilters = QueryFilters<{
    channel_cid?: RequireOnlyOne<Pick<QueryFilter<MessageFlagsFiltersOptions['channel_cid']>, '$eq' | '$in'>> | PrimitiveFilter<MessageFlagsFiltersOptions['channel_cid']>;
} & {
    user_id?: RequireOnlyOne<Pick<QueryFilter<MessageFlagsFiltersOptions['user_id']>, '$eq' | '$in'>> | PrimitiveFilter<MessageFlagsFiltersOptions['user_id']>;
} & {
    [Key in keyof Omit<MessageFlagsFiltersOptions, 'channel_cid' | 'user_id' | 'is_reviewed'>]: RequireOnlyOne<QueryFilter<MessageFlagsFiltersOptions[Key]>> | PrimitiveFilter<MessageFlagsFiltersOptions[Key]>;
}>;
export declare type BannedUsersFilterOptions = {
    banned_by_id?: string;
    channel_cid?: string;
    created_at?: string;
    reason?: string;
    user_id?: string;
};
export declare type BannedUsersFilters = QueryFilters<{
    channel_cid?: RequireOnlyOne<Pick<QueryFilter<BannedUsersFilterOptions['channel_cid']>, '$eq' | '$in'>> | PrimitiveFilter<BannedUsersFilterOptions['channel_cid']>;
} & {
    reason?: RequireOnlyOne<{
        $autocomplete?: BannedUsersFilterOptions['reason'];
    } & QueryFilter<BannedUsersFilterOptions['reason']>> | PrimitiveFilter<BannedUsersFilterOptions['reason']>;
} & {
    [Key in keyof Omit<BannedUsersFilterOptions, 'channel_cid' | 'reason'>]: RequireOnlyOne<QueryFilter<BannedUsersFilterOptions[Key]>> | PrimitiveFilter<BannedUsersFilterOptions[Key]>;
}>;
export declare type ChannelFilters<ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType = UnknownType> = QueryFilters<ContainsOperator<ChannelType> & {
    members?: RequireOnlyOne<Pick<QueryFilter<string>, '$in' | '$nin'>> | RequireOnlyOne<Pick<QueryFilter<string[]>, '$eq'>> | PrimitiveFilter<string[]>;
} & {
    name?: RequireOnlyOne<{
        $autocomplete?: ChannelResponse<ChannelType, CommandType, UserType>['name'];
    } & QueryFilter<ChannelResponse<ChannelType, CommandType, UserType>['name']>> | PrimitiveFilter<ChannelResponse<ChannelType, CommandType, UserType>['name']>;
} & {
    [Key in keyof Omit<ChannelResponse<{}, CommandType, UserType>, 'name' | 'members'>]: RequireOnlyOne<QueryFilter<ChannelResponse<{}, CommandType, UserType>[Key]>> | PrimitiveFilter<ChannelResponse<{}, CommandType, UserType>[Key]>;
}>;
export declare type ContainsOperator<CustomType = {}> = {
    [Key in keyof CustomType]?: CustomType[Key] extends (infer ContainType)[] ? RequireOnlyOne<{
        $contains?: ContainType extends object ? PrimitiveFilter<RequireAtLeastOne<ContainType>> : PrimitiveFilter<ContainType>;
    } & QueryFilter<PrimitiveFilter<ContainType>[]>> | PrimitiveFilter<PrimitiveFilter<ContainType>[]> : RequireOnlyOne<QueryFilter<CustomType[Key]>> | PrimitiveFilter<CustomType[Key]>;
};
export declare type MessageFilters<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = QueryFilters<ContainsOperator<MessageType> & {
    text?: RequireOnlyOne<{
        $autocomplete?: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>['text'];
        $q?: MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>['text'];
    } & QueryFilter<MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>['text']>> | PrimitiveFilter<MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>['text']>;
} & {
    [Key in keyof Omit<MessageResponse<AttachmentType, ChannelType, CommandType, {}, ReactionType, UserType>, 'text'>]?: RequireOnlyOne<QueryFilter<MessageResponse<AttachmentType, ChannelType, CommandType, {}, ReactionType, UserType>[Key]>> | PrimitiveFilter<MessageResponse<AttachmentType, ChannelType, CommandType, {}, ReactionType, UserType>[Key]>;
}>;
export declare type PrimitiveFilter<ObjectType> = ObjectType | null;
export declare type QueryFilter<ObjectType = string> = NonNullable<ObjectType> extends string | number | boolean ? {
    $eq?: PrimitiveFilter<ObjectType>;
    $exists?: boolean;
    $gt?: PrimitiveFilter<ObjectType>;
    $gte?: PrimitiveFilter<ObjectType>;
    $in?: PrimitiveFilter<ObjectType>[];
    $lt?: PrimitiveFilter<ObjectType>;
    $lte?: PrimitiveFilter<ObjectType>;
    $ne?: PrimitiveFilter<ObjectType>;
    $nin?: PrimitiveFilter<ObjectType>[];
} : {
    $eq?: PrimitiveFilter<ObjectType>;
    $exists?: boolean;
    $in?: PrimitiveFilter<ObjectType>[];
    $ne?: PrimitiveFilter<ObjectType>;
    $nin?: PrimitiveFilter<ObjectType>[];
};
export declare type QueryFilters<Operators = {}> = {
    [Key in keyof Operators]?: Operators[Key];
} & QueryLogicalOperators<Operators>;
export declare type QueryLogicalOperators<Operators> = {
    $and?: ArrayOneOrMore<QueryFilters<Operators>>;
    $nor?: ArrayOneOrMore<QueryFilters<Operators>>;
    $or?: ArrayTwoOrMore<QueryFilters<Operators>>;
};
export declare type UserFilters<UserType = UnknownType> = QueryFilters<ContainsOperator<UserType> & {
    id?: RequireOnlyOne<{
        $autocomplete?: UserResponse<UserType>['id'];
    } & QueryFilter<UserResponse<UserType>['id']>> | PrimitiveFilter<UserResponse<UserType>['id']>;
    name?: RequireOnlyOne<{
        $autocomplete?: UserResponse<UserType>['name'];
    } & QueryFilter<UserResponse<UserType>['name']>> | PrimitiveFilter<UserResponse<UserType>['name']>;
    teams?: RequireOnlyOne<{
        $contains?: PrimitiveFilter<string>;
        $eq?: PrimitiveFilter<UserResponse<UserType>['teams']>;
    }> | PrimitiveFilter<UserResponse<UserType>['teams']>;
    username?: RequireOnlyOne<{
        $autocomplete?: UserResponse<UserType>['username'];
    } & QueryFilter<UserResponse<UserType>['username']>> | PrimitiveFilter<UserResponse<UserType>['username']>;
} & {
    [Key in keyof Omit<UserResponse<{}>, 'id' | 'name' | 'teams' | 'username'>]?: RequireOnlyOne<QueryFilter<UserResponse<{}>[Key]>> | PrimitiveFilter<UserResponse<{}>[Key]>;
}>;
/**
 * Sort Types
 */
export declare type BannedUsersSort = BannedUsersSortBase | Array<BannedUsersSortBase>;
export declare type BannedUsersSortBase = {
    created_at?: AscDesc;
};
export declare type ChannelSort<ChannelType = UnknownType> = ChannelSortBase<ChannelType> | Array<ChannelSortBase<ChannelType>>;
export declare type ChannelSortBase<ChannelType = UnknownType> = Sort<ChannelType> & {
    created_at?: AscDesc;
    has_unread?: AscDesc;
    last_message_at?: AscDesc;
    last_updated?: AscDesc;
    member_count?: AscDesc;
    unread_count?: AscDesc;
    updated_at?: AscDesc;
};
export declare type Sort<T> = {
    [P in keyof T]?: AscDesc;
};
export declare type UserSort<UserType = UnknownType> = Sort<UserResponse<UserType>> | Array<Sort<UserResponse<UserType>>>;
export declare type SearchMessageSortBase<MessageType = UnknownType> = Sort<MessageType> & {
    attachments?: AscDesc;
    'attachments.type'?: AscDesc;
    created_at?: AscDesc;
    id?: AscDesc;
    'mentioned_users.id'?: AscDesc;
    parent_id?: AscDesc;
    pinned?: AscDesc;
    relevance?: AscDesc;
    reply_count?: AscDesc;
    text?: AscDesc;
    type?: AscDesc;
    updated_at?: AscDesc;
    'user.id'?: AscDesc;
};
export declare type SearchMessageSort<MessageType = UnknownType> = SearchMessageSortBase<MessageType> | Array<SearchMessageSortBase<MessageType>>;
export declare type QuerySort<ChannelType = UnknownType, UserType = UnknownType, MessageType = UnknownType> = BannedUsersSort | ChannelSort<ChannelType> | SearchMessageSort<MessageType> | UserSort<UserType>;
/**
 * Base Types
 */
export declare type Action = {
    name?: string;
    style?: string;
    text?: string;
    type?: string;
    value?: string;
};
export declare type AnonUserType = {};
export declare type APNConfig = {
    auth_type?: string;
    bundle_id?: string;
    development?: boolean;
    enabled?: boolean;
    host?: string;
    key_id?: string;
    notification_template?: string;
    team_id?: string;
};
export declare type AppSettings = {
    apn_config?: {
        auth_key?: string;
        auth_type?: string;
        bundle_id?: string;
        development?: boolean;
        host?: string;
        key_id?: string;
        notification_template?: string;
        p12_cert?: string;
        team_id?: string;
    };
    auto_translation_enabled?: boolean;
    custom_action_handler_url?: string;
    disable_auth_checks?: boolean;
    disable_permissions_checks?: boolean;
    enforce_unique_usernames?: 'no' | 'app' | 'team';
    file_upload_config?: FileUploadConfig;
    firebase_config?: {
        credentials_json: string;
        data_template?: string;
        notification_template?: string;
        server_key?: string;
    };
    grants?: Record<string, string[]>;
    image_moderation_enabled?: boolean;
    image_upload_config?: FileUploadConfig;
    multi_tenant_enabled?: boolean;
    push_config?: {
        version?: string;
    };
    revoke_tokens_issued_before?: string | null;
    sqs_key?: string;
    sqs_secret?: string;
    sqs_url?: string;
    webhook_url?: string;
};
export declare type Attachment<T = UnknownType> = T & {
    actions?: Action[];
    asset_url?: string;
    author_icon?: string;
    author_link?: string;
    author_name?: string;
    color?: string;
    fallback?: string;
    fields?: Field[];
    footer?: string;
    footer_icon?: string;
    image_url?: string;
    og_scrape_url?: string;
    pretext?: string;
    text?: string;
    thumb_url?: string;
    title?: string;
    title_link?: string;
    type?: string;
};
export declare type BlockList = {
    name: string;
    words: string[];
};
export declare type ChannelConfig<CommandType extends string = LiteralStringForUnion> = ChannelConfigFields & CreatedAtUpdatedAt & {
    commands?: CommandVariants<CommandType>[];
};
export declare type ChannelConfigAutomod = '' | 'AI' | 'disabled' | 'simple';
export declare type ChannelConfigAutomodBehavior = '' | 'block' | 'flag';
export declare type ChannelConfigAutomodThresholds = null | {
    explicit?: {
        block?: number;
        flag?: number;
    };
    spam?: {
        block?: number;
        flag?: number;
    };
    toxic?: {
        block?: number;
        flag?: number;
    };
};
export declare type ChannelConfigFields = {
    automod?: ChannelConfigAutomod;
    automod_behavior?: ChannelConfigAutomodBehavior;
    blocklist_behavior?: ChannelConfigAutomodBehavior;
    connect_events?: boolean;
    custom_events?: boolean;
    max_message_length?: number;
    message_retention?: string;
    mutes?: boolean;
    name?: string;
    push_notifications?: boolean;
    reactions?: boolean;
    read_events?: boolean;
    replies?: boolean;
    search?: boolean;
    typing_events?: boolean;
    uploads?: boolean;
    url_enrichment?: boolean;
};
export declare type ChannelConfigWithInfo<CommandType extends string = LiteralStringForUnion> = ChannelConfigFields & CreatedAtUpdatedAt & {
    commands?: CommandResponse<CommandType>[];
};
export declare type ChannelData<ChannelType = UnknownType> = ChannelType & {
    members?: string[];
    name?: string;
};
export declare type ChannelMembership<UserType = UnknownType> = {
    banned?: boolean;
    channel_role?: Role;
    created_at?: string;
    is_moderator?: boolean;
    role?: string;
    shadow_banned?: boolean;
    updated_at?: string;
    user?: UserResponse<UserType>;
};
export declare type ChannelMute<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = {
    user: UserResponse<UserType>;
    channel?: ChannelResponse<ChannelType, CommandType, UserType>;
    created_at?: string;
    expires?: string;
    updated_at?: string;
};
export declare type ChannelRole = {
    custom?: boolean;
    name?: string;
    owner?: boolean;
    resource?: string;
    same_team?: boolean;
};
export declare type CheckPushInput<UserType = UnknownType> = {
    apn_template?: string;
    client_id?: string;
    connection_id?: string;
    firebase_data_template?: string;
    firebase_template?: string;
    message_id?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type CommandVariants<CommandType extends string = LiteralStringForUnion> = 'all' | 'ban' | 'flag' | 'fun_set' | 'giphy' | 'imgur' | 'moderation_set' | 'mute' | 'unban' | 'unmute' | CommandType;
export declare type Configs<CommandType extends string = LiteralStringForUnion> = {
    [channel_type: string]: ChannelConfigWithInfo<CommandType> | undefined;
};
export declare type ConnectionOpen<ChannelType extends UnknownType = UnknownType, CommandType extends string = LiteralStringForUnion, UserType extends UnknownType = UnknownType> = {
    connection_id: string;
    cid?: string;
    created_at?: string;
    me?: OwnUserResponse<ChannelType, CommandType, UserType>;
    type?: string;
};
export declare type CreatedAtUpdatedAt = {
    created_at: string;
    updated_at: string;
};
export declare type Device<UserType = UnknownType> = DeviceFields & {
    provider?: string;
    user?: UserResponse<UserType>;
    user_id?: string;
};
export declare type DeviceFields = {
    created_at: string;
    disabled?: boolean;
    disabled_reason?: string;
    id?: string;
    push_provider?: 'apn' | 'firebase';
};
export declare type EndpointName = 'Connect' | 'DeleteFile' | 'DeleteImage' | 'DeleteMessage' | 'DeleteUser' | 'DeactivateUser' | 'ExportUser' | 'DeleteReaction' | 'UpdateChannel' | 'UpdateChannelPartial' | 'UpdateMessage' | 'GetMessage' | 'GetManyMessages' | 'UpdateUsers' | 'UpdateUsersPartial' | 'CreateGuest' | 'GetOrCreateChannel' | 'StopWatchingChannel' | 'QueryChannels' | 'Search' | 'QueryUsers' | 'QueryMembers' | 'QueryBannedUsers' | 'GetReactions' | 'GetReplies' | 'Ban' | 'Unban' | 'Mute' | 'MuteChannel' | 'UnmuteChannel' | 'UnmuteUser' | 'RunMessageAction' | 'SendEvent' | 'MarkRead' | 'MarkAllRead' | 'SendMessage' | 'ImportChannelMessages' | 'UploadFile' | 'UploadImage' | 'UpdateApp' | 'GetApp' | 'CreateDevice' | 'DeleteDevice' | 'SendReaction' | 'Flag' | 'Unflag' | 'CreateChannelType' | 'DeleteChannel' | 'DeleteChannelType' | 'GetChannelType' | 'ListChannelTypes' | 'ListDevices' | 'TruncateChannel' | 'UpdateChannelType' | 'CheckPush' | 'PrivateSubmitModeration' | 'ReactivateUser' | 'HideChannel' | 'ShowChannel' | 'CreatePermission' | 'UpdatePermission' | 'GetPermission' | 'DeletePermission' | 'ListPermissions' | 'CreateRole' | 'DeleteRole' | 'ListRoles' | 'Sync' | 'TranslateMessage' | 'CreateCommand' | 'GetCommand' | 'UpdateCommand' | 'DeleteCommand' | 'ListCommands' | 'CreateBlockList' | 'UpdateBlockList' | 'GetBlockList' | 'ListBlockLists' | 'DeleteBlockList' | 'ExportChannels' | 'GetExportChannelsStatus' | 'CheckSQS' | 'GetRateLimits' | 'MessageUpdatePartial';
export declare type ExportChannelRequest = {
    id: string;
    type: string;
    messages_since?: Date;
    messages_until?: Date;
};
export declare type Field = {
    short?: boolean;
    title?: string;
    value?: string;
};
export declare type FileUploadConfig = {
    allowed_file_extensions?: string[];
    allowed_mime_types?: string[];
    blocked_file_extensions?: string[];
    blocked_mime_types?: string[];
};
export declare type FirebaseConfig = {
    credentials_json?: string;
    data_template?: string;
    enabled?: boolean;
    notification_template?: string;
};
export declare type LiteralStringForUnion = string & {};
export declare type Logger = (logLevel: 'info' | 'error' | 'warn', message: string, extraData?: Record<string, unknown>) => void;
export declare type Message<AttachmentType = UnknownType, MessageType = UnknownType, UserType = UnknownType> = Partial<MessageBase<AttachmentType, MessageType, UserType>> & {
    mentioned_users?: string[];
};
export declare type MessageBase<AttachmentType = UnknownType, MessageType = UnknownType, UserType = UnknownType> = MessageType & {
    id: string;
    attachments?: Attachment<AttachmentType>[];
    html?: string;
    mml?: string;
    parent_id?: string;
    pinned?: boolean;
    quoted_message_id?: string;
    show_in_channel?: boolean;
    text?: string;
    user?: UserResponse<UserType> | null;
    user_id?: string;
};
export declare type MessageLabel = 'deleted' | 'ephemeral' | 'error' | 'regular' | 'reply' | 'system';
export declare type Mute<UserType = UnknownType> = {
    created_at: string;
    target: UserResponse<UserType>;
    updated_at: string;
    user: UserResponse<UserType>;
};
export declare type PartialUpdateChannel<ChannelType = UnknownType> = {
    set?: Partial<ChannelResponse<ChannelType>>;
    unset?: Array<keyof ChannelResponse<ChannelType>>;
};
export declare type PartialUserUpdate<UserType = UnknownType> = {
    id: string;
    set?: Partial<UserResponse<UserType>>;
    unset?: Array<keyof UserResponse<UserType>>;
};
export declare type MessageUpdatableFields<MessageType = UnknownType> = Omit<MessageResponse<MessageType>, 'cid' | 'created_at' | 'updated_at' | 'deleted_at' | 'user' | 'user_id'>;
export declare type PartialMessageUpdate<MessageType = UnknownType> = {
    set?: Partial<MessageUpdatableFields<MessageType>>;
    unset?: Array<keyof MessageUpdatableFields<MessageType>>;
};
export declare type PermissionAPIObject = {
    action?: string;
    custom?: boolean;
    description?: string;
    id?: string;
    name?: string;
    owner?: boolean;
    same_team?: boolean;
};
export declare type PermissionObject = {
    action?: 'Deny' | 'Allow';
    name?: string;
    owner?: boolean;
    priority?: number;
    resources?: string[];
    roles?: string[];
};
export declare type Policy = {
    action?: 0 | 1;
    created_at?: string;
    name?: string;
    owner?: boolean;
    priority?: number;
    resources?: string[];
    roles?: string[];
    updated_at?: string;
};
export declare type RateLimitsInfo = {
    limit: number;
    remaining: number;
    reset: number;
};
export declare type RateLimitsMap = Record<EndpointName, RateLimitsInfo>;
export declare type Reaction<ReactionType = UnknownType, UserType = UnknownType> = ReactionType & {
    type: string;
    message_id?: string;
    score?: number;
    user?: UserResponse<UserType> | null;
    user_id?: string;
};
export declare type Resource = 'AddLinks' | 'BanUser' | 'CreateChannel' | 'CreateMessage' | 'CreateReaction' | 'DeleteAttachment' | 'DeleteChannel' | 'DeleteMessage' | 'DeleteReaction' | 'EditUser' | 'MuteUser' | 'ReadChannel' | 'RunMessageAction' | 'UpdateChannel' | 'UpdateChannelMembers' | 'UpdateMessage' | 'UpdateUser' | 'UploadAttachment';
export declare type SearchPayload<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = Omit<SearchOptions<MessageType>, 'sort'> & {
    client_id?: string;
    connection_id?: string;
    filter_conditions?: ChannelFilters<ChannelType, CommandType, UserType>;
    message_filter_conditions?: MessageFilters<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>;
    query?: string;
    sort?: Array<{
        direction: AscDesc;
        field: keyof SearchMessageSortBase<MessageType>;
    }>;
};
export declare type TestPushDataInput = {
    apnTemplate?: string;
    firebaseDataTemplate?: string;
    firebaseTemplate?: string;
    messageID?: string;
    skipDevices?: boolean;
};
export declare type TestSQSDataInput = {
    sqs_key?: string;
    sqs_secret?: string;
    sqs_url?: string;
};
export declare type TokenOrProvider = null | string | TokenProvider | undefined;
export declare type TokenProvider = () => Promise<string>;
export declare type TranslationLanguages = '' | 'af' | 'am' | 'ar' | 'az' | 'bg' | 'bn' | 'bs' | 'cs' | 'da' | 'de' | 'el' | 'en' | 'es' | 'es-MX' | 'et' | 'fa' | 'fa-AF' | 'fi' | 'fr' | 'fr-CA' | 'ha' | 'he' | 'hi' | 'hr' | 'hu' | 'id' | 'it' | 'ja' | 'ka' | 'ko' | 'lv' | 'ms' | 'nl' | 'no' | 'pl' | 'ps' | 'pt' | 'ro' | 'ru' | 'sk' | 'sl' | 'so' | 'sq' | 'sr' | 'sv' | 'sw' | 'ta' | 'th' | 'tl' | 'tr' | 'uk' | 'ur' | 'vi' | 'zh' | 'zh-TW';
export declare type TypingStartEvent = Event;
export declare type UpdatedMessage<AttachmentType = UnknownType, ChannelType = UnknownType, CommandType extends string = LiteralStringForUnion, MessageType = UnknownType, ReactionType = UnknownType, UserType = UnknownType> = Omit<MessageResponse<AttachmentType, ChannelType, CommandType, MessageType, ReactionType, UserType>, 'mentioned_users'> & {
    mentioned_users?: string[];
};
export declare type User<UserType = UnknownType> = UserType & {
    id: string;
    anon?: boolean;
    name?: string;
    role?: string;
    teams?: string[];
    username?: string;
};
export declare type SegmentData = {
    description: string;
    filter: {
        channel?: object;
        user?: object;
    };
    name: string;
};
export declare type Segment = {
    app_pk: number;
    created_at: string;
    id: string;
    updated_at: string;
    recipients?: number;
} & SegmentData;
export declare type CampaignData = {
    attachments: Attachment[];
    defaults: Record<string, string>;
    segment_id: string;
    text: string;
    push_notifications?: boolean;
    sender_id?: string;
    track_opened?: boolean;
};
export declare type CampaignStatus = {
    errors: string[];
    status: 'draft' | 'stopped' | 'scheduled' | 'completed' | 'failed' | 'canceled' | 'in_progress';
    completed_at?: string;
    failed_at?: string;
    progress?: {
        delivered: number;
        errored: number;
        sent: number;
    };
    resumed_at?: string;
    scheduled_at?: string;
    stopped_at?: string;
};
export declare type Campaign = {
    app_pk: string;
    created_at: string;
    id: string;
    updated_at: string;
    test?: boolean;
    test_original_id?: string;
} & CampaignData & CampaignStatus;
//# sourceMappingURL=types.d.ts.map