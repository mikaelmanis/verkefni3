import { Schema } from 'express-validator';

export const createTeamSchema: Schema = {
    name : {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Name is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Name must be a string',
            bail: true,
        },
        escape: true,

    },
    description: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Description must be a string',
            bail: true,
        },
        escape: true,
    },
};

export const updateTeamSchema: Schema = {
    name : {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Name is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Name must be a string',
            bail: true,
        },
        escape: true,
    },
    description: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Description must be a string',
            bail: true,
        },
        escape: true,
    },
};

export const createGameSchema: Schema = {
    date: {
        in: ['body'],
        optional: false,
        isISO8601: {
            errorMessage: 'Date must be a valid date',
            bail: true,
        },
        toDate: true,
    },
    home: {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Home team is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Home team must be a string',
            bail: true,
        },
        escape: true,
    },
    away: {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Away team is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Away team must be a string',
            bail: true,
        },
        escape: true,
    },
};

export const updateGameSchema: Schema = {
    date: {
        in: ['body'],
        optional: false,
        isISO8601: {
            errorMessage: 'Date must be a valid date',
            bail: true,
        },
        toDate: true,
    },
    home: {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Home team is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Home team must be a string',
            bail: true,
        },
        escape: true,
    },
    away: {
        in: ['body'],
        optional: false,
        isLength: {
            options: { min: 1 },
            errorMessage: 'Away team is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Away team must be a string',
            bail: true,
        },
        escape: true,
    },
    homeScore: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'Home score must be an integer',
            bail: true,
        },
        toInt: true,
    },
    awayScore: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'Away score must be an integer',
            bail: true,
        },
        toInt: true,
    },
};
