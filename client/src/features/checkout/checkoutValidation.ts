import * as yup from 'yup';

export const validationSchema = [

    yup.object({

        fullName: yup.string().required('Full name is required'),
        Address1: yup.string().required('Address1 is required'),
        Address2: yup.string().required(),
        State: yup.string().required(),
        ZipCode: yup.string().required(),
        Country: yup.string().required()
    }),

    yup.object(),

    yup.object({

        nameOnCard: yup.string().required()
    })
] 