import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveScatterPlot } from "@nivo/scatterplot"
import { ResponsivePie } from "@nivo/pie"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LandingPage() {
  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">QuickCredit</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Get Approved for a Loan in Minutes
                </h1>
                <p
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl dark:text-gray-400">
                  Our platform offers fast and flexible loan approvals with low interest rates and customizable
                  repayment options.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="dashboard/">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div
              className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div
                    className="inline-block rounded-lg bg-background px-3 py-1 text-sm dark:bg-gray-800">
                    Fast Approval
                  </div>
                  <h2 className="text-3xl text-gray-800 font-bold tracking-tighter sm:text-5xl">Get Approved in Minutes</h2>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our streamlined application process and advanced algorithms allow us to provide fast loan approvals,
                    so you can get the funds you need quickly.
                  </p>
                </div>
                <div className="space-y-2">
                  <div
                    className="inline-block rounded-lg bg-background px-3 py-1 text-sm dark:bg-gray-800">
                    Low Interest Rates
                  </div>
                  <h2 className="text-3xl text-gray-800 font-bold tracking-tighter sm:text-5xl">Affordable Financing</h2>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our platform offers competitive interest rates, so you can borrow the money you need without
                    breaking the bank.
                  </p>
                </div>
                <div className="space-y-2">
                  <div
                    className="inline-block bg-background rounded-lg px-3 py-1 text-sm dark:bg-gray-800">
                    Flexible Repayment
                  </div>
                  <h2 className="text-3xl text-gray-800 font-bold tracking-tighter sm:text-5xl">Customized Repayment Plans</h2>
                  <p
                    className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Choose from a variety of repayment options that fit your budget and lifestyle, so you can pay off
                    your loan on your own terms.
                  </p>
                </div>
              </div>
              <img
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl object-center"
                height="310"
                src="/picland.jpg"
                />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from real people who have used our platform to get the financing they need.
              </p>
            </div>
            <div
              className="grid w-full grid-cols-1 lg:grid-cols-3 items-center justify-center gap-8 lg:gap-12 [&>div]:mx-auto">
              <div
                className="space-y-4 rounded-lg border p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/person.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Freelance Designer</div>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "I was able to get approved for a loan in just a few minutes. The process was so easy and the interest
                  rate was very reasonable."
                </p>
              </div>
              <div
                className="space-y-4 rounded-lg border p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/person.png" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">Jane Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Small Business Owner</div>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "I was able to get the financing I needed to expand my business. The team at the loan platform was
                  incredibly helpful and responsive."
                </p>
              </div>
              <div
                className="space-y-4 rounded-lg border p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/person.png" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">Michael Johnson</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Homeowner</div>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  "I was able to get a loan to cover few home repairs. The process was quick and easy, and
                  the repayment terms were very flexible."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-4 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
        <h1 className="flex justify-center items-center w-full h-full text-5xl font-bold mb-10 text-gray-800 tracking-tighter">
          Analytics
        </h1>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Total Loans</CardDescription>
                    <CardTitle>$5.2M</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart className="aspect-[4/3]" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Approval Rate</CardDescription>
                    <CardTitle>87%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart className="aspect-[4/3]" />
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Average Loan Amount</CardDescription>
                    <CardTitle>$18,500</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DotChart className="aspect-[4/3]" />
                  </CardContent>
                </Card>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Delinquency Rate</CardDescription>
                    <CardTitle>3.2%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart className="aspect-[4/3]" />
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Loan Purpose</CardDescription>
                    <CardTitle>Loan Purpose Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart className="aspect-[4/3]" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Loan Origination</CardDescription>
                    <CardTitle>Top Origination Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center">
                      <div>Online Applications</div>
                      <div className="font-semibold ml-auto">45%</div>
                    </div>
                    <div className="flex items-center">
                      <div>Referrals</div>
                      <div className="font-semibold ml-auto">30%</div>
                    </div>
                    <div className="flex items-center">
                      <div>Retail Branches</div>
                      <div className="font-semibold ml-auto">25%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
              <p
                className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Apply for a loan today and get the financing you need in just a few minutes.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Button type="submit">Apply Now</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By applying, you agree to our
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 QuickCredit. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            FAQ
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

function BarChart(props) {
  return (
    (<div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data" />
    </div>)
  );
}


function DotChart(props) {
  return (
    (<div {...props}>
      <ResponsiveScatterPlot
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application" />
    </div>)
  );
}


function LineChart(props) {
  return (
    (<div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application" />
    </div>)
  );
}


function MountainIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}


function PieChart(props) {
  return (
    (<div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application" />
    </div>)
  );
}
