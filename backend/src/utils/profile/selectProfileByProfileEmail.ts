import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectProfileByProfileEmail(profileEmail: string): Promise<Profile|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'SELECT BIN_TO_UUID(profileId) AS profileId, profileAuthenticationToken, profileEmail, profileFirstName, profileHash, profileLastName, profileUsername FROM profile WHERE profileEmail = :profileEmail'
    const result = await mysqlConnection.execute(mysqlQuery, {profileEmail}) as RowDataPacket[]
    const profile: Profile[] = result[0] as Profile[]
    await mysqlConnection.release()
    return profile.length === 1 ? {...profile[0]} : null
}