import { Model, DataType, Table, Column } from "sequelize-typescript";

@Table({
    tableName: 'events',
    timestamps: true
})
class EventMondel extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public name!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public description!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public date!: Date;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public hour!: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public location!: string;

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public userId!: number;

}

export default EventMondel;