/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\wizzi\actions.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {deprecated} from "typesafe-actions";
const {
    createStandardAction
 } = deprecated;
import {ResponsePayload} from '../../store';
import {PackiFiles} from '../packi';
import {GeneratedArtifact} from './types';
const GENERATE_ARTIFACT_REQUEST = '@@wizzi/GENERATE_ARTIFACT_REQUEST';
const GENERATE_ARTIFACT_SUCCESS = '@@wizzi/GENERATE_ARTIFACT_SUCCESS';
const GENERATE_ARTIFACT_ERROR = '@@wizzi/GENERATE_ARTIFACT_ERROR';
const MTREE_DEBUG_INFO_REQUEST = '@@wizzi/MTREE_DEBUG_INFO_REQUEST';
const MTREE_DEBUG_INFO_SUCCESS = '@@wizzi/MTREE_DEBUG_INFO_SUCCESS';
const MTREE_DEBUG_INFO_ERROR = '@@wizzi/MTREE_DEBUG_INFO_ERROR';
const MTREE_REQUEST = '@@wizzi/MTREE_REQUEST';
const MTREE_SUCCESS = '@@wizzi/MTREE_SUCCESS';
const MTREE_ERROR = '@@wizzi/MTREE_ERROR';
const EXECUTE_JOB_REQUEST = '@@wizzi/EXECUTE_JOB_REQUEST';
const EXECUTE_JOB_SUCCESS = '@@wizzi/EXECUTE_JOB_SUCCESS';
const EXECUTE_JOB_ERROR = '@@wizzi/EXECUTE_JOB_ERROR';
const SET_TIMED_SERVICE = '@@wizzi/SET_TIMED_SERVICE';

export interface ArtifactRequestPayload {
    filePath: string;
    files: PackiFiles;
}

export interface ArtifactResponsePayload extends ResponsePayload {
    generatedArtifact: GeneratedArtifact;
}

export interface MTreeDebugInfoResponsePayload extends ResponsePayload {
    mTreeBuildUpScript: string;
}

export interface MTreeResponsePayload extends ResponsePayload {
    mTreeIttf: string;
}

export interface JobRequestPayload {
    files: PackiFiles;
}

export interface JobResponsePayload extends ResponsePayload {
    generatedArtifacts: PackiFiles;
}

export interface SetTimedServicePayload {
    serviceName: string;
    onOff: boolean;
    payload?: any;
    frequence?: number;
}

export const generateArtifactRequest = createStandardAction(GENERATE_ARTIFACT_REQUEST)<ArtifactRequestPayload>();
export const generateArtifactSuccess = createStandardAction(GENERATE_ARTIFACT_SUCCESS)<ArtifactResponsePayload>();
export const generateArtifactError = createStandardAction(GENERATE_ARTIFACT_ERROR)<string>();

export const mTreeDebugInfoRequest = createStandardAction(MTREE_DEBUG_INFO_REQUEST)<ArtifactRequestPayload>();
export const mTreeDebugInfoSuccess = createStandardAction(MTREE_DEBUG_INFO_SUCCESS)<MTreeDebugInfoResponsePayload>();
export const mTreeDebugInfoError = createStandardAction(MTREE_DEBUG_INFO_ERROR)<string>();

export const mTreeRequest = createStandardAction(MTREE_REQUEST)<ArtifactRequestPayload>();
export const mTreeSuccess = createStandardAction(MTREE_SUCCESS)<MTreeResponsePayload>();
export const mTreeError = createStandardAction(MTREE_ERROR)<string>();

export const executeJobRequest = createStandardAction(EXECUTE_JOB_REQUEST)<JobRequestPayload>();
export const executeJobSuccess = createStandardAction(EXECUTE_JOB_SUCCESS)<JobResponsePayload>();
export const executeJobError = createStandardAction(EXECUTE_JOB_ERROR)<string>();
export const setTimedService = createStandardAction(SET_TIMED_SERVICE)<SetTimedServicePayload>();
