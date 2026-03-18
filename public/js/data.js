/**
 * data.js - One Piece saga & arc data (bilingual VI/EN)
 * Translatable fields are objects: { vi: '...', en: '...' }
 */

const ONE_PIECE_DATA = [
  {
    id: 'east-blue',
    name: 'East Blue Saga',
    chapters: '1–100',
    color: '#1565C0',
    textColor: '#FFFFFF',
    emoji: '🌊',
    description: {
      vi: 'Hành trình khởi đầu — Luffy tập hợp những thuyền viên đầu tiên tại vùng biển East Blue.',
      en: 'The beginning journey — Luffy assembles his first crew in the seas of East Blue.',
    },
    arcs: [
      {
        name: 'Romance Dawn',
        chapters: '1–7',
        chapterCount: 7,
        summary: {
          vi: 'Luffy ăn trái Gomu-Gomu no Mi và thề trở thành Vua Hải Tặc. Anh chiêu mộ Zoro — kiếm sĩ đang bị giam giữ — làm thuyền viên đầu tiên.',
          en: 'Luffy eats the Gomu-Gomu no Mi and vows to become King of the Pirates. He recruits Zoro — a captive swordsman — as his first crewmate.',
        },
        highlight: { vi: 'Zoro gia nhập', en: 'Zoro joins' },
      },
      {
        name: 'Orange Town',
        chapters: '8–21',
        chapterCount: 14,
        summary: {
          vi: 'Luffy và Zoro gặp Nami — tên trộm bản đồ thông minh. Cùng nhau đánh bại Buggy the Clown, tên cướp biển kỳ quặc với trái Bara-Bara.',
          en: 'Luffy and Zoro meet Nami — a clever map thief. Together they defeat Buggy the Clown, a bizarre pirate with the Bara-Bara no Mi.',
        },
        highlight: { vi: 'Gặp Nami', en: 'Meet Nami' },
      },
      {
        name: 'Syrup Village',
        chapters: '22–41',
        chapterCount: 20,
        summary: {
          vi: 'Gặp Usopp — chàng trai hay nói dối nhưng tốt bụng. Nhóm đánh bại băng Black Cat của Kuro để bảo vệ làng và nhận tàu Going Merry.',
          en: 'They meet Usopp — a lying but good-hearted boy. The crew defeats Kuro\'s Black Cat Pirates to protect the village and receives the Going Merry.',
        },
        highlight: { vi: 'Usopp gia nhập + Going Merry', en: 'Usopp joins + Going Merry' },
      },
      {
        name: 'Baratie',
        chapters: '42–68',
        chapterCount: 27,
        summary: {
          vi: 'Tại nhà hàng nổi Baratie, nhóm đối đầu với Don Krieg và gặp Mihawk — kiếm sĩ mạnh nhất thế giới. Sanji quyết định rời bếp để theo Luffy.',
          en: 'At the floating restaurant Baratie, the crew faces Don Krieg and meets Mihawk — the world\'s greatest swordsman. Sanji decides to leave the kitchen to follow Luffy.',
        },
        highlight: { vi: 'Sanji gia nhập + Zoro vs Mihawk', en: 'Sanji joins + Zoro vs Mihawk' },
      },
      {
        name: 'Arlong Park',
        chapters: '69–95',
        chapterCount: 27,
        summary: {
          vi: 'Bí mật đau thương của Nami được tiết lộ. Luffy và đồng đội phá hủy Arlong Park, giải phóng làng Cocoyasi khỏi ách cai trị của Arlong suốt 8 năm.',
          en: 'Nami\'s painful secret is revealed. Luffy and his crew destroy Arlong Park, freeing Cocoyasi Village from 8 years under Arlong\'s rule.',
        },
        highlight: { vi: 'Nami chính thức gia nhập', en: 'Nami officially joins' },
      },
      {
        name: 'Loguetown',
        chapters: '96–100',
        chapterCount: 5,
        summary: {
          vi: 'Ghé thăm thị trấn nơi Gold Roger ra đời và bị hành quyết. Luffy suýt chết tại đúng đoạn đầu đài của Roger trước khi nhóm tiến vào Grand Line.',
          en: 'A visit to the town where Gold Roger was born and executed. Luffy nearly dies on Roger\'s very execution platform before the crew enters the Grand Line.',
        },
        highlight: { vi: 'Cổng vào Grand Line', en: 'Gateway to the Grand Line' },
      },
    ],
  },
  {
    id: 'arabasta',
    name: 'Arabasta Saga',
    chapters: '101–217',
    color: '#D35400',
    textColor: '#FFFFFF',
    emoji: '🏜️',
    description: {
      vi: 'Hành trình qua sa mạc — cuộc chiến giành lại vương quốc Arabasta từ tay Baroque Works.',
      en: 'A journey through the desert — the battle to reclaim the kingdom of Arabasta from Baroque Works.',
    },
    arcs: [
      {
        name: 'Reverse Mountain',
        chapters: '101–105',
        chapterCount: 5,
        summary: {
          vi: 'Nhóm vào Grand Line qua núi ngược Reverse Mountain và gặp cá voi khổng lồ Laboon — người bạn chờ đợi thuyền trưởng của mình suốt nhiều thập kỷ.',
          en: 'The crew enters the Grand Line through Reverse Mountain and meets Laboon — a giant whale who has waited decades for his captain\'s return.',
        },
        highlight: { vi: 'Vào Grand Line + Laboon', en: 'Enter Grand Line + Laboon' },
      },
      {
        name: 'Whiskey Peak',
        chapters: '106–114',
        chapterCount: 9,
        summary: {
          vi: 'Thị trấn đón khách tưởng như thiên đường hóa ra là bẫy của Baroque Works. Nhóm gặp Nefeltari Vivi — công chúa Arabasta đang điều tra Crocodile.',
          en: 'The seemingly paradise welcome town turns out to be a Baroque Works trap. The crew meets Nefeltari Vivi — princess of Arabasta, secretly investigating Crocodile.',
        },
        highlight: { vi: 'Vivi gia nhập tạm thời', en: 'Vivi temporarily joins' },
      },
      {
        name: 'Little Garden',
        chapters: '115–129',
        chapterCount: 15,
        summary: {
          vi: 'Đảo khủng long thời tiền sử, nơi hai người khổng lồ Dorry và Brogy đang chiến đấu suốt 100 năm vì danh dự. Baroque Works phá vỡ cuộc chiến thần thánh của họ.',
          en: 'A prehistoric dinosaur island where two giants, Dorry and Brogy, have fought for 100 years over honor. Baroque Works sabotages their sacred duel.',
        },
        highlight: { vi: 'Hai người khổng lồ Dorry & Brogy', en: 'Giants Dorry & Brogy' },
      },
      {
        name: 'Drum Island',
        chapters: '130–154',
        chapterCount: 25,
        summary: {
          vi: 'Nami bị bệnh nặng, nhóm tìm bác sĩ trên đảo Drum. Gặp Tony Tony Chopper — con tuần lộc ăn trái Hito Hito no Mi biết nói và muốn trở thành bác sĩ vạn năng.',
          en: 'Nami falls gravely ill and the crew seeks a doctor on Drum Island. They meet Tony Tony Chopper — a talking reindeer who ate the Hito Hito no Mi and dreams of becoming the perfect doctor.',
        },
        highlight: { vi: 'Chopper gia nhập', en: 'Chopper joins' },
      },
      {
        name: 'Arabasta',
        chapters: '155–217',
        chapterCount: 63,
        summary: {
          vi: 'Đại chiến tại vương quốc sa mạc. Luffy đánh bại Shichibukai Crocodile — người dùng trái cát Suna-Suna để điều khiển xung đột và chiếm đoạt Arabasta. Khoảnh khắc Vivi chia tay đầy xúc động.',
          en: 'The great battle in the desert kingdom. Luffy defeats Shichibukai Crocodile — who used the sand Suna-Suna no Mi to manipulate conflict and seize Arabasta. Vivi\'s tearful farewell.',
        },
        highlight: { vi: 'Luffy vs Crocodile + Vivi chia tay', en: 'Luffy vs Crocodile + Vivi\'s farewell' },
      },
    ],
  },
  {
    id: 'sky-island',
    name: 'Sky Island Saga',
    chapters: '218–302',
    color: '#2E86C1',
    textColor: '#FFFFFF',
    emoji: '☁️',
    description: {
      vi: 'Lên thiên đàng — khám phá đảo mây Skypiea và bí ẩn của chuông vàng Roger.',
      en: 'Into the heavens — exploring the cloud island Skypiea and the mystery of Roger\'s golden bell.',
    },
    arcs: [
      {
        name: 'Jaya',
        chapters: '218–236',
        chapterCount: 19,
        summary: {
          vi: 'Tìm kiếm đường lên đảo trên trời. Gặp Marshall D. Teach (Blackbeard) lần đầu — người sẽ thay đổi vận mệnh của Luffy mãi mãi. Nhóm dùng Knock Up Stream để bay lên.',
          en: 'Searching for the path to the sky island. First encounter with Marshall D. Teach (Blackbeard) — the man who will forever alter Luffy\'s fate. The crew uses the Knock Up Stream to launch skyward.',
        },
        highlight: { vi: 'Gặp Blackbeard lần đầu', en: 'First meeting with Blackbeard' },
      },
      {
        name: 'Skypiea',
        chapters: '237–302',
        chapterCount: 66,
        summary: {
          vi: 'Cuộc chiến trên đảo mây với "Thần" Enel — kẻ sở hữu trái Goro-Goro và muốn hủy diệt Skypiea. Bí ẩn 400 năm về Shandora được giải mã. Luffy đánh đổ "Thiên Chúa" bằng khả năng miễn nhiễm sét.',
          en: 'Battle on the cloud island against "God" Enel — wielder of the Goro-Goro no Mi who seeks to destroy Skypiea. The 400-year mystery of Shandora is solved. Luffy defeats "God" through his lightning immunity.',
        },
        highlight: { vi: 'Luffy vs Enel + Tiếng chuông Roger', en: 'Luffy vs Enel + Roger\'s bell rings' },
      },
    ],
  },
  {
    id: 'water-7',
    name: 'Water 7 Saga',
    chapters: '303–441',
    color: '#1A5276',
    textColor: '#FFFFFF',
    emoji: '🚢',
    description: {
      vi: 'Bi kịch và tái sinh — từ thành phố nước đến tòa pháp đình thế giới, nhóm chiến đấu để giữ Robin và cứu lấy tình bạn.',
      en: 'Tragedy and rebirth — from the water city to the world courthouse, the crew fights to save Robin and preserve their bonds.',
    },
    arcs: [
      {
        name: 'Long Ring Long Land',
        chapters: '303–321',
        chapterCount: 19,
        summary: {
          vi: 'Đảo kỳ lạ với những sinh vật dài ngoằng. Cuộc thi Davy Back Fight với băng Foxy — trò chơi hải tặc nguy hiểm để giành thuyền viên của nhau.',
          en: 'A bizarre island of elongated creatures. The Davy Back Fight with the Foxy Pirates — a dangerous pirate game wagering crewmates.',
        },
        highlight: { vi: 'Davy Back Fight', en: 'Davy Back Fight' },
      },
      {
        name: 'Water 7',
        chapters: '322–374',
        chapterCount: 53,
        summary: {
          vi: 'Thành phố trên mặt nước. Going Merry quá hỏng không thể sửa. Robin bị CP9 bắt, Usopp rời nhóm vì bất đồng. Nhóm tan rã — khoảnh khắc đau lòng nhất của Straw Hat Pirates.',
          en: 'A city on the water. Going Merry is beyond repair. Robin is captured by CP9, Usopp leaves after a falling out. The crew fractures — the most heartbreaking moment in Straw Hat history.',
        },
        highlight: { vi: 'Robin bị bắt + Usopp rời nhóm', en: 'Robin captured + Usopp leaves' },
      },
      {
        name: 'Enies Lobby',
        chapters: '375–430',
        chapterCount: 56,
        summary: {
          vi: 'Luffy tuyên chiến với Chính phủ Thế giới để cứu Robin. Straw Hat Pirates phá tòa pháp đình Enies Lobby. Gear 2 và Gear 3 ra đời. Going Merry hy sinh trong biển lửa. Robin tiết lộ bi kịch Ohara.',
          en: 'Luffy declares war on the World Government to save Robin. The Straw Hats storm Enies Lobby. Gear 2 and Gear 3 debut. Going Merry\'s final voyage in flames. Robin reveals the tragedy of Ohara.',
        },
        highlight: { vi: 'Gear 2 & 3 + Going Merry hy sinh', en: 'Gear 2 & 3 + Going Merry\'s sacrifice' },
      },
      {
        name: 'Post-Enies Lobby',
        chapters: '431–441',
        chapterCount: 11,
        summary: {
          vi: 'Hồi phục sau trận chiến. Franky — thợ đóng tàu siêu nhân — gia nhập và xây Thousand Sunny. Tiết lộ về Gold Roger và bí ẩn của D.',
          en: 'Recovery after the battle. Franky — a superhuman shipwright — joins and builds the Thousand Sunny. Revelations about Gold Roger and the mystery of the Will of D.',
        },
        highlight: { vi: 'Franky gia nhập + Thousand Sunny', en: 'Franky joins + Thousand Sunny' },
      },
    ],
  },
  {
    id: 'thriller-bark',
    name: 'Thriller Bark Saga',
    chapters: '442–489',
    color: '#6C3483',
    textColor: '#F5EEF8',
    emoji: '💀',
    description: {
      vi: 'Đêm kinh hoàng — con tàu ma Thriller Bark và Shichibukai Gecko Moria.',
      en: 'A night of terror — the ghost ship Thriller Bark and Shichibukai Gecko Moria.',
    },
    arcs: [
      {
        name: 'Thriller Bark',
        chapters: '442–489',
        chapterCount: 48,
        summary: {
          vi: 'Con tàu ma khổng lồ Thriller Bark và Gecko Moria — kẻ đánh cắp bóng để tạo zombie. Brook — bộ xương biết nói, nhạc sĩ không có linh hồn — gia nhập. Khoảnh khắc Zoro hy sinh mình để bảo vệ Luffy trước Kuma là một trong những cảnh đẹp nhất series.',
          en: 'The massive ghost ship Thriller Bark and Gecko Moria — who steals shadows to create zombies. Brook — a talking skeleton, a soulless musician — joins. Zoro\'s sacrifice to protect Luffy from Kuma is one of the most iconic scenes in the series.',
        },
        highlight: { vi: 'Brook gia nhập + Zoro vs Kuma', en: 'Brook joins + Zoro vs Kuma' },
      },
    ],
  },
  {
    id: 'summit-war',
    name: 'Summit War Saga',
    chapters: '490–597',
    color: '#C0392B',
    textColor: '#FFFFFF',
    emoji: '⚔️',
    description: {
      vi: 'Đỉnh điểm bi kịch — từ Sabaody đến Marineford, Luffy mất tất cả để học cách trân trọng những gì mình có.',
      en: 'The peak of tragedy — from Sabaody to Marineford, Luffy loses everything to learn how to value what he has.',
    },
    arcs: [
      {
        name: 'Sabaody Archipelago',
        chapters: '490–513',
        chapterCount: 24,
        summary: {
          vi: 'Rừng sú vẹt bong bóng — cửa ngõ vào New World. Nhóm chạm mặt các Shichibukai và Đô đốc. Lần đầu thấy Haki màu bá vương. Kuma dùng khả năng đặc biệt để phân tán toàn nhóm đến các góc khác nhau của thế giới.',
          en: 'The bubble mangrove — gateway to the New World. The crew encounters Warlords and Admirals. First glimpse of Conqueror\'s Haki. Kuma uses his ability to scatter the entire crew to different corners of the world.',
        },
        highlight: { vi: 'Nhóm bị Kuma phân tán', en: 'Crew scattered by Kuma' },
      },
      {
        name: 'Amazon Lily',
        chapters: '514–524',
        chapterCount: 11,
        summary: {
          vi: 'Luffy rơi xuống đảo của phụ nữ Amazon Lily. Gặp Boa Hancock — một trong những Shichibukai đẹp nhất. Luffy biết tin Ace bị bắt và quyết tâm cứu anh.',
          en: 'Luffy lands on the island of women, Amazon Lily. He meets Boa Hancock — one of the most powerful Warlords. Luffy learns of Ace\'s capture and resolves to save him.',
        },
        highlight: { vi: 'Gặp Hancock', en: 'Meet Hancock' },
      },
      {
        name: 'Impel Down',
        chapters: '525–549',
        chapterCount: 25,
        summary: {
          vi: 'Đột nhập nhà tù khổng lồ dưới đáy đại dương Impel Down để cứu Ace. Gặp lại Buggy, Crocodile, Jinbe, và giải phóng hàng loạt tù nhân. Luffy dùng Gear 3 và uống Emporio Tension Hormone để vượt qua 6 tầng địa ngục.',
          en: 'Breaking into the massive undersea prison Impel Down to rescue Ace. Reunions with Buggy, Crocodile, Jinbe, and liberation of many prisoners. Luffy uses Gear 3 and Emporio Tension Hormone to survive 6 levels of hell.',
        },
        highlight: { vi: 'Vượt 6 tầng địa ngục', en: 'Survive 6 levels of hell' },
      },
      {
        name: 'Marineford',
        chapters: '550–580',
        chapterCount: 31,
        summary: {
          vi: 'Đại chiến Marineford — cuộc chiến lớn nhất trong lịch sử One Piece. Toàn bộ lực lượng Marine chống lại Whitebeard và đồng minh. Ace chết. Whitebeard chết. Luffy sụp đổ. Shanks xuất hiện kết thúc chiến tranh. Thế giới thay đổi mãi mãi.',
          en: 'The Marineford War — the greatest battle in One Piece history. The full Marine force against Whitebeard and his allies. Ace dies. Whitebeard dies. Luffy collapses. Shanks arrives to end the war. The world changes forever.',
        },
        highlight: { vi: 'Ace & Whitebeard hy sinh', en: 'Ace & Whitebeard fall' },
      },
      {
        name: 'Post-War',
        chapters: '581–597',
        chapterCount: 17,
        summary: {
          vi: 'Luffy hồi phục trên đảo Amazon Lily. Đau đớn và mất mát khiến anh học được rằng mình không đủ mạnh. Rayleigh huấn luyện Luffy Haki. Nhóm tập hợp sau 2 năm luyện tập.',
          en: 'Luffy recovers on Amazon Lily. Pain and loss teach him he isn\'t strong enough yet. Rayleigh trains Luffy in Haki. The crew reunites after 2 years of training.',
        },
        highlight: { vi: '2 năm luyện tập với Rayleigh', en: '2 years training with Rayleigh' },
      },
    ],
  },
  {
    id: 'fishman-island',
    name: 'Fish-Man Island Saga',
    chapters: '598–653',
    color: '#117A65',
    textColor: '#FFFFFF',
    emoji: '🐠',
    description: {
      vi: 'Sau 2 năm — nhóm đoàn tụ và khám phá đảo Cá Người dưới lòng đại dương.',
      en: 'After 2 years — the crew reunites and explores Fish-Man Island beneath the ocean.',
    },
    arcs: [
      {
        name: 'Return to Sabaody',
        chapters: '598–602',
        chapterCount: 5,
        summary: {
          vi: 'Straw Hat Pirates đoàn tụ tại Sabaody sau 2 năm luyện tập. Mỗi thành viên đều đã trưởng thành. Nhóm lặn xuống đại dương trên Thousand Sunny.',
          en: 'The Straw Hat Pirates reunite at Sabaody after 2 years of training. Every member has grown stronger. The crew dives into the ocean aboard Thousand Sunny.',
        },
        highlight: { vi: 'Đoàn tụ sau 2 năm', en: 'Reunion after 2 years' },
      },
      {
        name: 'Fish-Man Island',
        chapters: '603–653',
        chapterCount: 51,
        summary: {
          vi: 'Đảo Cá Người dưới lòng đại dương — thế giới của Mink và Cá Người. Hody Jones muốn thống trị bằng thù hận. Luffy dùng Conqueror\'s Haki phủ phục 50.000 kẻ thù. Gặp Shirahoshi — nàng tiên cá khổng lồ, Poseidon của thời đại mới.',
          en: 'Fish-Man Island beneath the ocean — home of Merfolk and Fish-Men. Hody Jones seeks to rule through hatred. Luffy uses Conqueror\'s Haki to subdue 50,000 enemies. They meet Shirahoshi — a giant mermaid princess, the new age Poseidon.',
        },
        highlight: { vi: 'Luffy 1 vs 50.000 + Poseidon', en: 'Luffy 1 vs 50,000 + Poseidon' },
      },
    ],
  },
  {
    id: 'dressrosa',
    name: 'Dressrosa Saga',
    chapters: '654–801',
    color: '#A93226',
    textColor: '#FFFFFF',
    emoji: '🌹',
    description: {
      vi: 'Liên minh và cách mạng — từ Punk Hazard đến Dressrosa, Luffy xây dựng đế chế đồng minh đầu tiên.',
      en: 'Alliance and revolution — from Punk Hazard to Dressrosa, Luffy builds his first great alliance.',
    },
    arcs: [
      {
        name: 'Punk Hazard',
        chapters: '654–699',
        chapterCount: 46,
        summary: {
          vi: 'Đảo địa ngục: nửa lửa nửa băng do thí nghiệm của Vegapunk tạo ra. Caesar Clown đang thí nghiệm trên trẻ em cho SMILE. Luffy ký liên minh với Trafalgar Law để hạ Kaido. Momonosuke — con trai Kozuki Oden — gặp nhóm lần đầu.',
          en: 'A hellish island: half fire, half ice from Vegapunk\'s experiments. Caesar Clown experiments on children for SMILE. Luffy forms an alliance with Trafalgar Law to take down Kaido. Momonosuke — son of Kozuki Oden — meets the crew for the first time.',
        },
        highlight: { vi: 'Liên minh Luffy-Law', en: 'Luffy-Law Alliance' },
      },
      {
        name: 'Dressrosa',
        chapters: '700–801',
        chapterCount: 102,
        summary: {
          vi: 'Arc dài nhất One Piece. Doflamingo — Shichibukai ẩn sau vỏ bọc vua hào phóng — thực chất là trùm SMILE và Underworld. Gear 4 ra đời. Mạng lưới Straw Hat Grand Fleet được thành lập. Luffy đấm Doflamingo xuyên thành với King Kong Gun.',
          en: 'One Piece\'s longest arc. Doflamingo — a Warlord hiding behind a benevolent king facade — is actually the SMILE kingpin and Underworld broker. Gear 4 debuts. The Straw Hat Grand Fleet is formed. Luffy punches Doflamingo through the city with King Kong Gun.',
        },
        highlight: { vi: 'Gear 4 + Grand Fleet + King Kong Gun', en: 'Gear 4 + Grand Fleet + King Kong Gun' },
      },
    ],
  },
  {
    id: 'whole-cake-island',
    name: 'Whole Cake Island Saga',
    chapters: '802–908',
    color: '#CB4335',
    textColor: '#FFFFFF',
    emoji: '🍰',
    description: {
      vi: 'Cứu Sanji — hành trình vào lãnh thổ Big Mom và cuộc đua thoát khỏi cơn thịnh nộ của Yonko.',
      en: 'Save Sanji — a journey into Big Mom\'s territory and a desperate escape from a Yonko\'s wrath.',
    },
    arcs: [
      {
        name: 'Zou',
        chapters: '802–824',
        chapterCount: 23,
        summary: {
          vi: 'Đảo Zou — lưng của voi khổng lồ Zunisha. Gặp Mink Tribe — những chiến binh thú người. Tiết lộ về Raizo và Wano. Jack tàn phá Zou tìm kiếm Raizo. Kế hoạch giải phóng Wano bắt đầu hình thành.',
          en: 'Zou Island — the back of the giant elephant Zunisha. Meeting the Mink Tribe — beastly warrior people. Revelations about Raizo and Wano. Jack ravages Zou searching for Raizo. Plans to liberate Wano begin to take shape.',
        },
        highlight: { vi: 'Zou + Mink Tribe + Kế hoạch Wano', en: 'Zou + Mink Tribe + Wano Plan' },
      },
      {
        name: 'Whole Cake Island',
        chapters: '825–902',
        chapterCount: 78,
        summary: {
          vi: 'Xâm nhập vương quốc bánh kẹo của Big Mom để cứu Sanji và phá hủy đám cưới. Luffy vs Katakuri — cuộc chiến gian nan nhất từ trước đến nay. Sanji thể hiện tình yêu thương thực sự qua Raid Suit và Ifrit Jambe tương lai.',
          en: 'Infiltrating Big Mom\'s candy kingdom to rescue Sanji and crash the wedding. Luffy vs Katakuri — the toughest fight yet. Sanji demonstrates true devotion through his Raid Suit and future Ifrit Jambe.',
        },
        highlight: { vi: 'Luffy vs Katakuri + Thoát khỏi Big Mom', en: 'Luffy vs Katakuri + Escape Big Mom' },
      },
      {
        name: 'Levely',
        chapters: '903–908',
        chapterCount: 6,
        summary: {
          vi: 'Hội nghị Levely — 50 vương quốc tập hợp tại Mary Geoise. Sabo được cho là chết. Nefeltari Cobra điều tra về Void Century. Bí ẩn về Im-sama lần đầu xuất hiện — kẻ ngồi trên Ngai Rỗng.',
          en: 'The Levely conference — 50 kingdoms gather at Mary Geoise. Sabo is reported dead. Nefeltari Cobra investigates the Void Century. Im-sama first appears — the one seated upon the Empty Throne.',
        },
        highlight: { vi: 'Im-sama + Void Century bắt đầu', en: 'Im-sama + Void Century begins' },
      },
    ],
  },
  {
    id: 'wano',
    name: 'Wano Country Saga',
    chapters: '909–1057',
    color: '#BA4A00',
    textColor: '#FFFFFF',
    emoji: '⛩️',
    description: {
      vi: 'Cuộc chiến lớn nhất — giải phóng Wano khỏi ách cai trị của Kaido và Orochi, và sự thức dậy của Joy Boy.',
      en: 'The greatest battle — liberating Wano from Kaido and Orochi\'s rule, and the awakening of Joy Boy.',
    },
    arcs: [
      {
        name: 'Wano Country',
        chapters: '909–1057',
        chapterCount: 149,
        summary: {
          vi: 'Arc vĩ đại nhất One Piece. Xứ Wano bị Kaido và shogun Orochi chiếm đóng 20 năm. Liên minh khổng lồ tấn công Onigashima. Gear 5 — Luffy trở thành Joy Boy, thức dậy trái Nika. Shanks thể hiện Haki Bá Vương cực mạnh. Wano được giải phóng.',
          en: 'One Piece\'s greatest arc. Wano has been occupied by Kaido and Shogun Orochi for 20 years. A massive alliance storms Onigashima. Gear 5 — Luffy becomes Joy Boy, awakening the Nika fruit. Shanks unleashes overwhelming Conqueror\'s Haki. Wano is liberated.',
        },
        highlight: { vi: 'Gear 5 / Joy Boy + Kaido bị hạ', en: 'Gear 5 / Joy Boy + Kaido defeated' },
      },
    ],
  },
  {
    id: 'final',
    name: 'Final Saga',
    chapters: '1058–ongoing',
    color: '#B7950B',
    textColor: '#FFFFFF',
    emoji: '☠️',
    description: {
      vi: 'Hồi kết — con đường cuối cùng tới Laugh Tale và sự thật về thế giới One Piece.',
      en: 'The endgame — the final path to Laugh Tale and the truth about the world of One Piece.',
    },
    arcs: [
      {
        name: 'Egghead',
        chapters: '1058–1116',
        chapterCount: 59,
        summary: {
          vi: 'Đảo Khoa Học của Vegapunk — 800 năm khoa học tương lai. Bí mật lịch sử Void Century được tiết lộ qua thông điệp của Vegapunk. Chính phủ Thế giới điều toàn bộ Gorosei và Đô đốc tiêu diệt Vegapunk. Straw Hat thoát trong gang tấc.',
          en: 'Vegapunk\'s Science Island — 800 years of future technology. Void Century secrets are revealed through Vegapunk\'s message. The World Government sends all five Gorosei and an Admiral to silence Vegapunk. The Straw Hats barely escape.',
        },
        highlight: { vi: 'Bí mật Void Century + Gorosei xuất hiện', en: 'Void Century secrets + Gorosei appear' },
      },
      {
        name: 'Elbaf',
        chapters: '1117–ongoing',
        chapterCount: null,
        summary: {
          vi: 'Đảo người khổng lồ Elbaf — vương quốc huyền thoại. Shanks và Straw Hat Pirates chạm mặt. Bí ẩn về Nika và Joy Boy tiếp tục được khai sáng. Hành trình tới Laugh Tale đang đến gần.',
          en: 'The island of giants Elbaf — a legendary kingdom. Shanks and the Straw Hats come face to face. The mystery of Nika and Joy Boy continues to unfold. The journey to Laugh Tale draws ever closer.',
        },
        highlight: { vi: 'Đảo Elbaf + Shanks', en: 'Elbaf Island + Shanks' },
      },
    ],
  },
];

/**
 * World location markers for the 3D map explorer.
 * Coordinates are fictional approximations based on One Piece world topology.
 */
const WORLD_LOCATIONS = [
  { name: 'Foosha Village',     arc: 'Romance Dawn',         saga: 'east-blue',         lat: 18,  lng: -158, icon: '🏴‍☠️' },
  { name: 'Shells Town',        arc: 'Orange Town',          saga: 'east-blue',         lat: 14,  lng: -148, icon: '🔫' },
  { name: 'Syrup Village',      arc: 'Syrup Village',        saga: 'east-blue',         lat: 20,  lng: -138, icon: '🌿' },
  { name: 'Baratie',            arc: 'Baratie',              saga: 'east-blue',         lat: 8,   lng: -130, icon: '🍽️' },
  { name: 'Arlong Park',        arc: 'Arlong Park',          saga: 'east-blue',         lat: 12,  lng: -142, icon: '🐟' },
  { name: 'Loguetown',          arc: 'Loguetown',            saga: 'east-blue',         lat: 3,   lng: -122, icon: '⚓' },
  { name: 'Twin Cape',          arc: 'Reverse Mountain',     saga: 'arabasta',          lat: 1,   lng: -118, icon: '🌊' },
  { name: 'Whiskey Peak',       arc: 'Whiskey Peak',         saga: 'arabasta',          lat: -2,  lng: -105, icon: '🍺' },
  { name: 'Little Garden',      arc: 'Little Garden',        saga: 'arabasta',          lat: -1,  lng: -92,  icon: '🦕' },
  { name: 'Drum Island',        arc: 'Drum Island',          saga: 'arabasta',          lat: 5,   lng: -82,  icon: '❄️' },
  { name: 'Alabasta',           arc: 'Arabasta',             saga: 'arabasta',          lat: -3,  lng: -70,  icon: '🏜️' },
  { name: 'Jaya',               arc: 'Jaya',                 saga: 'sky-island',        lat: -2,  lng: -58,  icon: '🗿' },
  { name: 'Skypiea',            arc: 'Skypiea',              saga: 'sky-island',        lat: 35,  lng: -55,  icon: '☁️' },
  { name: 'Long Ring Long Land',arc: 'Long Ring Long Land',  saga: 'water-7',           lat: -4,  lng: -42,  icon: '🦒' },
  { name: 'Water 7',            arc: 'Water 7',              saga: 'water-7',           lat: -2,  lng: -30,  icon: '🚢' },
  { name: 'Enies Lobby',        arc: 'Enies Lobby',          saga: 'water-7',           lat: 0,   lng: -22,  icon: '⚖️' },
  { name: 'Thriller Bark',      arc: 'Thriller Bark',        saga: 'thriller-bark',     lat: -5,  lng: -10,  icon: '💀' },
  { name: 'Sabaody Archipelago',arc: 'Sabaody Archipelago',  saga: 'summit-war',        lat: 2,   lng: -2,   icon: '🫧' },
  { name: 'Amazon Lily',        arc: 'Amazon Lily',          saga: 'summit-war',        lat: -18, lng: 5,    icon: '🏹' },
  { name: 'Impel Down',         arc: 'Impel Down',           saga: 'summit-war',        lat: -22, lng: -2,   icon: '⛓️' },
  { name: 'Marineford',         arc: 'Marineford',           saga: 'summit-war',        lat: 15,  lng: 0,    icon: '⚔️' },
  { name: 'Fish-Man Island',    arc: 'Fish-Man Island',      saga: 'fishman-island',    lat: -30, lng: 12,   icon: '🐠' },
  { name: 'Punk Hazard',        arc: 'Punk Hazard',          saga: 'dressrosa',         lat: -8,  lng: 28,   icon: '🔥' },
  { name: 'Dressrosa',          arc: 'Dressrosa',            saga: 'dressrosa',         lat: -5,  lng: 50,   icon: '🌹' },
  { name: 'Zou',                arc: 'Zou',                  saga: 'whole-cake-island', lat: -10, lng: 72,   icon: '🐘' },
  { name: 'Whole Cake Island',  arc: 'Whole Cake Island',    saga: 'whole-cake-island', lat: -12, lng: 90,   icon: '🍰' },
  { name: 'Wano',               arc: 'Wano Country',         saga: 'wano',              lat: -8,  lng: 118,  icon: '⛩️' },
  { name: 'Egghead',            arc: 'Egghead',              saga: 'final',             lat: -20, lng: 142,  icon: '🔬' },
  { name: 'Elbaf',              arc: 'Elbaf',                saga: 'final',             lat: 25,  lng: 155,  icon: '🪓' },
  { name: 'Mary Geoise',        arc: null,                   saga: null,                lat: 20,  lng: 0,    icon: '👑', landmark: true },
];
