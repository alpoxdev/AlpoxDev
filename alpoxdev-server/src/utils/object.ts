export const deleteObjectInObject = (object: any, field: any) => {
    delete object[field];
};

export const deleteObjectInObjects = (object: any, fields: Array<any>) => {
    fields.forEach((field: any) => {
        deleteObjectInObject(object, field);
    });
};
