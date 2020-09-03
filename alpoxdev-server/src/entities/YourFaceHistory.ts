import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name : 'YOURFACE_HISTORY' })
export default class YourFaceHistory extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column({ type: 'int' })
	public FaceType : number;
	
	@Column({ type: 'int' })
	public EyeType : number;
	
	@Column({ type: 'int' })
	public NoseType : number;
	
	@Column({ type: 'int' })
	public MouthType : number;
	
	@Column({ type: 'int' })
	public ChinType : number;
	
	@Column({ type: 'int' })
	public CheekType : number;
	
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;
}