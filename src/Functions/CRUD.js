import { supabase } from "../Supabase/Supabase";


export const FetchData = (table, requiredFields) => {
    return supabase.from(table).select(requiredFields.length ?requiredFields.join(","): "*");
}

export const FetchDataById = (table, id) => {
    return FetchData(table).eq("id", id);
}

export const InsertData = async (table, data) => {
    console.log(data,table)
    return await supabase.from(table).insert(data).select();
}

export const UpdateData = async (table, data, condition) => {
    const { conditionKey, conditionValue} = condition;
    return await supabase.from(table).update(data).eq(conditionKey, conditionValue).select();
}

export const DeleteData = async (table, condition) => {
    const { conditionKey, conditionValue} = condition;
    return await supabase.from(table).delete().eq(conditionKey, conditionValue);
}

export const BulkDelete = async (table, ids) => {
    return await supabase.from(table).delete().in("id", ids)
}

export const BulkUpdate = async (table, data) => {
    return await supabase.from(table).upsert(data, { onConflict: 'id' })
}