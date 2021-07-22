/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\actions.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {deprecated} from "typesafe-actions";
const {
    createStandardAction
 } = deprecated;
import {ResponsePayload} from '../../store';
import {PreferencesType} from '../preferences';
import {GitRepositoryMeta, ClonedGitRepository} from '../github';
import {PackiFiles, PackiTemplate} from './types';
const FETCH_PACKI_LIST_REQUEST = '@@packi/FETCH_PACKI_LIST_REQUEST';
const FETCH_PACKI_LIST_SUCCESS = '@@packi/FETCH_PACKI_LIST_SUCCESS';
const FETCH_PACKI_LIST_ERROR = '@@packi/FETCH_PACKI_LIST_ERROR';
const INIT_PACKI_REQUEST = '@@packi/INIT_PACKI_REQUEST';
const INIT_PACKI_SUCCESS = '@@packi/INIT_PACKI_SUCCESS';
const INIT_PACKI_ERROR = '@@packi/INIT_PACKI_ERROR';
const SELECT_PACKI_REQUEST = '@@packi/SELECT_PACKI_REQUEST';
const SELECT_PACKI_SUCCESS = '@@packi/SELECT_PACKI_SUCCESS';
const SELECT_PACKI_ERROR = '@@packi/SELECT_PACKI_ERROR';
const SAVE_PACKI_REQUEST = '@@packi/SAVE_PACKI_REQUEST';
const SAVE_PACKI_SUCCESS = '@@packi/SAVE_PACKI_SUCCESS';
const SAVE_PACKI_ERROR = '@@packi/SAVE_PACKI_ERROR';
const FETCH_PACKI_TEMPLATE_LIST_REQUEST = '@@packi/FETCH_PACKI_TEMPLATE_LIST_REQUEST';
const FETCH_PACKI_TEMPLATE_LIST_SUCCESS = '@@packi/FETCH_PACKI_TEMPLATE_LIST_SUCCESS';
const FETCH_PACKI_TEMPLATE_LIST_ERROR = '@@packi/FETCH_PACKI_TEMPLATE_LIST_ERROR';
const UPLOAD_PACKI_TEMPLATE_REQUEST = '@@packi/UPLOAD_PACKI_TEMPLATE_REQUEST';
const UPLOAD_PACKI_TEMPLATE_SUCCESS = '@@packi/UPLOAD_PACKI_TEMPLATE_SUCCESS';
const UPLOAD_PACKI_TEMPLATE_ERROR = '@@packi/UPLOAD_PACKI_TEMPLATE_ERROR';
const EXECUTE_JOB_SUCCESS = '@@packi/EXECUTE_JOB_SUCCESS';

export interface AuthRequestPayload {
    uid: string;
}

export interface InitPackiRequestPayload {
    preferences: PreferencesType;
}

export interface PackiListPayload extends ResponsePayload {
    packiNames: string[];
}

export interface PackiIdPayload {
    id: string;
}

export interface SelectedPackiPayload extends ResponsePayload {
    id: string;
    files: PackiFiles;
}

export interface PackiTemplatePayload extends ResponsePayload {
    packi: PackiTemplate;
}

export interface SavePackiPayload extends ResponsePayload {
    id: string;
    filesToSave: PackiFiles;
    packiEntryFiles: PackiFiles;
}

export interface JobResponsePayload extends ResponsePayload {
    generatedArtifacts: PackiFiles;
    previousArtifacts: PackiFiles;
}

export interface UploadPackiTemplatePayload extends AuthRequestPayload {
    templateId: string;
    files: PackiFiles;
}

export interface UploadPackiTemplateResponsePayload extends ResponsePayload {
    writtenFiles?: number;
    deletedFiles?: number;
}

export const fetchPackiListRequest = createStandardAction(FETCH_PACKI_LIST_REQUEST)<void>();
export const fetchPackiListSuccess = createStandardAction(FETCH_PACKI_LIST_SUCCESS)<PackiListPayload>();
export const fetchPackiListError = createStandardAction(FETCH_PACKI_LIST_ERROR)<string>();
export const initPackiRequest = createStandardAction(INIT_PACKI_REQUEST)<InitPackiRequestPayload>();
export const initPackiSuccess = createStandardAction(INIT_PACKI_SUCCESS)<SelectedPackiPayload>();
export const initPackiError = createStandardAction(INIT_PACKI_ERROR)<string>();
export const selectPackiRequest = createStandardAction(SELECT_PACKI_REQUEST)<PackiIdPayload>();
export const selectPackiSuccess = createStandardAction(SELECT_PACKI_SUCCESS)<SelectedPackiPayload>();
export const selectPackiError = createStandardAction(SELECT_PACKI_ERROR)<string>();
export const savePackiRequest = createStandardAction(SAVE_PACKI_REQUEST)<SavePackiPayload>();
export const savePackiSuccess = createStandardAction(SAVE_PACKI_SUCCESS)<SavePackiPayload>();
export const savePackiError = createStandardAction(SAVE_PACKI_ERROR)<string>();
export const fetchPackiTemplateListRequest = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_REQUEST)<void>();
export const fetchPackiTemplateListSuccess = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_SUCCESS)<PackiListPayload>();
export const fetchPackiTemplateListError = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_ERROR)<string>();
export const uploadPackiTemplateRequest = createStandardAction(UPLOAD_PACKI_TEMPLATE_REQUEST)<UploadPackiTemplatePayload>();
export const uploadPackiTemplateSuccess = createStandardAction(UPLOAD_PACKI_TEMPLATE_SUCCESS)<UploadPackiTemplateResponsePayload>();
export const uploadPackiTemplateError = createStandardAction(UPLOAD_PACKI_TEMPLATE_ERROR)<string>();
export const executeJobSuccess = createStandardAction(EXECUTE_JOB_SUCCESS)<JobResponsePayload>();
