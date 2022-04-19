import mongoose from 'mongoose'
import { attributeSchema, IAttribute } from './attribute'
import { sensorSchema, ISensor } from './sensors'

/**
 * Defines a plant. A plant is an entity that defines a user-owned plant. It contains sensor readings as well as its attributes
 */
export interface IPlant {
    name: string,
    description?: string,
    type:string,
    createdAt?: Date,
    sensor?: [ISensor],
    attributes?: [IAttribute]
}

/**
 * These types allow to have the sensor as a sub document
 */
type PlantsDocumentsProps = {
    sensor: mongoose.Types.DocumentArray<ISensor>,
    attributes: mongoose.Types.DocumentArray<IAttribute>
}
type PlantsModelType = mongoose.Model<IPlant, {}, PlantsDocumentsProps>

/**
 * The schema of the plant document in the database
 */
export const plantSchema = new mongoose.Schema<IPlant, PlantsModelType>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    sensor: {
        type: [sensorSchema],
        default: [],
        unique: false,
        sparse: true
    },
    attributes:{
        type: [attributeSchema],
        default: [],
        unique: false,
        sparse: true
    }
},{
    timestamps: true
})

const Plant = mongoose.model<IPlant, PlantsModelType>('Plant', plantSchema)

export { Plant }
