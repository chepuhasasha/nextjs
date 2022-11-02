import { MainLayout } from "../layouts/main/main";
import { MaskBlock } from "../components/blocks/Mask/Mask";
import { Block, Grid } from "../components/wrappers";
import { P, H2, Button } from "../components/elements";
import { Logoline } from "../components/blocks/Logoline/Logoline.";

export default function Home() {
  return (
    <MainLayout title="QTB Kerea">
      <Grid rows="repeat(3, max-content)" cols="repeat(10, 1fr)">
        <Logoline area="1/1/2/11" />
        <Block area="2/1/3/5" padding="100px" gap={40}>
          <img src="/shape1.svg" alt="shape" width={60} />
          <img src="/logo_min.svg" alt="logo" width={500} />
          <H2>ABOUT US</H2>
          <P>Dear clients, QTB Korea LTD company was established in 2019 and
            locate in Seoul city Republic of Korea. We represent our clients’
            business interests to strengthen relations between Korea and other
            countries. We provide to our distributors different types of
            cosmetic products and OEM/ODM service for Global Brands. We search
            huge Korean cosmetic market for very new trends and suggest it to
            our customers. That's why our clients up to dates with all the
            latest cosmetic market news. Along with this we also provide
            manufacturing service of your private label and other aspects of the
            international health and beauty business. Partnership with QTB Korea
            offers many opportunities to distinguish and grow your business! Be
            strong and courageous! CEO of QTB KOREA Maria Lakienko
          </P>
          <Button>Связаться с нами</Button>
        </Block>
        <Block area="2/5/3/11" padding="0">
          <MaskBlock mode={0} />
        </Block>
      </Grid>
    </MainLayout>
  );
}
