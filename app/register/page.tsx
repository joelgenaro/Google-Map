import { Suspense } from "react";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <Suspense fallback={<>Loading...</>}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
