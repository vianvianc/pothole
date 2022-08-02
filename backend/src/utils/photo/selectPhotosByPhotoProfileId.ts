import { Photo } from '../interfaces/Photo'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectPhotosByPhotoProfileId(photoProfileId: string) : Promise<Photo[]|null> {
    const mysqlConnection = await connect()
    const mysqlQuery = 'select BIN_TO_UUID(photoId) as photoId, BIN_TO_UUID(photoProfileId) as photoProfileId, photoDate, photoDescription, profile.profileUsername from photo inner join profile on profile.profileId = photo.photoProfileId where photoProfileId = UUID_TO_BIN(:photoProfileId)'
    const result = await mysqlConnection.execute(mysqlQuery, {photoProfileId}) as RowDataPacket[]
    const photo: Photo[] = result[0] as Photo[]
    await mysqlConnection.release()
    // return result [0] as Photo[]
    return photo.length > 0 ? photo : null
}