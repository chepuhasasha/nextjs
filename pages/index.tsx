import { MainLayout } from "../layouts/main/main";
import { MaskBlock } from "../components/blocks/Mask/Mask";

export default function Home() {
  return (
    <MainLayout title="HOME">
      <MaskBlock mode={0} />
    </MainLayout>
  );
}
