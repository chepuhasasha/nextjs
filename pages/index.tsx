import { MainLayout } from "../layouts/main/main";
import { MaskBlock } from "../components/blocks/Mask/Mask";
import { Block, Grid } from "../components/wrappers";
import { P, H2, Button } from "../components/elements";

export default function Home() {
  return (
    <MainLayout title="HOME">
      <Grid rows="repeat(10, max-content)" cols="repeat(6, 1fr)">
        <Block area="1/1/2/4" padding="100px">
          <img src="/shape1.svg" alt="shape" width={60}/>
          <img src="/logo_min.svg" alt="logo" width={500}/>
          <H2>Надёжное партнёрство и гарантия качества продукции и услуг.</H2>
          <P>QTB Korea LLC - Торговая компания, основанная в 2018 году в г.Сеул (Корея) С самого начала мы представляли бизнес-интересы наших клиентов из Кореи для укрепления отношений между Европой, Россией и странами СНГ. Мы обладаем ресурсами и работаем с производителями корейской косметики оказывая маркетинговые услуги, участие в международных выставках и интернет-продвижениях брендов. В результате становится прямым партнёром продаж.</P>
          <Button>Связаться с нами</Button>
        </Block>
        <Block area="1/4/2/7" padding="0">
          <MaskBlock mode={0} />
        </Block>
      </Grid>
    </MainLayout>
  );
}
