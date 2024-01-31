import { Model, DataType, Table, Column } from 'sequelize-typescript';
@Table({
    tableName: 'products',
    timestamps: true 
})
class ProductModel extends Model {
    
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
        type: DataType.STRING(128),
        allowNull: false
    })
    public price! : string;

}

export default ProductModel;
