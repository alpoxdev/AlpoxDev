import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name : 'YOURFACE_STAR' })
export default class YourFaceStar extends BaseEntity{
    @PrimaryGeneratedColumn()
	public id : number;
	
	@Column({ type : 'text'})
	public name : string;
    
    @Column({ type : 'text'})
    public url : string;
	
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