import "./MilestonesSection.css";

const milestones = [
    {
        title: "200+ doanh nghiệp",
        description:
            "Từ những cái bắt tay e dè ngày đầu thành lập, mạng lưới kết nối nay vinh dự quy tụ hơn 200 tập đoàn, doanh nghiệp uy tín hàng đầu trong trong các lĩnh vực công nghệ, tài chính và dịch vụ. Sự kiện không chỉ đơn thuần là chiêu mộ hiền tài, mà đã nâng cấp trở thành bệ phóng truyền thông chiến lược, giúp các doanh nghiệp khắc sâu dấu ấn thương hiệu và lan tỏa tầm nhìn đến cộng đồng sinh viên nói chung và sinh viên Trường Đại học Bách khoa - ĐHQG-HCM nói riêng.",
    },
    {
        title: "300+ gian hàng",
        description:
            "Vượt xa khỏi giới hạn của một buổi tuyển dụng thông thường, hơn 300 gian hàng qua các năm đã kiến tạo nên những không gian đối thoại trực tiếp và cởi mở. Là nơi những ý tưởng lớn gặp nhau, CSE Job Fair xây dựng lên nơi mà nhà tuyển dụng và sinh viên có thể tự do chia sẻ, trao đổi thông qua những hoạt động thực tiễn, hấp dẫn, mang lại giá trị thiết thực nhất cho cẩ đôi bên.",
    },
    {
        title: "20000+ sinh viên",
        description:
            "Thu hút hơn 20000 “kỹ sư tương lai” trên địa bàn toàn thành phố, Ngày hội Việc làm từ lâu đã vượt xa khỏi khuôn khổ của một sự kiện, trở thành “điểm hẹn” đáng tin cậy. Nơi đây là ngọn hải đăng soi đường, giúp các bạn sinh viên trẻ trui rèn bản lĩnh, thấu hiểu bức tranh đa màu, đa sắc của thị trường lao động, tự tin vạch ra định hướng vững chắc cho sự nghiệp tương lai.",
    },
    {
        title: "100000+ cơ hội việc làm",
        description:
            "Với hơn 100000 cánh cửa sự nghiệp mở ra cho đa dạng các vị trí như thực tập sinh, fresher, nhân sự full-time được giới thiệu, CSE Job Fair là minh chứng sống động cho nỗ lực không ngừng nghỉ. Mỗi một cơ hội được trao tay là một bến đỗ lý tưởng cho người trẻ, đồng thời mang đến cái nhìn toàn cảnh sắc nét nhất về dòng chảy của thị trường lao động Việt Nam.",
    },
];

const MilestonesSection = () => {
    return (
        <section id="milestones" className="home-milestones">
            <div className="home-milestones__container">
                <h2 className="home-milestones__title">Hành trình 20 năm CSE Job Fair</h2>
                <p className="home-milestones__intro">
                    Năm 2006, khi kỷ nguyên số tại Việt Nam bắt đầu có những bước chuyển mình mạnh mẽ nhất, cũng là lúc một trăn trở lớn đặt ra: Làm sao để mang tri thức từ giảng đường thực sự chạm đến nhịp thở của thị trường lao động? Từ những nghi vấn đó cùng với vô vàn những ngổn ngang của buổi giao thời, CSE Job Fair đã ra đời như một viên gạch đầu tiên nối liền khoảng cách giữa sinh viên và các doanh nghiệp công nghệ lớn nhỏ trong và ngoài nước.
                </p>
                <p className="home-milestones__intro">
                    Hai thập kỷ - một chặng đường đủ dài để chứng kiến vạn vật đổi dời. Nền kinh tế Việt Nam đi qua rất nhiều thăng trầm, đặc biệt là cuộc khủng hoảng tài chính toàn cầu năm 2007-2008: Lạm phát cao, xuất nhập khẩu khó khăn, chứng khoán, tăng trưởng kinh tế trên bờ vực sụt giảm,.... Chúng ta đã nếm trải sự xoay chuyển chóng mặt của kỷ nguyên công nghệ mới, oằn mình chống chọi với đại dịch lịch sử COVID-19 và “Mùa đông công nghệ” đầy khắc nghiệt trong những năm gần đây. Đã có những thời điểm thị trường lao động dường như đóng băng; doanh nghiệp phải gồng mình trước bài toán sinh tồn; còn sinh viên hoang mang đứng trước cánh cửa tương lai mờ mịt, đầy ắp những nỗi âu lo.
                </p>
                <p className="home-milestones__intro">
                    Khi nhìn lại hành trình dài này, ta mới thấy rõ được một điều: Chính trong những ngày tháng thử thách nhất lại là ngày mà ngọn lửa của CSE Job Fair bừng cháy mãnh liệt nhất. Thay vì lùi bước, sự kiện đã vươn mình biến đổi, thích ứng linh hoạt từ hình thức đến quy mô, trở thành chiếc cầu nối vững chắc vắt ngang qua mọi biến động. CSE Job Fair hiểu rằng: Doanh nghiệp không chỉ cần nhân lực, mà cần những người bạn đồng hành kiên gan; và sinh viên không chỉ cần việc làm, mà cần một bến đỗ thực sự để trao gửi niềm tin.
                </p>
                <p className="home-milestones__intro">
                    Vượt qua những thăng trầm của thời cuộc, CSE Job Fair tự hào mang tầm vóc của một Ngày hội Việc làm hàng đầu, để lại những di sản rực rỡ trong suốt hai thập kỷ qua.
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
