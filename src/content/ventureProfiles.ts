export interface Project {
  id: string;
  name: string;
  description: string;
  logoSrc: string;
  descriptionTh?: string;
  category: string;
}

const suppliedProfile = (
  id: string,
  name: string,
  category: string,
  description: string,
  logoSrc: string,
  descriptionTh?: string,
): Project => ({ id, name, category, description, logoSrc, descriptionTh });

export const projects: Project[] = [
  suppliedProfile(
    'collectra', 'Collectra', 'Collectibles',
    'Collectra is building a trusted marketplace for collectors, starting with K-pop photocards. Many collectors risk getting scammed by fake or counterfeit photocards, especially when buying through social media. Collectra uses AI scanning to check photocard details and help detect potential fakes, alongside seller verification, secure payments, and buyer protection—making buying and selling photocards safer and more trustworthy.',
    '/images/teams/collectra.jpg',
  ),
  suppliedProfile(
    'ochael', 'Ochael', 'Wellness',
    'Ochael is a pre-meal oral spray designed for adults aged 45+ who experience reduced taste sensitivity due to aging or health conditions. The product aims to enhance taste perception and stimulate saliva before eating, helping users experience the flavors of their food more clearly.\n\nOchael focuses on a common but often overlooked change in taste perception: food may still be recognizable, but it can feel less flavorful than before. Rather than treating complete taste loss, Ochael is designed to support people whose sensitivity to taste has decreased.',
    '/images/teams/ochael.jpg',
  ),
  suppliedProfile(
    'aegis', 'Project Aegis', 'Digital safety',
    'Project Aegis is an impact venture developing a student-focused scam-prevention application that helps people pause and verify before making a potentially risky payment. Instead of only reacting after money is lost, Aegis focuses on the critical decision moment by helping users make safer choices before a scam succeeds.',
    '/images/teams/aegis.jpg',
    'Project Aegis เป็นโครงการที่พัฒนาแอปพลิเคชันป้องกันการหลอกลวงสำหรับนักศึกษา โดยมีเป้าหมายเพื่อช่วยให้ผู้ใช้ หยุดคิดและตรวจสอบให้แน่ใจก่อนโอนหรือชำระเงินที่อาจมีความเสี่ยง แทนที่จะรอแก้ปัญหาหลังจากเงินถูกโอนไปแล้ว Aegis เข้ามาช่วยในช่วงเวลาสำคัญก่อนตัดสินใจจ่ายเงิน เพื่อให้ผู้ใช้มีโอกาสตรวจสอบความน่าเชื่อถือ ประเมินความเสี่ยง และตัดสินใจได้อย่างรอบคอบมากขึ้น ก่อนที่จะตกเป็นเหยื่อของมิจฉาชีพ',
  ),
  suppliedProfile(
    'wazo', 'WAZO', 'Wellness',
    'WAZO is a sleep wellness solution designed for people who wake up during the night and struggle to fall back asleep. Through gentle vibration-guided breathing, WAZO helps users slow down, relax, and return to sleep naturally without relying on medication.',
    '/images/teams/wazo.jpg',
    'WAZO คือนวัตกรรมเพื่อการนอนหลับ สำหรับผู้ที่ตื่นกลางดึกแล้วหลับต่อได้ยาก โดยใช้แรงสั่นสะเทือนเบา ๆ เพื่อนำจังหวะการหายใจ ช่วยให้ร่างกายและความคิดค่อย ๆ ผ่อนคลาย และกลับเข้าสู่การนอนหลับได้อย่างเป็นธรรมชาติ โดยไม่พึ่งยา',
  ),
  suppliedProfile(
    'mera', 'Mera', 'Fashion',
    'Mera is a fashion platform that helps brands give unsold inventory a second opportunity. We work with fashion brands to bring leftover or past-collection items back to market, helping them turn unused stock into new revenue. Mera also supports product presentation and listing, allowing brands to reach new customers while maintaining their brand image and identity.',
    '/images/teams/mera.jpg',
  ),
  suppliedProfile(
    'orcleen', 'ORCLEEN', 'Home care',
    'ORCLEEN is a household floor-cleaning brand designed to make everyday cleaning simpler. It addresses the time, steps, and equipment involved in cleaning, alongside household concerns about ants, odors, and residue. Its concept centers on Clean, Safe, Convenient, and Ant Reduction, with the message “Easy cleaning in one step.” ORCLEEN targets households that clean regularly, especially those with children or pets, and people looking to reduce cleaning time and effort.',
    '/images/teams/orcleen.png',
    'ORCLEEN เป็นแบรนด์ผลิตภัณฑ์ทำความสะอาดพื้นสำหรับใช้ในบ้าน ที่เกิดจากปัญหาในชีวิตประจำวัน เพราะการทำความสะอาดบ้านบางครั้งต้องใช้หลายขั้นตอน หลายอุปกรณ์ และยังเจอปัญหาอย่างมดในบ้าน รวมถึงความกังวลเรื่องกลิ่นหรือสารตกค้าง\n\nเราจึงอยากทำให้การทำความสะอาดง่ายขึ้นและไม่ยุ่งยาก โดย ORCLEEN มีแนวคิดหลักใน 4 ด้าน คือ Clean, Safe, Convenient และ Ant Reduction แต่ทั้งหมดจะสื่อสารผ่าน Core Message เดียว คือ “สะอาดง่าย ในขั้นตอนเดียว”\n\nกลุ่มเป้าหมายหลักคือ ครัวเรือนที่ทำความสะอาดบ้านเป็นประจำ โดยเฉพาะบ้านที่มีเด็กหรือสัตว์เลี้ยง และคนที่ต้องการลดเวลาและขั้นตอนในการทำความสะอาด',
  ),
];
