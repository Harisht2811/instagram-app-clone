import { supabase } from "../Supabase/Supabase";


export const FetchData = (table) => {
    return supabase.from(table).select();
}

export const FetchDataByEmail = (table, email) => {
    return FetchData(table).eq("email", email);
}
export const FetchDataNotByUsername = (table, username) => {
    return FetchData(table).neq("username", username);
}

export const FetchDataByUsername = (table, username) => {
    return FetchData(table).eq("username", username);
}

export const FetchUserImage = (table, username) => {
    return FetchData(table).eq("username", username).select();
}

export const InsertData = async (table, data) => {
    return await supabase.from(table).insert(data).select();
}

export const UpdateData = async (table, data, condition) => {
    return await supabase.from(table).update(data).eq("email",condition).select();
}
export const UpdateDataLikes = async (table, data, condition) => {
    return await supabase.from(table).update(data).eq("id",condition).select();
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