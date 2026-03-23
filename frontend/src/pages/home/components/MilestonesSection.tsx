import "./MilestonesSection.css";

const milestones = [
    { title: "300+ doanh nghiệp", description: "Nhiều doanh nghiệp công nghệ, tài chính và dịch vụ tham gia tuyển dụng." },
    { title: "30+ gian hàng", description: "Không gian kết nối trực tiếp giữa doanh nghiệp và sinh viên toàn khoa." },
    { title: "2000+ sinh viên", description: "Lượng sinh viên tham gia ổn định qua nhiều mùa tổ chức." },
    { title: "2000+ cơ hội", description: "Nhiều vị trí thực tập, fresher và full-time được giới thiệu." },
];

const MilestonesSection = () => {
    return (
        <section id="milestones" className="home-milestones">
            <div className="home-milestones__container">
                <h2 className="home-milestones__title">Hành trình 20 năm</h2>
                <p className="home-milestones__intro">
                    CSE JOB FAIR được xây dựng như cầu nối giữa doanh nghiệp và sinh viên, tập trung vào cơ hội nghề nghiệp thực tế.
                </p>
                <div className="home-milestones__grid">
                    {milestones.map((item) => (
                        <article key={item.title} className="home-milestones__card">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MilestonesSection;
