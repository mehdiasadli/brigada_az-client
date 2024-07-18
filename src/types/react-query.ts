import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiError } from './api';

export type QueryResult<T = unknown> = UseQueryResult<T, ApiError>;
export type MutationResult<T = unknown, V = unknown> = UseMutationResult<T, ApiError, V>;
